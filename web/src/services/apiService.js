import axios from 'axios'
export const addNewPeer = async (newPeer) => {
    const results = await axios.post('/api/addpeer', { ...newPeer })
    if (results.status === 200) return true
    else return false
}

export const restartWireguard = async () => {
    const results = await axios.get('/api/wgservice/restart')
    console.log(results)
    if (results.status === 200) return true
    else return false
}

export const showWireguardStatus = async () => {
    const results = await axios.get('/api/wgservice')
    console.log(results.data)
    if (results.status === 200) return results.data
}
