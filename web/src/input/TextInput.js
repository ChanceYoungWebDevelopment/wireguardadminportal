export default function TextInput({ inputControl, type }) {
    const inputClasses = inputControl.hasError
        ? 'form-control is-invalid'
        : 'form-control'

    return (
        <div className="col form-floating mb-3">
            <input
                className={inputClasses}
                type={type || 'text'}
                id={inputControl.name}
                value={inputControl.value}
                onChange={inputControl.valueChangeHandler}
                onBlur={inputControl.inputBlurHandler}
                placeholder={inputControl.name}
            />
            <label htmlFor={inputControl.name}>{inputControl.name}</label>
            {inputControl.hasError && (
                <p className="invalid-feedback">{inputControl.error}</p>
            )}
        </div>
    )
}
