import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Employees.css';

function Employee() {
      const [employees, setEmployees] = useState([]);

      useEffect(() => {
            const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
            setEmployees(storedEmployees);
      }, []);

      // Fonction pour supprimer un employé
      const handleDelete = (id) => {
            const updatedEmployees = employees.filter((employee) => employee.id !== id);
            setEmployees(updatedEmployees);
            // Sauvegarder les changements dans le localStorage
            localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      };

      return (
            <main className="employee-container">
                  <h1>Current Employees</h1>
                  <div className="container">
                        <table className="employee-table">
                              <thead>
                                    <tr>
                                          <th>First Name</th>
                                          <th>Last Name</th>
                                          <th>Date of Birth</th>
                                          <th>Start Date</th>
                                          <th>Street</th>
                                          <th>City</th>
                                          <th>State</th>
                                          <th>Zip Code</th>
                                          <th>Department</th>
                                          <th>Actions</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {employees.length > 0 ? (
                                          employees.map((employee) => (
                                                <tr key={employee.id}>
                                                      <td>{employee.firstName}</td>
                                                      <td>{employee.lastName}</td>
                                                      <td>{employee.dateOfBirth}</td>
                                                      <td>{employee.startDate}</td>
                                                      <td>{employee.street}</td>
                                                      <td>{employee.city}</td>
                                                      <td>{employee.state}</td>
                                                      <td>{employee.zipCode}</td>
                                                      <td>{employee.department}</td>
                                                      <td>
                                                            <button className="delete-btn" onClick={() => handleDelete(employee.id)}>
                                                                  Supprimer
                                                            </button>
                                                      </td>
                                                </tr>
                                          ))
                                    ) : (
                                          <tr>
                                                <td colSpan="10">Aucun employé ajouté.</td>
                                          </tr>
                                    )}
                              </tbody>
                        </table>
                  </div>
            </main>
      );
}

export default Employee;
