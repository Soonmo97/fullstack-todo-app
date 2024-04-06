const express = require('express');
const router = express.Router();
const controller = require('../controller/Cmain');

// GET /api-server/user
router.get('/', controller.getUser);

module.exports = router;
