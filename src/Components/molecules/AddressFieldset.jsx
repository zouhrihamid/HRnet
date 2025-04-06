import InputGroup from './InputGroup';
import CustomSelectInput from '../atoms/CustomSelectInput';
import '../../styles/Home.css';
const AddressFieldset = ({ formData, handleChange, handleBlur, states, errors }) => (
      <fieldset className="address">
            <legend>Address:</legend>
            <InputGroup label="Street" name="street" value={formData.street} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your street" error={errors.street} />
            <InputGroup label="City" name="city" value={formData.city} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your city" error={errors.city} />
            <div className="input-wrapper-inligne">
                  <div className="container-input-error">
                        <CustomSelectInput
                              label="State"
                              name="state"
                              value={formData.state}
                              options={states.map(({ name, abbreviation }) => ({
                                    value: abbreviation,
                                    label: name,
                              }))}
                              onChange={handleChange}
                              onBlur={handleBlur}
                        />
                        {errors.state && <div className="error-select">{errors.state}</div>}
                  </div>
                  <InputGroup
                        label="Zip Code"
                        name="zipCode"
                        type="number"
                        value={formData.zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your zip code"
                        error={errors.zipCode}
                  />
            </div>
      </fieldset>
);

export default AddressFieldset;
