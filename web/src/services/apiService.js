import axios from 'axios'
import FileDownload from 'js-file-download'
export const addNewPeer = async (newPeer) => {
    const results = await axios.post(
        '/api/addpeer',
        { ...newPeer },
        { responseType: 'blob' }
    )
    FileDownload(results.data, `${newPeer.client_name}.conf`)
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
    if (results.status === 200) return results.data
}

export const removePeerAcess = async (clientname) => {
    const results = await axios.get('/api/removepeer?client_name=' + clientname)
    if (results.status === 200) return true
    else return false
}
