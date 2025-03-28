import SelectInput from 'my-input-select-library';
import 'my-input-select-library/dist/components/SelectInput.css';
import '../../styles/InputField.css';
const CustomSelectInput = ({ label, name, value, options, onChange, onBlur }) => (
      <div className="custom-select-container">
            <SelectInput label={label} name={name} value={value} options={options} onChange={onChange} onBlur={onBlur} isRequired={false} />
      </div>
);

export default CustomSelectInput;
