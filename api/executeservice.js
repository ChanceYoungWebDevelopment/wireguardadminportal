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

    return {
        pubkey: pubkey.toString().trim(),
        privkey: privkey.toString().trim(),
    }
}

const getVpnPubKey = () => {
    return execSync('sudo cat /etc/wireguard/publickey', {
        uid: 1000,
    })
        .toString()
        .trim()
}

const createConfigFile = (config) => {
    execSync(
        `echo '
    [Interface]
    PrivateKey = ${config.client_privkey}
    Address = ${config.ip_address}/24
    DNS = 8.8.8.8

    [Peer]
    PublicKey = ${getVpnPubKey()}
    AllowedIPs = ${config.allowed_ip_range}/0
    Endpoint = 198.58.118.71:51820
    ' > ~/wireguardadmininfo/clientkeys/${config.client_name.toLowerCase()}/${
            config.client_name
        }.conf`,
        { uid: 1000 }
    )
}

const grantPeerAccess = (peer_pubkey, peer_address) => {
    execSync(
        `sudo wg set wg0 peer ${peer_pubkey} allowed-ips ${peer_address}`,
        { uid: 1000 }
    )
}

const revokePeerAccess = (peer_pubkey) => {
    execSync(`sudo wg set wg0 peer ${peer_pubkey} remove`, { uid: 1000 })
}
module.exports = {
    getWireguardStatus,
    restartWireguardService,
    generateKeys,
    grantPeerAccess,
    revokePeerAccess,
    createConfigFile,
}
