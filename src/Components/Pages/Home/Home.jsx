import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

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

      const [confirmation, setConfirmation] = useState(false);

      const handleChange = (e) => {
            setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
            });
      };

      const handleSaveEmployee = (e) => {
            e.preventDefault();

            const employees = JSON.parse(localStorage.getItem('employees')) || [];

            employees.push({ id: Date.now(), ...formData });

            localStorage.setItem('employees', JSON.stringify(employees));

            setConfirmation(true);

            setTimeout(() => {
                  setConfirmation(false);
                  navigate('/employees');
            }, 2000);
      };

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
                                          <div className="input-wrapper">
                                                <label>State :</label>
                                                <select name="state" className="select" value={formData.state} onChange={handleChange} required>
                                                      <option value="">Select a state</option>
                                                      <option value="NY">New York</option>
                                                      <option value="CA">California</option>
                                                      <option value="TX">Texas</option>
                                                </select>
                                          </div>
                                          <div className="input-wrapper">
                                                <label>Zip Code :</label>
                                                <input type="number" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                                          </div>
                                    </div>
                              </fieldset>

                              <div className="input-wrapper">
                                    <label>Department</label>
                                    <select name="department" className="select" value={formData.department} onChange={handleChange} required>
                                          <option value="">Select a department</option>
                                          <option value="Sales">Sales</option>
                                          <option value="Marketing">Marketing</option>
                                          <option value="Engineering">Engineering</option>
                                          <option value="Human Resources">Human Resources</option>
                                          <option value="Legal">Legal</option>
                                    </select>
                              </div>
                              <button type="submit" className="save">
                                    Save
                              </button>
                        </form>

                        {confirmation && (
                              <div id="confirmation" className="modal">
                                    Employee Created!
                              </div>
                        )}
                  </div>
            </main>
      );
}

export default Home;
