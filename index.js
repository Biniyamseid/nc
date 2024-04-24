// const express = require('express')
// const app = express()

// let persons = [{
//     id: '1',
//     name: 'Sam',
//     age: '26',
//     hobbies: []    
// }] //This is your in memory database

// app.set('db', persons)
// //TODO: Implement crud of person

// if (require.main === module) {
//     app.listen(3000)
// }
// module.exports = app;


// const express = require('express');
// const personsRoutes = require('./persons/persons.routes');

// const router = express.Router();

// router.use('/person', personsRoutes);

// module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const notFoundMiddleware = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const config = require('./config');
// Assuming personsRoutes is in the same directory structure as before
const personsRoutes = require('./persons/persons.route');

const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// API routes
// Directly use the persons routes here, assuming '/person' is the desired path
app.use('/person', personsRoutes);

// Middleware for handling 404 Not Found
app.use(notFoundMiddleware);

// Middleware for handling errors
app.use(errorHandlerMiddleware);

// Listen on the configured port
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

module.exports = app; // For testing purposes