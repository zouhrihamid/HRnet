import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { SelectInput, InputField } from '../../Components/Select/Input';
import { stateOptions, departmentOptions } from '../../Data/Data';
import Modal from '../../Components/Modal/Modal';

//  Initialisation de l'état du formulaire
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
                              <InputField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
                              <InputField label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />

                              <fieldset className="address">
                                    <legend>Address :</legend>
                                    <InputField label="Street" name="street" value={formData.street} onChange={handleChange} />
                                    <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
                                    <div className="input-wrapper-inligne">
                                          <SelectInput label="State" name="state" value={formData.state} options={stateOptions} onChange={handleChange} />
                                          <InputField label="Zip Code" name="zipCode" type="number" value={formData.zipCode} onChange={handleChange} />
                                    </div>
                              </fieldset>

                              <SelectInput label="Department" name="department" value={formData.department} options={departmentOptions} onChange={handleChange} />

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
