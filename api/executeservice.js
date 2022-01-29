const { exec } = require('child_process')

const getWireguardStatus = () => {
    let status
    const setstatus = (input) => {
        status = input
    }
    exec(
        'systemctl status wg-quick@wg0.service',
        { uid: 1000 },
        function (error, stdout, stderr) {
            setstatus(stdout)
        }
    )
    console.log(status)
    return status
}

const restartWireguardService = () =>
    exec('sudo systemctl restart wg-quick@wg0.service', { uid: 1000 })

const generateKeys = (client_name) => {
    const lowered_name = client_name.toLowerCase()
    exec(`~/wireguardadminportal/api/wgkeygen.sh ${lowered_name}`, {
        uid: 1000,
    })

    const privkey = exec(
        `cat ~/wireguardadmininfo/clientkeys/${lowered_name}/privatekey`,
        { uid: 1000 },
        function (error, stdout, stderr) {
            return stdout
        }
    )
    const pubkey = exec(
        `cat ~/wireguardadmininfo/clientkeys/${lowered_name}/publickey`,
        { uid: 1000 },
        function (error, stdout, stderr) {
            return stdout
        }
    )

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
