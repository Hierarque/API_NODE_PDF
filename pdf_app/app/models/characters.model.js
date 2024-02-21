const sql = require("./db.js");

// constructor
const Character = function(character) {
  this.name = character.title;
  this.race = character.race;
  this.class = character.class;
  this.background = character.background;
  this.strength = character.strength;
  this.dexterity = character.dexterity;
  this.intelligence = character.intelligence;
  this.wisdom = character.wisdom;
  this.charisma = character.charisma;
};

Character.create = (newCharacter, result) => {
  sql.query("INSERT INTO characters SET ?", newCharacter, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created character: ", { id: res.insertId, ...newCharacter });
    result(null, { id: res.insertId, ...newCharacter });
  });
};

Character.findById = (id, result) => {
  sql.query(`SELECT * FROM characters WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found character: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Character with the id
    result({ kind: "not_found" }, null);
  });
};

Character.getAll = (name, result) => {
  let query = "SELECT * FROM characters";

  if (name) {
    query += ` WHERE name LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("characters: ", res);
    result(null, res);
  });
};

Character.getAllByRace = (race, result) => {
  sql.query(`SELECT * FROM characters WHERE race = ${race}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("characters: ", res);
    result(null, res);
  });
};

Character.updateById = (id, character, result) => {
  sql.query(
    "UPDATE characters SET name = ?, race = ?, class = ?, background = ?, strength = ?, dexterity = ?, intelligence = ?, wisdom = ?, charisma = ? WHERE id = ?",
    [character.name, character.race, character.class, character.background, character.strength, character.dexterity, character.intelligence, character.wisdom, character.charisma, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found character with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated character: ", { id: id, ...character });
      result(null, { id: id, ...character });
    }
  );
};

Character.remove = (id, result) => {
  sql.query("DELETE FROM characters WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found character with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted character with id: ", id);
    result(null, res);
  });
};

Character.removeAll = result => {
  sql.query("DELETE FROM characters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} characters`);
    result(null, res);
  });
};

module.exports = Character;
