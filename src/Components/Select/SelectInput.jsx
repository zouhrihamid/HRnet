import { memo } from 'react';

const SelectInput = memo(({ label, name, value, options, onChange }) => {
      return (
            <div className="input-wrapper">
                  <label>{label}:</label>
                  <select name={name} className="select" value={value} onChange={onChange} required>
                        <option value="">Select a {label}</option>
                        {options.map((option) => (
                              <option key={option.value} value={option.value}>
                                    {option.label}
                              </option>
                        ))}
                  </select>
            </div>
      );
});

export default SelectInput;
