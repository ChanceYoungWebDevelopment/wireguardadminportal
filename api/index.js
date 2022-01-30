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
    // mkdir peer.name
    // $ wg genkey | tee peer.name/privatekey | wg pubkey > peer.name/publickey
    // peer.privkey = stdout cat > peer.name/privatekey
    // peer.pubkey = stdout cat > peer.name/publickey

    //wrap in try/catch block
    const new_client_info = await dbservice.addPeerData({
        ...temp_peer,
        ...execservice.generateKeys(temp_peer.name),
    })
    execservice.grantPeerAccess(
        new_client_info.pub_key,
        new_client_info.ip_address
    )
    // const vpnpubkey = execservice.getVpnPubKey()

    //TODO:
    // generate the client configfile:
    // Handlebars.compile(sometemplatefile)
    // template({VPN_IP: process.env.WHATEVER, })
    // /peer.name/config
    // res.sendfile(peer.name/config)
})

app.listen(port, () => {
    console.log('wgapi on port: ', port)
})
