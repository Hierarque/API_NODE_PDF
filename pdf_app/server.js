const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PDFDocument = require('pdfkit');

const app = express();

var corsOptions = {
  origin: "http://127.0.0.1:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the root of this api !!!" });
});

// POST endpoint to generate PDF
app.post('/generate-pdf', (req, res) => {
  // Extract data from the POST request
  const { data } = req.body;

  // Create a new PDF document
  const doc = new PDFDocument();

  // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

  // Pipe PDF output to response
  doc.pipe(res);

  // Write data to PDF
  doc.fontSize(16).text('Data received from POST request:', 50, 50);
  doc.fontSize(12).text(JSON.stringify(data, null, 4), 50, 80);
  console.log(JSON.stringify(data))

  // Finalize the PDF
  doc.end();
});


require("./app/routes/tutorials.routes.js")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});