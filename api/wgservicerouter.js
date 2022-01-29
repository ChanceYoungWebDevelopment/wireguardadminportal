const express = require('express')
const router = express.Router()
const execservice = require('./executeservice')

// define the home page route
router.get('/', function (req, res) {
    console.log('hit wgservice/')
    res.send(execservice.getWireguardStatus())
})

router.get('/restart', function (req, res) {
    res.send(execservice.restartWireguardService())
})

module.exports = router
