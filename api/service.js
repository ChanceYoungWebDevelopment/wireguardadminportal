var express = require('express')
var router = express.Router()
var exec = require('child_process').exec

// define the home page route
router.get('/', function (req, res) {
    exec(
        'systemctl status wg-quick@wg0.service',
        { uid: 1000 },
        function (error, stdout, stderr) {
            res.send(stdout)
        }
    )
})

router.get('/restart', function (req, res) {
    exec(
        'sudo systemctl restart wg-quick@wg0.service',
        { uid: 1000 },
        function (error, stdout, stderr) {
            if (error) res.sendStatus(500)
            else if (stderr) res.send(stderr)
            else res.sendStatus(200)
        }
    )
})

//TODO:
// pull last peer.name and return result.rows[0]
// wg set wg0 peer pulled.publickey allowed ips pulled.allowed_ips etc...
// generate the client configfile:
// vpn_ip = process.env.WHATEVER
// Handlebars.compile(sometemplatefile)
// template({VPN_IP: process.env.WHATEVER, })
// /peer.name/config
// res.sendfile(peer.name/config)

module.exports = router
