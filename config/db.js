const { Client } = require('pg');

const client = new Client({
  user: 'ecouser',
  host: process.env.DB_HOST || 'localhost', 
  database: 'ecodb',
  password: 'ecopass',
  port: 5432,
});

client.connect()
  .then(() => console.log('База данных подключена к: ' + (process.env.DB_HOST || 'localhost')))
  .catch(err => console.error('Ошибка подключения к БД:', err));

module.exports = client;