// imports
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")

// init
const app = express()
dotenv.config()

// middleweres
app.use(cors())
app.use(express.json())
app.use("/auth", require('./routes/auth'))
app.use("/cart", require('./routes/cart'))
app.use("/products", require('./routes/products'))

// define static folder
app.use(express.static(path.join(__dirname, 'build')))

// route
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

// run the server
app.listen(80, ()=>console.log("rockin'1000 go visit on http://localhost"))