import axios from 'axios'
export const addNewPeer = async (newPeer) => {
    const results = await axios.post('/api/addpeer', { ...newPeer })
    console.log(results)
    if (results.status === 200) return true
    else return false
}
