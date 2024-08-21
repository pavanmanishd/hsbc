const express = require('express');
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Init Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));