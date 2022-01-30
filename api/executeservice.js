const { execSync } = require('child_process')

const getWireguardStatus = () => {
    return execSync('systemctl status wg-quick@wg0.service', {
        uid: 1000,
    })
}

const restartWireguardService = () =>
    execSync('sudo systemctl restart wg-quick@wg0.service', { uid: 1000 })

const generateKeys = (client_name) => {
    const lowered_name = client_name.toLowerCase()
    execSync(`~/wireguardadminportal/api/wgkeygen.sh ${lowered_name}`, {
        uid: 1000,
    })

    const privkey = execSync(
        `cat ~/wireguardadmininfo/clientkeys/${lowered_name}/privatekey`,
        { uid: 1000 }
    )
    const pubkey = execSync(
        `cat ~/wireguardadmininfo/clientkeys/${lowered_name}/publickey`,
        { uid: 1000 }
    )

    console.log(privkey)
    console.log(pubkey)

    return { pubkey, privkey }
}

// const grantPeerAccess = (peer_to_add) => {
//Needs:
//publickey of client
//ADDRESS of client

//     return
// }

// const revokePeerAccess = () => {}
module.exports = { getWireguardStatus, restartWireguardService, generateKeys }
