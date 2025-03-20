const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/refrigeratorApp'
   
);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const refrigeratorRoutes = require('./routes/refrigerators');
app.use('/refrigerators', refrigeratorRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
