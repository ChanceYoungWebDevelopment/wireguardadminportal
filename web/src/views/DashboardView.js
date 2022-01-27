import { useState, useEffect } from 'react'
import WireguardInfoForm from '../input/WireguardInfoForm'
import { restartWireguard, showWireguardStatus } from '../services/apiService'

const DashboardView = () => {
    const [addPeer, setAddPeer] = useState(false)
    const [successfulRestart, setSuccessfulRestart] = useState(false)
    const [currentStatus, setCurrentStatus] = useState('')

    useEffect(() => {
        async function getStatusAsync() {
            const status = await showWireguardStatus()
            setCurrentStatus(status)
        }
        getStatusAsync()
    })

    const onAddPeer = () => {
        setAddPeer(!addPeer)
    }
    const onRestartService = async () => {
        const result = await restartWireguard()
        if (result) {
            setSuccessfulRestart(true)
        } else {
            setSuccessfulRestart(false)
        }
    }
    //TODO:
    //show service status in a card
    //show restart button
    //show addclient buttons -> conditionally render add form
    return (
        <div className="container">
            <div className="row">
                <div className="col">{currentStatus}</div>
                <div className="col">
                    <button
                        className="btn btn-primary"
                        onClick={onRestartService}
                    >
                        Restart Service Now
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {addPeer ? (
                        <>
                            <WireguardInfoForm onCancel={onAddPeer} />
                        </>
                    ) : (
                        <button className="btn btn-primary" onClick={onAddPeer}>
                            Add New Client
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DashboardView
