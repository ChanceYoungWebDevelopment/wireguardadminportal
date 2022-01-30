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

    return { pubkey: pubkey.toString(), privkey: privkey.toString() }
}

const getVpnPubKey = () => {
    return execSync('sudo cat /etc/wireguard/publickey', {
        uid: 1000,
    }).toString()
}

const grantPeerAccess = (peer_pubkey, peer_address) => {
    execSync(`sudo wg set wg0 peer ${peer_pubkey} allowed-ips ${peer_address}`)
}

const revokePeerAccess = (peer_pubkey) => {
    execSync(`sudo wg set wg0 peer ${peer_pubkey} remove`)
}
module.exports = {
    getWireguardStatus,
    restartWireguardService,
    generateKeys,
    getVpnPubKey,
    grantPeerAccess,
    revokePeerAccess,
}
