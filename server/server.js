require('dotenv').config({ path: "./config.env" });
const express = require('express');
const router = require('./routes/auth');

const app = express();

app.use(express.json());
app.use('/api/auth', router)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));