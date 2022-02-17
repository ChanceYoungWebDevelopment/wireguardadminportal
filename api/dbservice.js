const pool = require('./pgPoolCreator')

const addPeerData = async (passed_peer) => {
    const peer = {
        ...passed_peer,
        date: `${new Date().toISOString().slice(0, 10)}`,
    }

    const query = `insert into wgadmin.wireguard_info(client_name,ip_address,date_added,allowed_ip_range,client_pubkey,client_privkey,client_uuid) 
                    values($1, $2, $3,$4,$5,$6,$7) returning *`
    const values = [
        peer.name,
        peer.ip,
        peer.date,
        peer.allowed,
        peer.pubkey,
        peer.privkey,
        peer.client_uuid,
    ]

    const results = await pool.query(query, values)
    return results.rows[0]
}

const addNewUser = async (info) => {
    const query = `insert into portfolio.session_user(username, hashed_password, password_salt) values($1,$2,$3)`
    const values = [info.username, info.hashed_password, info.salt]
    const dbresult = await pool.query(query, values)
    return dbresult.rows
}

module.exports = { addPeerData, addNewUser }
