require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRouter = require("./routers/userRouter")
const scootersRouter = require("./routers/scooterRouter")
const scooterRouterMvc = require('./routers/scooterRouterMvc')
const bookingsRouter = require('./routers/bookingsRouter')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.static("views"))
app.use(userRouter)
app.use(scootersRouter)
app.use(scooterRouterMvc)
app.use(bookingsRouter)

// client
const clientRouterMvc = require("./routers/clientRouterMvc")
app.use(clientRouterMvc)

//rent
const rentRouterMvc = require('./routers/rentRouterMvc')
app.use(rentRouterMvc)

app.set("views", "views")
app.set("view engine", "ejs")


mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', ()=>{
    console.log("Connected to MongoDB.")
})

mongoose.connection.on('error', (err) => {
    console.log("Error: "+err.message)
})

app.listen(process.env.API_PORT, () => {
    console.log("Server up and running.")
})