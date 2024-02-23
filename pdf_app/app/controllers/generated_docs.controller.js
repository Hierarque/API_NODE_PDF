const PDF_document = require("../models/generated_docs.model.js");
const puppeteer = require('puppeteer');
const fs = require('fs');
const ejs = require('ejs')
const path = require('path');

// Create and Save a new doc
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a pdf_doc
    const doc = new PDF_doc({
      title: req.body.title,
      content: req.body.content,
    });
  
    // Save doc in the database
    PDF_document.create(doc, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the document in db."
        });
      else res.send(data);
    });
  };

// Retrieve all docs from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
  
    PDF_document.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving docs."
        });
      else res.send(data);
    });
  };
  

// Find a single doc with a id
exports.findOne = (req, res) => {
    PDF_document.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found doc with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving doc with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

// Update a doc identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    PDF_document.updateById(
      req.params.id,
      new PDF_doc(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found document with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating document with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a document with the specified id in the request
exports.delete = (req, res) => {
    PDF_document.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found doc with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete doc with id " + req.params.id
          });
        }
      } else res.send({ message: `doc was deleted successfully!` });
    });
  };

// Delete all docs from the database.
exports.deleteAll = (req, res) => {
    PDF_document.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all docs."
        });
      else res.send({ message: `All docs were deleted successfully!` });
    });
  };

exports.generate_pdf =(req, res) => {

    async function generatePDF(htmlFilePath, pdfFilePath) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
      
        await page.setContent(htmlContent, {
          waitUntil: 'networkidle0',
        });
      
        await page.pdf({ path: pdfFilePath, format: 'A4' });
      
        await browser.close();
      }
    const htmlFilePath = process.env.HTML_TEMPLATE_PATH;
    const pdfFilePath = process.env.PDF_OUTPUT_TEMPLATE_PATH;

    generatePDF(htmlFilePath, pdfFilePath)
    .then(() => {
        console.log('PDF generated successfully')
    })
    .catch(error => console.error('Error generating PDF:', error));
};