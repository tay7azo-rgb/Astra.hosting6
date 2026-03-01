const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');

// Get all plans
router.get('/', async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
});

module.exports = router;