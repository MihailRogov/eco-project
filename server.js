const express = require('express');
const cors = require('cors');
const ecoRoutes = require('./routes/ecoRoutes');

const app = express();
app.use(cors()); 
app.use(express.json());
app.use('/api', ecoRoutes);

app.listen(3000, () => console.log('API работает на порту 3000'));