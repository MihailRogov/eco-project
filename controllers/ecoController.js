const ecoModel = require('../models/ecoModel');

module.exports = {
    // Пункты приема
    getPoints: async (req, res) => res.json(await ecoModel.getPoints()),
    createPoint: async (req, res) => res.status(201).json(await ecoModel.addPoint(req.body.name, req.body.address)),
    editPoint: async (req, res) => res.json(await ecoModel.updatePoint(req.params.id, req.body.name, req.body.address)),
    removePoint: async (req, res) => { await ecoModel.deletePoint(req.params.id); res.status(204).send(); },
    
    // Типы мусора
    getWasteTypes: async (req, res) => res.json(await ecoModel.getWasteTypes()),

    // Пользователи и Рейтинг (ОШИБКА БЫЛА ЗДЕСЬ - МЫ ДОБАВИЛИ ЭТИ ФУНКЦИИ)
    getLeaderboard: async (req, res) => res.json(await ecoModel.getLeaderboard()),
    getAllUsers: async (req, res) => res.json(await ecoModel.getAllUsers()),
    
    // Статистика и сдача
    getStats: async (req, res) => res.json(await ecoModel.getUserStats(req.params.id)),
    getHistory: async (req, res) => res.json(await ecoModel.getUserHistory(req.params.id)),
    submitWaste: async (req, res) => res.status(201).json(await ecoModel.addDisposalReport(req.body.userId, req.body.pointId, req.body.wasteTypeId, req.body.weightKg)),
    createWasteType: async (req, res) => res.status(201).json(await ecoModel.addWasteType(req.body.name, req.body.eco_value_per_kg)),
    editWasteType: async (req, res) => res.json(await ecoModel.updateWasteType(req.params.id, req.body.name, req.body.eco_value_per_kg)),
    removeWasteType: async (req, res) => { await ecoModel.deleteWasteType(req.params.id); res.status(204).send(); },
    
};