const express = require("express")
const bodyParser = require("body-parser")
const { Client } = require("pg")
const credentials = require("./credentials")
const app = express()

const connect = `postgres://rohito:Test12345!@awscloudaccess.csuuj4jwmvbg.us-east-2.rds.amazonaws.com
/awscloudaccess`

const client = new Client({
  user: credentials.user,
  password: credentials.password,
  database: credentials.database,
  host: credentials.host,
  port: credentials.port
})
client.connect(() => {
  console.log("Connected to DB")
})

app.get("/select", (req, res) => {
  const query = `select * from public.user`
  client.query(query, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      const { rows } = results
      res.send(JSON.stringify(rows.map(each => each.name)))

      rows.map(each => console.log(each.name))
    }
  })
})

app.get("/create", (req, res) => {
  const query = "CREATE TABLE abc ( name text );"
  client.query(query, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      const { rows } = results
      console.log(results.rows)
      res.send(JSON.stringify(rows.map(each => each.name)))

      rows.map(each => console.log(each.name))
    }
  })
})

const port = 3000
app.listen(port, () => {
  console.log("We Are Live On Port ", port)
})
