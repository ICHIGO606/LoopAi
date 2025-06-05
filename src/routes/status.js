const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

router.get('/status/:ingestionId', statusController.getStatus.bind(statusController));

module.exports = router;