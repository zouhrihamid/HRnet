import '../../styles/InputField.css';

const InputField = ({ label, name, type = 'text', value, onChange, onBlur }) => (
      <div className="custom-select-container">
            <label>{label} :</label>
            <input type={type} name={name} value={value} onChange={onChange} onBlur={onBlur} />
      </div>
);

export default InputField;
