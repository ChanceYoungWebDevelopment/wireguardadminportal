const { execSync } = require('child_process')
const workingdirectory = '/home/chance/'
const userObj = {
    uid: 1000,
    cwd: workingdirectory,
}

const getWireguardStatus = () => {
    return execSync('systemctl status wg-quick@wg0.service', {
        uid: 1000,
    })
}

const restartWireguardService = () =>
    execSync('sudo systemctl restart wg-quick@wg0.service', { uid: 1000 })

const generateKeys = (client_uuid) => {
    execSync(
        `./actions-runner/main/wireguardadminportal/wireguardadminportal/api/wgkeygen.sh ${client_uuid}`,
        userObj
    )

    const privkey = execSync(
        `cat ./clientkeys/${client_uuid}/privatekey`,
        userObj
    )
    const pubkey = execSync(
        `cat ./clientkeys/${client_uuid}/publickey`,
        userObj
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
    ' > ./clientkeys/${config.client_uuid}/client_configuration.conf`,
        userObj
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
