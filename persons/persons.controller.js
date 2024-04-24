const personsService = require('./persons.service');

const getAllPersons = (req, res) => {
  const persons = personsService.getAllPersons();
  res.json(persons);
};

const getPersonById = (req, res) => {
  const { personId } = req.params;
  const person = personsService.getPersonById(personId);
  if (!person) {
    return res.status(404).json({ error: 'Person not found' });
  }
  res.json(person);
};

const createPerson = (req, res) => {
  try {
    const newPerson = personsService.createPerson(req.body);
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePerson = (req, res) => {
  try {
    const { personId } = req.params;
    const updatedPerson = personsService.updatePerson(personId, req.body);
    res.json(updatedPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePerson = (req, res) => {
  try {
    const { personId } = req.params;
    const message = personsService.deletePerson(personId);
    res.json(message);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson
};