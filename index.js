const express = require("express")
const bodyParser = require("body-parser")
// const { Client } = require("pg")
const mysql = require("mysql")
const credentials = require("./credentials")
const app = express()
const cors = require("cors")
// support parsing of application/json type post data
app.use(bodyParser.json())
let uuidv1 = require("uuid/v1")
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

const client = new mysql.createConnection({
  user: credentials.user,
  password: credentials.password,
  database: credentials.database,
  host: credentials.host
})
client.connect(err => {
  if (err) {
    console.log(err)
  } else {
    console.log("Connected to DB ")
  }
})

app.get("/", (req, res) => {
  res.send("Welcome To Rohito's Api - Available Endpoints : /getallusers")
})

// List All Users

app.post("/getallusers", (req, res) => {
  const { partner_id } = req.body
  const query = `SELECT * FROM cloud.user where partner_id = '${partner_id}' `
  client.query(query, (err, results) => {
    if (err) {
      res.send(err)
      console.log(err)
    } else {
      res.send(results)
      console.log(results)
    }
  })
})

// Get User

app.post("/getuser", (req, res) => {
  const email = req.body.email

  console.log(email)

  const query = `SELECT * FROM cloud.user WHERE cloud.user.email = '${email}';`

  client.query(query, (err, results) => {
    if (err) {
      res.send(err)
      console.log(err)
    } else {
      res.send(results)
      console.log(results)
      // const { rows } = results
      // res.send(JSON.stringify(rows.map(each => each.id)))

      // rows.map(each => console.log(each.id))
    }
  })
})

// Create User And Partner

app.post("/createuser", (req, res) => {
  const { email, username } = req.body
  console.log("EMAIL", email)
  try {
    const newUserId = uuidv1()
    const newPartnerId = uuidv1()
    console.log(1, { newPartnerId })
    const userQuery = `INSERT INTO cloud.user (id, email, phone, partner_id, role, username) VALUES ('${newUserId}', '${email}', '1212121212', '${newPartnerId}', 'ADMIN', '${username}');`

    client.query(userQuery, (err, results) => {
      if (err) {
        res.send(err)
        console.log(err)
      } else {
        console.log("USER CREATED", results)
      }
    })

    const partnerQuery = `INSERT INTO cloud.partner (id, name) VALUES ('${newPartnerId}', 'Partner-${newPartnerId}');`
    console.log(2, { newPartnerId })
    client.query(partnerQuery, (err, results) => {
      if (err) {
        res.send(err)
        console.log(err)
      } else {
        console.log("Partner CREATED", results)
        // res.send({
        //   message: `Partner CREATED", ${results}`,
        //   body: results
        // })
      }
    })

    res.send(newPartnerId)
  } catch (err) {
    console.log("Query Error", err)
  }
})

// Update Partner Table

app.post("/updatepartner", (req, res) => {
  const { partner_id, partnerName } = req.body.partner
  // console.log(partner_id, partnerName)
  const query = `UPDATE cloud.partner SET name = '${partnerName}' WHERE (id = '${partner_id}');`
  client.query(query, (err, results) => {
    if (err) {
      res.send(err)
      console.log(err)
    } else {
      res.send(results)
      console.log(results)
      // const { rows } = results
      // res.send(JSON.stringify(rows.map(each => each.id)))

      // rows.map(each => console.log(each.id))
    }
  })
})

// Invite User To Join Partner

app.post("/updateuser", (req, res) => {
  const { userName, email, phone, role, partner_id } = req.body.user

  console.log(req.body.user)
  const query = `UPDATE cloud.user SET partner_id = '${partner_id}',  username = '${userName}', phone = '${phone}' , role ='${role}'  WHERE (email = '${email}');`
  // const query = `UPDATE cloud.user SET partner_id = '${partner_id}', SET username = '${userName}', SET phone = '${phone}', SET role = '${role}' WHERE (email = '${email}'); SET SQL_SAFE_UPDATES = 0;`

  client.query(query, (err, results) => {
    if (err) {
      res.send(err)
      console.log(err)
    } else {
      res.send(results)
      console.log("UPDATED User", results)
    }
  })
})

// Input Data into Table

app.get("/register", (req, res) => {
  // const query = "INSERT INTO `cloud`.`user` (`id`, `email`, `phone`, `partner_id`, `role`) VALUES ('31331', '112', '1212121212', '1', '1');"
  // client.query(query, (err, results) => {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     res.send("Table Created")
  //   }
  // })
})

const port = 4000
app.listen(port, () => {
  console.log("We Are Live On Port ", port)
})
