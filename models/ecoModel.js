const db = require('../config/db');
// Получить всех пользователей для рейтинга
const getLeaderboard = () => db.query('SELECT name, eco_points FROM users ORDER BY eco_points DESC').then(r => r.rows);

// Получить список всех пользователей для переключателя
const getAllUsers = () => db.query('SELECT id, name FROM users').then(r => r.rows);

module.exports = {
    getLeaderboard,
    getAllUsers,
// CRUD Пунктов
    getPoints: () => db.query('SELECT * FROM collection_points ORDER BY id').then(r => r.rows),
    addPoint: (name, addr) => db.query('INSERT INTO collection_points (name, address) VALUES ($1, $2) RETURNING *', [name, addr]).then(r => r.rows[0]),
    updatePoint: (id, name, addr) => db.query('UPDATE collection_points SET name = $1, address = $2 WHERE id = $3 RETURNING *', [name, addr, id]).then(r => r.rows[0]),
    deletePoint: (id) => db.query('DELETE FROM collection_points WHERE id = $1', [id]),

    // Типы отходов
    getWasteTypes: () => db.query('SELECT * FROM waste_types ORDER BY id').then(r => r.rows),
    addWasteType: (name, val) => db.query('INSERT INTO waste_types (name, eco_value_per_kg) VALUES ($1, $2) RETURNING *', [name, val]).then(r => r.rows[0]),
    updateWasteType: (id, name, val) => db.query('UPDATE waste_types SET name = $1, eco_value_per_kg = $2 WHERE id = $3 RETURNING *', [name, val, id]).then(r => r.rows[0]),
    deleteWasteType: (id) => db.query('DELETE FROM waste_types WHERE id = $1', [id]),

    // Расчет вклада (Баллы)
    addDisposalReport: async (userId, pointId, wasteTypeId, weightKg) => {
        const waste = await db.query('SELECT eco_value_per_kg FROM waste_types WHERE id = $1', [wasteTypeId]);
        const earnedPoints = waste.rows[0].eco_value_per_kg * weightKg;
        await db.query('UPDATE users SET eco_points = eco_points + $1 WHERE id = $2', [earnedPoints, userId]);
        const report = await db.query('INSERT INTO disposal_reports (user_id, point_id, waste_type_id, weight_kg) VALUES ($1, $2, $3, $4) RETURNING *', [userId, pointId, wasteTypeId, weightKg]);
        return { report: report.rows[0], earnedPoints };
    },

    // Данные профиля и Достижения
    getUserStats: async (userId) => {
        const res = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
        const user = res.rows[0];
        let rank = "Новичок 🥉";
        if (user.eco_points >= 1000) rank = "Эко-Герой 🌍 🏆";
        else if (user.eco_points >= 500) rank = "Мастер переработки ♻️ 🥇";
        else if (user.eco_points >= 100) rank = "Активист 🌱 🥈";
        return { ...user, achievement: rank };
    },

    // История для блока Статистики
    getUserHistory: (userId) => db.query(`
        SELECT r.weight_kg, w.name as waste_name, p.name as point_name, r.report_date 
        FROM disposal_reports r
        JOIN waste_types w ON r.waste_type_id = w.id
        JOIN collection_points p ON r.point_id = p.id
        WHERE r.user_id = $1 ORDER BY r.report_date DESC LIMIT 5`, [userId]).then(r => r.rows)
};