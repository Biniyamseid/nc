const uuid  =  require('uuid');
const Joi = require('joi');

const personSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().required(),
  hobbies: Joi.array().items(Joi.string()).required()
});

const getPersonById = (id, db) => db.find(person => person.id === id) || null;

const createPerson = (person, persons) => {
  const { value, error } = personSchema.validate(person);

  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }

  const newPerson = {
    id: uuid.v4(),
    name: value.name,
    age: value.age,
    hobbies: value.hobbies || [],
  };
  persons.push(newPerson);
  return newPerson;
};


const deleteOnePerson = (id, persons) => {
  const index = persons.findIndex(person => person.id === id);

  if (index === -1) {
    return null;
  }

  persons.splice(index, 1);
  return persons;
};


const updatePerson = (id, updatedPerson, persons) => {
  const index = persons.findIndex(person => person.id === id);

  if (index === -1) {
    return null;
  }

  persons[index] = {
    ...persons[index],
    ...updatedPerson
  };

  return persons;
};


module.exports=  {
  createPerson,
  getPersonById,
  deleteOnePerson,
  updatePerson
};