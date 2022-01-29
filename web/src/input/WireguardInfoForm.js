import useInput from '../hooks/use-input'
import TextInput from './TextInput'
import wgpeer from '../models/wgpeer'
import { useState } from 'react'
import { addNewPeer } from '../services/apiService'
import { TiCancel } from 'react-icons/ti'

const WireGuardInfoForm = (props) => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [wasSubmitted, setWasSubmitted] = useState(false)
    const name = useInput(
        'Client Name',
        'Cannot be empty',
        (value) => value.trim() !== ''
    )
    const ip = useInput(
        'IP Address',
        'Please enter a valid ip address',
        (value) =>
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                value
            )
    )
    const allowed_range = useInput(
        'Allowed IP Range',
        'Please enter a valid ip address',
        (value) =>
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                value
            )
    )
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if ((name.isValid, ip.isValid, allowed_range.isValid)) {
            const newClient = new wgpeer(
                name.value,
                ip.value,
                allowed_range.value
            )
            setWasSubmitted(true)
            const success = await addNewPeer(newClient)
            if (success) {
                setIsSuccess(true)
            } else {
                setIsSuccess(false)
            }
            name.reset()
            ip.reset()
            allowed_range.reset()
        }
    }

    return (
        <div className="mt-2">
            <h2>Add New Client Connection</h2>
            <form onSubmit={onSubmitHandler}>
                <TextInput inputControl={name} />
                <TextInput inputControl={ip} />
                <TextInput inputControl={allowed_range} />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <button className="btn btn-danger m-2" onClick={props.onCancel}>
                    <TiCancel />
                </button>
            </form>
            {isSuccess && wasSubmitted && (
                <div className="text-success pt-2">
                    Successfully added a new peer!
                </div>
            )}
            {!isSuccess && wasSubmitted && (
                <div className="text-danger pt-2">That was not successful</div>
            )}
        </div>
    )
}

export default WireGuardInfoForm
