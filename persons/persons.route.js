const express = require("express");

const personController = require('../persons/persons.controller') 
const personRouter = express.Router();

personRouter.route('/')
  .get(personController.getPersons)
  .post(personController.createPerson)
  .delete(personController.deletePersons);

personRouter.route('/:personId')
  .get(personController.getPerson)
  .put(personController.updatePerson)
  .delete(personController.deletePerson);

personRouter.use((req, res) => {
  res.status(404).json({ message: `${req.path} endpoint is not found` });
});

module.exports =  personRouter;