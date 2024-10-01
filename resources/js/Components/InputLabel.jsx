export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label htmlFor={props.forInput} className={`text-base block mb-2` + className}>
            {value ? value : children}
        </label>
    );
}
