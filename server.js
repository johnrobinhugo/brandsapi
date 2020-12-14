require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const db = require('./config/db')

const app = express()

const port = 8000

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors(corsOptions))

mongoClient.connect(db.url, (err, client) => {
  if (err) return console.log(err)

  const db = client.db('brandsdb')

  require('./routes')(app, db)
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
})