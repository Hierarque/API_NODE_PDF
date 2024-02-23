module.exports = app => {
    const generated_docs = require("../controllers/generated_docs.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", generated_docs.create);
  
    // Retrieve all generated_docs
    router.get("/", generated_docs.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", generated_docs.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", generated_docs.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", generated_docs.delete);
  
    // Delete all generated_docs
    router.delete("/", generated_docs.deleteAll);

    // Delete all generated_docs
    router.post("/generate_pdf", generated_docs.generate_pdf);
  
    app.use('/api/docs', router);
  };