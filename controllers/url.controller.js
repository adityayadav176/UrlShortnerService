const { nanoid } = require('nanoid')
const URL = require('../models/url.models.js')

const handleGenerateNewShortUrl = async (req, res) => {
    const { url } = req.body

    if (!url) {
        return res.status(400).json({ error: "Url is required!" })
    }

    const shortId = nanoid(10);

    await URL.create({
        shortId: shortId,
        redirectId: url,
        visitHistory: [],
    })

    return res.status(200).json({ id: shortId })
}

const handleGetAnalytics = async(req, res) => {
    const {shortId} = req.params

    const result = await URL.findOne({ shortId });
    return res.json({
        totalClick: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics
}