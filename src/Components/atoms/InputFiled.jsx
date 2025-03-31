import '../../styles/InputField.css';

const InputField = ({ label, name, type = 'text', value, onChange, onBlur, placeholder }) => (
      <div className="InputField">
            <label>{label} :</label>
            <input
                  type={type}
                  name={name}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder={placeholder} // Assure-toi que le placeholder est bien appliqué
            />
      </div>
);

export default InputField;
