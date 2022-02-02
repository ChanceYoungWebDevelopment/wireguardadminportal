const express = require('express')
const app = express()
const port = process.env.WGA_PORT || 3500
const wgservice = require('./wgservicerouter')
const execservice = require('./executeservice')
const dbservice = require('./dbservice')

//TODO:
//Add check to see if peer exists in db
//remove clientkeys folder when access revoked
//

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

    //TODO:
    //wrap in try/catch block
    const new_client_info = await dbservice.addPeerData({
        ...temp_peer,
        ...execservice.generateKeys(temp_peer.name),
    })
    execservice.grantPeerAccess(
        new_client_info.client_pubkey,
        new_client_info.ip_address
    )
    execservice.createConfigFile({ ...new_client_info })
    res.sendFile(
        `/home/chance/wireguardadmininfo/clientkeys/${new_client_info.client_name.toLowerCase()}/${
            new_client_info.client_name
        }.conf`
    )
})

app.get('/removepeer', async (req, res) => {
    dbservice.getPeerById(req.body.client_name)
    execservice.revokePeerAccess()
})

app.listen(port, () => {
    console.log('wgapi on port: ', port)
})
