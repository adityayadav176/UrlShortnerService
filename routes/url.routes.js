const express = require('express')
const {handleGenerateNewShortUrl} = require("../controllers/url.controller.js")

const router = express.Router();

router.post('/', handleGenerateNewShortUrl);

module.exports = router;