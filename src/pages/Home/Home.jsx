import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import SelectInput from '../../Components/Select/SelectInput';
import { stateOptions, departmentOptions } from '../../Data/Data';
import Modal from '../../Components/Modal/Modal';

function Home() {
      const navigate = useNavigate();
      const [formData, setFormData] = useState({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            startDate: '',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            department: '',
      });

      const [showModal, setShowModal] = useState(false);

      const handleChange = useCallback((e) => {
            setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
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
                              <div className="input-wrapper">
                                    <label>First Name :</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                              </div>
                              <div className="input-wrapper">
                                    <label>Last Name :</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                              </div>
                              <div className="input-wrapper">
                                    <label>Date of Birth :</label>
                                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                              </div>
                              <div className="input-wrapper">
                                    <label>Start Date :</label>
                                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                              </div>

                              <fieldset className="address">
                                    <legend>Address :</legend>
                                    <div className="input-wrapper">
                                          <label>Street :</label>
                                          <input type="text" name="street" value={formData.street} onChange={handleChange} required />
                                    </div>
                                    <div className="input-wrapper">
                                          <label>City :</label>
                                          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                                    </div>
                                    <div className="input-wrapper-inligne">
                                          <SelectInput label="State" name="state" value={formData.state} options={stateOptions} onChange={handleChange} />
                                          <div className="input-wrapper">
                                                <label>Zip Code :</label>
                                                <input type="number" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                                          </div>
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
