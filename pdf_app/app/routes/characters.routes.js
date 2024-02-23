module.exports = app => {
    const characters = require("../controllers/characters.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", characters.create);
  
    // Retrieve all characters
    router.get("/", characters.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", characters.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", characters.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", characters.delete);
  
    // Delete all characters
    router.delete("/", characters.deleteAll);
  
    app.use('/api/characters', router);
  };