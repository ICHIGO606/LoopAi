const { jobStore } = require('../store/jobStore');

class StatusService {
  async getStatus(ingestionId) {
    const job = await jobStore.getJob(ingestionId);
    if (!job) return null;

    return {
      ingestion_id: job.ingestion_id,
      status: await jobStore.calculateIngestionStatus(ingestionId),
      batches: job.batches
    };
  }
}

module.exports = new StatusService();