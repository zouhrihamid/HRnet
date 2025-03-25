import './Home.css';
// import { SelectInput } from '../../Components/Select/InputSelect';
// import '../../Components/Select/InputSelect.css';

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

function Home() {
      const navigate = useNavigate();
      const [formData, setFormData] = useState(initialFormState);
      const [showModal, setShowModal] = useState(false);

      const handleChange = useCallback((e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
      }, []);

      // Gestion du changement des dates
      const handleDateChange = useCallback((name, date) => {
            setFormData((prev) => ({
                  ...prev,
                  [name]: date, // Formatage de la date en "YYYY-MM-DD"
            }));
      }, []);

      const handleSaveEmployee = useCallback(
            (e) => {
                  e.preventDefault();

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
                  <div className="title">
                        <h2>Create Employee</h2>
                  </div>

                  <div className="container">
                        <form className="form-content" onSubmit={handleSaveEmployee}>
                              <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                              <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                              <div>
                                    <CustomDatePicker label="Date of Birth" value={formData.dateOfBirth} onChange={(date) => handleDateChange('dateOfBirth', date)} />

                                    <CustomDatePicker label="Start Date" value={formData.startDate} onChange={(date) => handleDateChange('startDate', date)} />
                              </div>

                              <fieldset className="address">
                                    <legend>Address :</legend>
                                    <InputField label="Street" name="street" value={formData.street} onChange={handleChange} />
                                    <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
                                    <div className="input-wrapper-inligne">
                                          <SelectInput
                                                label="State"
                                                name="state"
                                                value={formData.state}
                                                options={states.map(({ name, abbreviation }) => ({ value: abbreviation, label: name }))}
                                                onChange={handleChange}
                                                isRequired={true}
                                                className="custom-select-container"
                                          />
                                          <InputField label="Zip Code" name="zipCode" type="number" value={formData.zipCode} onChange={handleChange} />
                                    </div>
                              </fieldset>

                              <SelectInput
                                    label="Department"
                                    name="department"
                                    value={formData.department}
                                    options={departmentOptions}
                                    onChange={handleChange}
                                    isRequired={true}
                                    className="custom-select-container"
                              />

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
