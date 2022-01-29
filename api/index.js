const express = require('express')
const app = express()
const port = process.env.WGA_PORT || 3500
const wgservice = require('./wgservicerouter')
const execservice = require('./executeservice')

app.use(express.json())
app.use('/wgservice', wgservice)

app.get('/', (req, res) => {
    res.send('hit wga api')
})

app.post('/addpeer', async (req, res) => {
    const temp_peer = {
        name: req.body.client_name,
        ip: req.body.ip_address,
        allowed: req.body.allowed_ip_range,
    }
    const peer = { ...temp_peer, ...execservice.generateKeys(temp_peer.name) }
    console.log(peer)
    // mkdir peer.name
    // $ wg genkey | tee peer.name/privatekey | wg pubkey > peer.name/publickey
    // peer.privkey = stdout cat > peer.name/privatekey
    // peer.pubkey = stdout cat > peer.name/publickey

    //wrap in try/catch block
    // const new_client_info = await dbservice.addPeerData(peer)
    // const vpnpubkey = exec('sudo cat /etc/wireguard/publickey')

    //TODO:
    // exec(wg set wg0 peer pulled.publickey --remove allowed ips pulled.allowed_ips etc...)

    // generate the client configfile:
    // Handlebars.compile(sometemplatefile)
    // template({VPN_IP: process.env.WHATEVER, })
    // /peer.name/config
    // res.sendfile(peer.name/config)
})

app.listen(port, () => {
    console.log('wgapi on port: ', port)
})
