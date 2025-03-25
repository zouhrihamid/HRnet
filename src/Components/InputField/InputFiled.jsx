import './InputField.css';

const InputField = ({ label, name, type = 'text', value, onChange }) => (
      <div className="custom-select-container">
            <label>{label} :</label>
            <input type={type} name={name} value={value} onChange={onChange} required />
      </div>
);
export default InputField;
