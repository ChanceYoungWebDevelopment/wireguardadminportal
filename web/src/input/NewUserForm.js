import useInput from '../hooks/use-input'
import TextInput from './TextInput'
import { useState } from 'react'
import { addNewUser } from '../services/apiService'

const NewUserForm = () => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [wasSubmitted, setWasSubmitted] = useState(false)
    const username = useInput(
        'Username',
        'Cannot be empty',
        (value) => value.trim() !== ''
    )
    const password = useInput(
        'Set Password',
        'Cannot be empty',
        (value) => value.trim() !== ''
    )

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if ((username.isValid, password.isValid)) {
            setWasSubmitted(true)
            const success = await addNewUser({
                username: username.value,
                password: password.value,
            })
            if (success) {
                setIsSuccess(true)
            } else {
                setIsSuccess(false)
            }
            username.reset()
            password.reset()
        }
    }

    return (
        <div className="mt-2">
            <h2>Add New Admin User</h2>
            <form onSubmit={onSubmitHandler}>
                <TextInput inputControl={username} />
                <TextInput inputControl={password} />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
            {isSuccess && wasSubmitted && (
                <div className="text-success pt-2">
                    Successfully added a new user!
                </div>
            )}
            {!isSuccess && wasSubmitted && (
                <div className="text-danger pt-2">That was not successful</div>
            )}
        </div>
    )
}

export default NewUserForm
