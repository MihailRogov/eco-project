const express = require('express');
const router = express.Router();
const ecoCtrl = require('../controllers/ecoController');

// Маршруты для пунктов
router.get('/points', ecoCtrl.getPoints);
router.post('/points', ecoCtrl.createPoint);
router.put('/points/:id', ecoCtrl.editPoint);
router.delete('/points/:id', ecoCtrl.removePoint);

// Маршруты для типов мусора
router.get('/waste-types', ecoCtrl.getWasteTypes);

// Маршруты для пользователей и рейтинга
router.get('/users/all', ecoCtrl.getAllUsers);
router.get('/users/leaderboard', ecoCtrl.getLeaderboard);
router.get('/users/:id/stats', ecoCtrl.getStats);
router.get('/users/:id/history', ecoCtrl.getHistory);

// Маршрут для сдачи мусора
router.post('/dispose', ecoCtrl.submitWaste);
router.post('/waste-types', ecoCtrl.createWasteType);
router.put('/waste-types/:id', ecoCtrl.editWasteType);
router.delete('/waste-types/:id', ecoCtrl.removeWasteType);

module.exports = router;