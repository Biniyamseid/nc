const db = require('../db/inMemoryDb');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

const personSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().required(),
  hobbies: Joi.array().items(Joi.string()).required()
});

const getAllPersons = () => Object.values(db);
const getPersonById = (id) => db[id] || null;
const createPerson = (person) => {
  const { value, error } = personSchema.validate(person);
  if (error) throw new Error(error.details[0].message);
  const id = uuidv4();
  db[id] = { id, ...value };
  return db[id];
};
const updatePerson = (id, person) => {
  if (!db[id]) throw new Error('Person not found');
  const { value, error } = personSchema.validate(person);
  if (error) throw new Error(error.details[0].message);
  db[id] = { id, ...value };
  return db[id];
};
const deletePerson = (id) => {
  if (!db[id]) throw new Error('Person not found');
  delete db[id];
  return { message: 'Person deleted successfully' };
};

module.exports = {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson
};