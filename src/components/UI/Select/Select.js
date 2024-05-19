import classes from './Select.module.css'

export const Select = ({ label, onChange, value, options }) => {

    return (
        <div className={classes.Select}>
            <label htmlFor={label}>{label}</label>
            <select
                id={label}
                value={value}
                onChange={onChange}
            >
                {options.map((option, index) => {
                    return (
                        <option
                            value={option.value}
                            key={index}
                        >
                            {option.text}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}