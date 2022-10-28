const config = require('dotenv').config()
const express = require('express')
const app = express()
const port = 5000
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('something.sqlite');

app.use(express.static(__dirname + "/public"))
app.use(express.json());
app.set("views", __dirname + "/views")
app.set("view engine", "ejs");


db.run("CREATE TABLE IF NOT EXISTS images (table_number TEXT PRIMARY KEY, url TEXT)");

tables = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17a", "17b", "18a", "18b", "19a", "19b", "20"];

db.all("SELECT url from images", function(err, rows) {
  if (!rows || !rows.length) {
    const stmt = db.prepare("INSERT INTO images (table_number) VALUES (?)");
    tables.forEach(function(e) {
      stmt.run(e);
    })
    stmt.finalize();
  }
})

app.get('/', (req, res) => {
  db.all("SELECT * from images", function(err, rows) {
    console.log('db response: ' + rows);
    tableData = {};
    rows.forEach(function(e) {
      tableData[e.table_number] = e.url
    });

    res.render('index', {
      secret: config.parsed.API_KEY,
      table1Image: tableData["1"],
      table2Image: tableData["2"],
      table3Image: tableData["3"],
      table4Image: tableData["4"],
      table5Image: tableData["5"],
      table6Image: tableData["6"],
      table7Image: tableData["7"],
      table8Image: tableData["8"],
      table9Image: tableData["9"],
      table10Image: tableData["10"],
      table11Image: tableData["11"],
      table12Image: tableData["12"],
      table13Image: tableData["13"],
      table14Image: tableData["14"],
      table15Image: tableData["15"],
      table16Image: tableData["16"],
      table17aImage: tableData["17a"],
      table17bImage: tableData["17b"],
      table18aImage: tableData["18a"],
      table18bImage: tableData["18b"],
      table19aImage: tableData["19a"],
      table19bImage: tableData["19b"],
      table20Image: tableData["20"],
    })
  })
})

app.post('/submit', (req, res) => {
  //write values to db
  console.log(req.body)

  db.run("update images set url = ? where table_number = ?", [
    req.body.url, req.body.table
  ])

  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
