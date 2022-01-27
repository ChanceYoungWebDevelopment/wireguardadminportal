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
    return (
        <div className="container">
            <div className="row">
                <pre className="col-10">{currentStatus}</pre>
                <div className="col-2">
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
