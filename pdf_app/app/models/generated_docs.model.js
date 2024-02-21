const sql = require("./db.js");

// constructor
const PDF_doc = function(pdf_doc) {
  this.title = pdf_doc.title;
  this.content = pdf_doc.content;
};

PDF_doc.create = (newPDF_doc, result) => {
  sql.query("INSERT INTO generated_docs SET ?", newPDF_doc, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newPDF_doc });
    result(null, { id: res.insertId, ...newPDF_doc });
  });
};

PDF_doc.findById = (id, result) => {
  sql.query(`SELECT * FROM generated_docs WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found document: ", res[0]);
      result(null, res[0]);
      return;
    }

    // did not found document with the id
    result({ kind: "not_found" }, null);
  });
};

PDF_doc.getAll = (title, result) => {
  let query = "SELECT * FROM generated_docs";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("documents: ", res);
    result(null, res);
  });
};

PDF_doc.updateById = (id, pdf_doc, result) => {
  sql.query(
    "UPDATE generated_docs SET title = ?, content = ?, WHERE id = ?",
    [pdf_doc.title, pdf_doc.content, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // did not find doc with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated document: ", { id: id, ...pdf_doc });
      result(null, { id: id, ...pdf_doc });
    }
  );
};

PDF_doc.remove = (id, result) => {
  sql.query("DELETE FROM generated_docs WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // did not find document with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted document with id: ", id);
    result(null, res);
  });
};

PDF_doc.removeAll = result => {
  sql.query("DELETE FROM generated_docs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} documents`);
    result(null, res);
  });
};

module.exports = PDF_doc;
