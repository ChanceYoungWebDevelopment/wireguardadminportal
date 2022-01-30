const pool = require('./pgPoolCreator')

const addPeerData = async (passed_peer) => {
    const peer = {
        ...passed_peer,
        date: `${new Date().toISOString().slice(0, 10)}`,
    }

    const query = `insert into wireguard_info(client_name,ip_address,date_added,allowed_ip_range,client_pubkey,client_privkey) 
                    values($1, $2, $3,$4,$5,$6) returning ip_address, client_pubkey`
    const values = [
        peer.name,
        peer.ip,
        peer.date,
        peer.allowed,
        peer.pubkey,
        peer.privkey,
    ]

    const results = await pool.query(query, values)
    return results.rows[0]
}

module.exports = { addPeerData }
