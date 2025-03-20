import PropTypes from 'prop-types';

export const SelectInput = ({ label, name, value, options = [], onChange, isRequired = false, className = '' }) => {
      return (
            <div className={className}>
                  <label>{label}:</label>
                  <select name={name} className={`select ${className}`.trim()} value={value} onChange={onChange} required={isRequired}>
                        <option value="">{label}</option>
                        {options.map((option) => (
                              <option key={option.value} value={option.value}>
                                    {option.label}
                              </option>
                        ))}
                  </select>
            </div>
      );
};

// Définition des PropTypes
SelectInput.propTypes = {
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
            PropTypes.shape({
                  value: PropTypes.string.isRequired,
                  label: PropTypes.string.isRequired,
            })
      ).isRequired,
      onChange: PropTypes.func.isRequired,
      isRequired: PropTypes.bool,
      className: PropTypes.string,
};

export default SelectInput;
