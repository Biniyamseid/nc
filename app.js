const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('index.js');
const notFoundMiddleware = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const config = require('./config');

const app = express();

app.use(cors());
app.use(bodyParser.json());
console.log("apiRoutes", apiRoutes);

// API routes
app.use('', apiRoutes);

// Middleware for handling 404 Not Found
app.use(notFoundMiddleware);

// Middleware for handling errors
app.use(errorHandlerMiddleware);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

module.exports = app; // For testing purposes