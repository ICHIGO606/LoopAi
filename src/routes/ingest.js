const express = require('express');
const router = express.Router();
const ingestController = require('../controllers/ingestController');

router.post('/ingest', ingestController.handleIngest.bind(ingestController));

module.exports = router;