import './Home.css';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { states, departmentOptions } from '../../Data/Data';
import Modal from '../../Components/Modal/Modal';
import SelectInput from 'my-input-select-library';
import 'my-input-select-library/dist/components/SelectInput.css';
import CustomDatePicker from '../../Components/DatePicker/CustomDate';
import InputField from '../../Components/InputField/InputFiled';

// Initialisation de l'état du formulaire
const initialFormState = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      department: '',
};

// Validation des champs
const validateForm = (formData) => {
      const errors = {};
      if (formData.firstName.trim().length < 2) {
            errors.firstName = 'First name must be at least 2 characters long';
      }
      if (formData.lastName.trim().length < 2) {
            errors.lastName = 'Last name must be at least 2 characters long';
      }
      if (formData.street.trim().length < 2) {
            errors.street = 'Street must be at least 2 characters long';
      }
      if (formData.city.trim().length < 2) {
            errors.city = 'City must be at least 2 characters long';
      }
      if (!formData.dateOfBirth) {
            errors.dateOfBirth = 'Date of Birth is required';
      }

      if (!formData.startDate) {
            errors.startDate = 'Start Date is required';
      }
      if (!formData.zipCode || formData.zipCode.toString().length < 5) {
            errors.zipCode = 'Zip code must be at least 5 digits long';
      }
      if (!formData.state) {
            errors.state = 'State is required';
      }
      if (!formData.department) {
            errors.department = 'Department is required';
      }
      return errors;
};

function Home() {
      const navigate = useNavigate();
      const [formData, setFormData] = useState(initialFormState);
      const [errors, setErrors] = useState({});
      const [showModal, setShowModal] = useState(false);

      const handleChange = useCallback((e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
            e.target.classList.add('selected');
      }, []);

      const handleDateChange = useCallback((name, date) => {
            setFormData((prev) => ({
                  ...prev,
                  [name]: date,
            }));
      }, []);

      // Handle blur event to show errors when user leaves an input field
      const handleBlur = (e) => {
            const { name, value } = e.target;
            const updatedFormData = { ...formData, [name]: value };

            const validationErrors = validateForm(updatedFormData);

            setErrors((prevErrors) => ({
                  ...prevErrors,
                  [name]: validationErrors[name] || '',
            }));
      };

      const handleSaveEmployee = useCallback(
            (e) => {
                  e.preventDefault();
                  const validationErrors = validateForm(formData);

                  if (Object.keys(validationErrors).length > 0) {
                        setErrors(validationErrors);
                        return;
                  }

                  const employees = JSON.parse(localStorage.getItem('employees') || '[]');
                  const newEmployee = { id: Date.now(), ...formData };

                  localStorage.setItem('employees', JSON.stringify([...employees, newEmployee]));

                  setShowModal(true);
            },
            [formData]
      );

      const handleCloseModal = useCallback(() => {
            setShowModal(false);
            navigate('/employees');
      }, [navigate]);

      return (
            <main className="main-container">
                  <div className="container">
                        <div className="title">
                              <h2>Create Employee</h2>
                        </div>
                        <form className="form-content" onSubmit={handleSaveEmployee}>
                              <div className="container-input-error">
                                    <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your firstname" />
                                    {errors.firstName && <div className="error">{errors.firstName}</div>}
                              </div>
                              <div className="container-input-error">
                                    <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your last name" />
                                    {errors.lastName && <div className="error">{errors.lastName}</div>}
                              </div>
                              <div>
                                    <div className="container-input-error">
                                          <CustomDatePicker label="Date of Birth" value={formData.dateOfBirth} onChange={(date) => handleDateChange('dateOfBirth', date)} onBlur={handleBlur} />
                                          {errors.dateOfBirth && <div className="error">{errors.dateOfBirth}</div>}
                                    </div>

                                    <div className="container-input-error">
                                          <CustomDatePicker label="Start Date" value={formData.startDate} onChange={(date) => handleDateChange('startDate', date)} onBlur={handleBlur} />
                                          {errors.startDate && <div className="error">{errors.startDate}</div>}
                                    </div>
                              </div>

                              <fieldset className="address">
                                    <legend>Address:</legend>
                                    <div className="container-input-error">
                                          <InputField label="Street" name="street" value={formData.street} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your street" />
                                          {errors.street && <div className="error">{errors.street}</div>}
                                    </div>

                                    <div className="container-input-error">
                                          <InputField label="City" name="city" value={formData.city} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your city" />
                                          {errors.city && <div className="error">{errors.city}</div>}
                                    </div>
                                    <div className="input-wrapper-inligne">
                                          <div className="container-input-error">
                                                <SelectInput
                                                      label="State"
                                                      name="state"
                                                      value={formData.state}
                                                      options={states.map(({ name, abbreviation }) => ({
                                                            value: abbreviation,
                                                            label: name,
                                                      }))}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      isRequired={false}
                                                      className="custom-select-container"
                                                />
                                                {errors.state && <div className="error-select">{errors.state}</div>}
                                          </div>
                                          <div className="container-input-error">
                                                <InputField
                                                      label="Zip Code"
                                                      name="zipCode"
                                                      type="number"
                                                      value={formData.zipCode}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      placeholder="Enter your zip code"
                                                />
                                                {errors.zipCode && <div className="error">{errors.zipCode}</div>}
                                          </div>
                                    </div>
                              </fieldset>
                              <div className="container-input-select-error">
                                    <SelectInput
                                          label="Department"
                                          name="department"
                                          value={formData.department}
                                          options={departmentOptions}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          isRequired={false}
                                          className="custom-select-container"
                                    />
                                    {errors.department && <div className="error-select">{errors.department}</div>}
                              </div>
                              <button type="submit" className="save">
                                    Save
                              </button>
                        </form>

                        {showModal && <Modal message="Employee Created!" onClose={handleCloseModal} />}
                  </div>
            </main>
      );
}

export default Home;
