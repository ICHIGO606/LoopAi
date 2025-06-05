const { v4: uuidv4 } = require('uuid');
const PriorityEnum = require('../utils/priorityEnum');
const IngestionJob = require('../models/ingestionJob');
const { jobStore, BatchStatus } = require('../store/jobStore');

class IngestionService {
  constructor() {
    this.processingQueue = [];
    this.isProcessing = false;
  }

  async processIngest(ids, priority) {
    const ingestionId = uuidv4();
    const priorityValue = PriorityEnum[priority];
    
    // Create batches with batch_ids
    const batches = ids.reduce((acc, id, index) => {
      if (index % 3 === 0) {
        acc.push({
          batch_id: uuidv4(),
          ids: [id],
          priority: priorityValue,
          status: BatchStatus.YET_TO_START
        });
      } else {
        acc[acc.length - 1].ids.push(id);
      }
      return acc;
    }, []);
    
    // Store job and batches in MongoDB
    await jobStore.createJob(ingestionId, batches);
    
    // Add batches to processing queue
    this.processingQueue.push(...batches.map(batch => ({
      ...batch,
      ingestion_id: ingestionId
    })));
    
    // Start processing if not already running
    if (!this.isProcessing) {
      this.startProcessing();
    }
    
    return ingestionId;
  }

  async startProcessing() {
    this.isProcessing = true;
    
    while (this.processingQueue.length > 0) {
      const batch = this.processingQueue.shift();
      
      // Update status to triggered
      await jobStore.updateBatchStatus(batch.ingestion_id, batch.batch_id, BatchStatus.TRIGGERED);
      
      // Simulate processing (5 seconds per batch)
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Update status to completed
      await jobStore.updateBatchStatus(batch.ingestion_id, batch.batch_id, BatchStatus.COMPLETED);
    }
    
    this.isProcessing = false;
  }
}

module.exports = new IngestionService(); // Export singleton instance