const express = require('express')
const app = express()
const port = process.env.WGA_PORT || 3500
const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.WGA_POSTGRES_USER,
    host: process.env.WGA_POSTGRES_HOST,
    database: process.env.WGA_POSTGRES_DB,
    password: process.env.WGA_POSTGRES_PASSWORD,
    port: 5432,
})

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hit wga api')
})

app.post('/api/addpeer', (req, res) => {
    const peer = {
        name: req.body.client_name,
        ip: req.body.ip_address,
        allowed: req.body.allowed_ip_range,
        date: req.body.date_added,
        pubkey: req.body.client_public_key,
        privkey: req.body.client_private_key,
    }

    const querystring =
        'insert into wireguard_info(client_name,ip_address,date_added,allowed_ip_range,client_pubkey,client_privkey) values(' +
        "'" +
        peer.name +
        "'" +
        ',' +
        "'" +
        peer.ip +
        "'" +
        ',' +
        "'" +
        peer.date +
        "'" +
        ',' +
        "'" +
        peer.allowed +
        "'" +
        ',' +
        "'" +
        peer.pubkey +
        "'" +
        ',' +
        "'" +
        peer.privkey +
        "'" +
        ')'

    console.log(querystring)
    pool.query(querystring, (err, resp) => {
        if (err) {
            console.log(err)
        }
        res.sendStatus(200)
    })
})

app.listen(port, () => {
    console.log('wgapi on port: ', port)
})
