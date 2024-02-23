const Charac = require("../models/characters.model.js");

// Create and Save a new char
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a pdf_char
    const char = new Character({
      name: req.body.title,
      race: req.body.race,
      class: req.body.class,
      background: req.body.background,
      strength: req.body.strength,
      dexterity: req.body.dexterity,
      intelligence: req.body.intelligence,
      wisdom: req.body.wisdom,
      charisma: req.body.charisma,
    });
  
    // Save char in the database
    Charac.create(char, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the character in db."
        });
      else res.send(data);
    });
  };

// Retrieve all chars from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.name;
  
    Charac.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving chars."
        });
      else res.send(data);
    });
  };
  

// Find a single char with a id
exports.findOne = (req, res) => {
    Charac.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found char with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving char with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

// Update a char identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Charac.updateById(
      req.params.id,
      new PDF_char(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found char with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating char with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a charument with the specified id in the request
exports.delete = (req, res) => {
    Charac.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found char with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete char with id " + req.params.id
          });
        }
      } else res.send({ message: `char was deleted successfully!` });
    });
  };

// Delete all chars from the database.
exports.deleteAll = (req, res) => {
    Charac.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all chars."
        });
      else res.send({ message: `All chars were deleted successfully!` });
    });
  };