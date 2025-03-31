import InputField from '../../Components/atoms/InputFiled';
import '../../styles/validation.css';

const InputGroup = ({ label, name, type, value, onChange, onBlur, placeholder, error }) => (
      <div className="container-input-error">
            <InputField label={label} name={name} type={type} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} />
            {error && <div className="error">{error}</div>}
      </div>
);

export default InputGroup;
