const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const notFoundMiddleware = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const config = require('./config');
const personsRoutes = require('./persons/persons.route');
const db = require('./db/inMemoryDb');

const app = express();

app.use(cors());
app.use(bodyParser.json());
db.push({
  id: '1',
  name: 'Keber',
  age: '24',
  hobbies: ['dubstep']
});
persons = db;


app.use('/person', personsRoutes);

// Middleware for handling 404 Not Found
app.use(notFoundMiddleware);

// Middleware for handling errors
app.use(errorHandlerMiddleware);
app.set('db', persons);


if (require.main === module) {
  app.listen(3000, () => {
      console.log(`Server is running on server port 3000`);})
}
module.exports = app;
