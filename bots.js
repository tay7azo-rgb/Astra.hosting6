const express = require('express');
const router = express.Router();
const BotService = require('../models/BotService');
const fileManager = require('../core/fileManager');
const pm2Manager = require('../core/pm2Manager');

// Create bot service
router.post('/create', async (req, res) => {
  const { planId, botName } = req.body;
  const userId = req.user._id.toString();

  const folder = fileManager.createUserFolder(userId);
  const filePath = `${folder}/${botName}.js`;

  const service = await BotService.create({
    userId,
    planId,
    botName,
    filePath
  });

  res.json({ message: 'Bot service created', service });
});

// Start bot
router.post('/start', async (req, res) => {
  const { serviceId } = req.body;
  const service = await BotService.findById(serviceId);
  if (!service) return res.json({ error: 'Service not found' });

  if (service.userId !== req.user._id.toString())
    return res.status(403).json({ error: 'Not your service' });

  pm2Manager.startBot(service.botName, service.filePath);
  service.status = 'running';
  await service.save();

  res.json({ message: 'Bot started', service });
});

// Stop bot
router.post('/stop', async (req, res) => {
  const { serviceId } = req.body;
  const service = await BotService.findById(serviceId);
  if (!service) return res.json({ error: 'Service not found' });

  if (service.userId !== req.user._id.toString())
    return res.status(403).json({ error: 'Not your service' });

  pm2Manager.stopBot(service.botName);
  service.status = 'stopped';
  await service.save();

  res.json({ message: 'Bot stopped', service });
});

module.exports = router;