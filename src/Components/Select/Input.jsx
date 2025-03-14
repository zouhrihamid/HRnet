import { memo } from 'react';

export const SelectInput = memo(({ label, name, value, options = [], onChange }) => {
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

export const InputField = memo(({ label, name, type = 'text', value, onChange }) => (
      <div className="input-wrapper">
            <label>{label} :</label>
            <input type={type} name={name} value={value} onChange={onChange} required />
      </div>
));
