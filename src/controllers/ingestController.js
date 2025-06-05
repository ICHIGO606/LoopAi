const ingestionService = require('../services/ingestionService');
const ingestSchema = require('../validations/ingestSchema');

class IngestController {
  async handleIngest(req, res) {
    try {
      // Validate request payload
      const { error, value } = ingestSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message
        });
      }

      const { ids, priority } = value;
      const ingestionId = await ingestionService.processIngest(ids, priority);

      return res.status(200).json({
        ingestion_id: ingestionId
      });
    } catch (err) {
      console.error('Error processing ingestion:', err);
      return res.status(500).json({
        error: 'Internal server error'
      });
    }
  }
}

module.exports = new IngestController(); // Export singleton instance