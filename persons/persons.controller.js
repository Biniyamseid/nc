
const uuidv4  =  require('uuid');
const Joi = require('joi');
const personsService = require('../persons/persons.service');
const personSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().min(1).max(140).required(),
  hobbies: Joi.array().default([]).required(),
});

const getPersons = async (req, res, next) => {
  try {
    const persons = req.app.get('db');
    res.json(persons);
  } catch (error) {
    next(error);
  }
};

const getPerson = async (req, res, next) => {
  try {
    const persons = req.app.get('db');
    const result = await personsService.getPersonById(req.params.personId, persons);

    if (!result) {
      return res.sendStatus(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createPerson = async (req, res, next) => {
  try {
    const persons = req.app.get('db');
    const { error, value } = personSchema.validate(req.body);

    if (error) {
      return res.status(400).json(error);
    }

    await personsService.createPerson(value, persons);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const updatePerson = async (req, res, next) => {
  try {
    const persons = req.app.get('db');
    const { error, value } = personSchema.validate(req.body);

    if (error) {
      return res.status(400).json(error);
    }

    const result = await personsService.updatePerson(req.params.personId, value, persons);

    if (!result) {
      return res.sendStatus(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deletePerson = async (req, res, next) => {
  try {
    const persons = req.app.get('db');
    const response = await personsService.deleteOnePerson(req.params.personId, persons);

    if (!response) {
      return res.sendStatus(404);
    }

    res.json(persons);
  } catch (error) {
    next(error);
  }
};

const deletePersons = async (req, res, next) => {
  try {
    const persons = req.app.get('db');
    persons.length = 0;
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
  deletePersons,
};
