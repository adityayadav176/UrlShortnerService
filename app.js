const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const urlRoute = require("./routes/url.routes.js")
const URL = require('./models/url.models.js')
const { Timestamp } = require('bson')

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

app.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;

    if (!shortId) {
        return res.status(400).json({ error: "shortId required!" });
    }

    const entry = await URL.findOneAndUpdate(
        {
            shortId: shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { new: true }
    );

    if (!entry) {
        return res.status(404).json({ error: "URL not found!" });
    }

    res.redirect(entry.redirectId);
});

app.get("/", (req, res) => {
    res.send("Api Running...")
})

module.exports = {
    app
}
