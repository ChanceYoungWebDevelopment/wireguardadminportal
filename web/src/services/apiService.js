import axios from 'axios'
export const addNewPeer = async (newPeer) => {
    const results = await axios.post('/api/addpeer', { ...newPeer })
    if (results.status === 200) return true
    else return false
}

export const restartWireguard = async () => {
    const results = await axios.get('/api/wgservice/restart')
    if (results.status === 200) return true
    else return false
}

export const showWireguardStatus = async () => {
    const results = await axios.get('/api/wgservice')
    if (results.status === 200) return format_status(results.data)
}

const format_status = (status_string) => {
    const words = ['Active:', 'since', 'Docs:', 'Process:', 'Main PID:']
    const positions = words.map((word) => {
        return status_string.search(word)
    })
    console.log(positions)
}
