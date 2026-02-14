const express = require("express")
const app = express()
const mongoose = require("mongoose")
const userRouter = require("./router/userRouter")
const eventRouter = require("./router/eventRouter")
const dotenv = require("dotenv")
dotenv.config()
app.use(express.json())
app.use("/api/user", userRouter)
app.use("/api/event", eventRouter)


const {PORT ,DB_USER ,DB_PASSWORD} = process.env

const dburl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.5liukrt.mongodb.net/?appName=Cluster0`



mongoose.connect(dburl)
        .then(() => console.log("Database Contected"))
        .catch((e) => console.log(e.message))







app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})