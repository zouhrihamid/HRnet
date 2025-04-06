import '../../styles/InputField.css';

const InputField = ({ label, name, type, value, onChange, onBlur, placeholder }) => (
      <div className="InputField">
            <label>{label} :</label>
            <input type={type} name={name} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} />
      </div>
);

export default InputField;
