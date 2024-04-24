const express = require('express');
const router = express.Router();
const personsController = require('./persons.controller');
console.log(personsController.getAllPersons); // Should log a function
console.log(personsController.getPersonById); // Should log a function
console.log(personsController.createPerson); // Should log a function
console.log(personsController.updatePerson); // Should log a function
console.log(personsController.deletePerson); // Should log a function

router.get('/', personsController.getAllPersons);
router.get('/:personId', personsController.getPersonById);
router.post('/', personsController.createPerson);
router.put('/:personId', personsController.updatePerson);
router.delete('/:personId', personsController.deletePerson);

// router.get('/', (req, res) => {
//     res.send('Respond with a resource');
//   });

module.exports = router;