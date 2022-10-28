const config = require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname + "/public"))
app.set("views", __dirname + "/views")
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('index', {
    secret: config.parsed.API_KEY,
    table1Image: '',
    table2Image: '',
    table3Image: '',
    table4Image: '',
    table5Image: '',
    table6Image: '',
    table7Image: '',
    table8Image: '',
    table9Image: '',
    table10Image: '',
    table11Image: '',
    table12Image: '',
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
