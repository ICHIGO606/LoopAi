const statusService = require('../services/statusService');

class StatusController {
  async getStatus(req, res) {
    try {
      const { ingestionId } = req.params;
      
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(ingestionId)) {
        return res.status(400).json({
          error: 'Invalid ingestion ID format'
        });
      }

      const status = await statusService.getStatus(ingestionId);
      
      if (!status) {
        return res.status(404).json({
          error: 'Ingestion ID not found'
        });
      }

      console.log(`[INFO] Fetched status for ingestion_id ${ingestionId}`);
      return res.status(200).json(status);
    } catch (err) {
      console.error('Error fetching status:', err);
      return res.status(500).json({
        error: 'Internal server error'
      });
    }
  }
}

module.exports = new StatusController();