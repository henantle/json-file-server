const express = require("express");
const fs = require("fs");
const db = require("./database.js");
const filesFolder = "./files";

const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  console.log("Saving new response: ", req.body);
  let idtext = req.body.idtext;
  let response = req.body.response;
  if (!idtext || !response) {
    res.status(400).send("Invalid request");
  } else {
    let insertSql = "INSERT INTO responses (idtext, response) VALUES (?, ?);";
    db.run(insertSql, [idtext, JSON.stringify(response)], (err, result) => {
      if (err) {
        res.status(400).send("Failed to insert item");
      } else {
        res.json({
          result: "success",
          idtext: idtext,
          response: response,
        });
      }
    });
  }
});

app.post("/reset", (req, res) => {
  console.log("Resetting json-file-server", req.body);
  let deleteSQL = "DELETE FROM responses;";
  try {
    db.run(deleteSQL);
  } catch (err) {
    console.error("catn", err);
    res.status(500).send("Failed to reset json-file-server database");
  }
  console.log("Successfully resetted json-file-server");
  res.status(200).send("Successfully resetted json-file-server");
});

app.post("/populate", (req, res) => {
  console.log("Populating json-file-server", req.body);
  fs.readdir(filesFolder, (err, files) => {
    files.forEach(fname => {
      try {
        sql = "INSERT OR REPLACE INTO responses (idtext, response) VALUES (?, ?)";
        console.log(fname);
        fs.existsSync(filesFolder + "/" + fname);
        let id = fname.split(".")[0];
        let obj = fs.readFileSync(filesFolder + "/" + fname, "utf8");
        obj = JSON.parse(obj);
        db.run(sql, [id, JSON.stringify(obj)]);
      } catch (err) {
        console.error("catn", err);
        res.status(500).send("Failed to populate json-file-server");
      }
    });
    console.log("Successfully populated json-file-server");
    res.status(200).send("Successfully populated json-file-server");
  });
});

app.get("/", (req, res) => {
  console.log("Retrieving all responses from json-file-server");
  var sql = "select * from responses;";

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.log(rows);
    res.json(rows);
  });
});

app.post("/fetch", function (req, res) {
  console.log("Fetching with body", req.body, req.body.Id);
  if (!req.body) {
    res.status(400).send("No body");
  } else if (!req.body.Id) {
    res.status(400).send("No id " + JSON.stringify(req.body));
  }
  var sql = "select response from responses where idtext = ?;";

  db.get(sql, [req.body.Id], (err, rows) => {
    if (err) {
      console.log("errrrppr");
      res.status(400).json({ error: err.message });
      return;
    }
    if (!rows) {
      res.status(404).send("Not found");
    } else {
      res.status(200).contentType("application/json").send(rows.response);
    }
  });
});

// process.env.PORT for Heroku and 9104 for local use
const LOCAL_PORT = 9104
app.listen(process.env.PORT || LOCAL_PORT);
console.log(`Live & Kicking on port ${(process.env.PORT || LOCAL_PORT)}`);
