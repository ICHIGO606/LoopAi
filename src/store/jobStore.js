const IngestionJob = require('../models/ingestionJob');

const BatchStatus = {
  YET_TO_START: 'yet_to_start',
  TRIGGERED: 'triggered',
  COMPLETED: 'completed'
};

class JobStore {
  async createJob(ingestionId, batches) {
    const job = new IngestionJob({
      ingestion_id: ingestionId,
      batches: batches.map(batch => ({
        ...batch,
        status: BatchStatus.YET_TO_START
      }))
    });
    await job.save();
    return job;
  }

  async getJob(ingestionId) {
    return await IngestionJob.findOne({ ingestion_id: ingestionId });
  }

  async updateBatchStatus(ingestionId, batchId, status) {
    await IngestionJob.updateOne(
      { 
        ingestion_id: ingestionId,
        'batches.batch_id': batchId
      },
      {
        $set: { 'batches.$.status': status }
      }
    );
  }

  async calculateIngestionStatus(ingestionId) {
    const job = await this.getJob(ingestionId);
    if (!job) return null;

    const allCompleted = job.batches.every(b => b.status === BatchStatus.COMPLETED);
    if (allCompleted) return BatchStatus.COMPLETED;

    const anyTriggered = job.batches.some(b => b.status === BatchStatus.TRIGGERED);
    return anyTriggered ? BatchStatus.TRIGGERED : BatchStatus.YET_TO_START;
  }
}

module.exports = {
  BatchStatus,
  jobStore: new JobStore()
};