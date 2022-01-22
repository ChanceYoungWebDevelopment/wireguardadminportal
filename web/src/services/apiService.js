import axios from 'axios'
export const addNewPeer = async (newPeer) => {
    const results = await axios.post('/api/addpeer', { ...newPeer })
    if (results.status === 200) return true
    else return false
}
