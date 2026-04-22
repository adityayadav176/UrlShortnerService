const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const urlRoute = require("./routes/url.routes.js")

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))

app.use('/url', urlRoute);

app.use("/", (req, res) => {
    res.send("Api Running...")
})

module.exports = {
    app
}
