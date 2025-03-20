import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './Home.css';
import { SelectInput } from '../../Components/Select/InputSelect';
import { stateOptions, departmentOptions } from '../../Data/Data';
import Modal from '../../Components/Modal/Modal';
import '../../Components/Select/InputSelect.css';
import CustomDatePicker from '../../Components/DatePicker/CustomDate';

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

const InputField = ({ label, name, type = 'text', value, onChange }) => (
      <div className="custom-select-container">
            <label>{label} :</label>
            <input type={type} name={name} value={value} onChange={onChange} required />
      </div>
);

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
            setFormData((prev) => ({ ...prev, [name]: date ? dayjs(date).format('YYYY-MM-DD') : null }));
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
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <div className="input-wrapper">
                                          <CustomDatePicker label="Date of Birth" value={formData?.dateOfBirth || null} onChange={(date) => handleDateChange('dateOfBirth', date)} />
                                    </div>

                                    <div className="input-wrapper">
                                          <CustomDatePicker label="Start Date" value={formData?.startDate || null} onChange={(date) => handleDateChange('startDate', date)} />
                                    </div>
                              </LocalizationProvider>

                              <fieldset className="address">
                                    <legend>Address :</legend>
                                    <InputField label="Street" name="street" value={formData.street} onChange={handleChange} />
                                    <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
                                    <div className="input-wrapper-inligne">
                                          <SelectInput
                                                label="State"
                                                name="state"
                                                value={formData.state}
                                                options={stateOptions}
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
