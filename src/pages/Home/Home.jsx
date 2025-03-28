import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeTemplate from '../../Components/templates/EmployeeTemplate';
import { states, departmentOptions } from '../../Data/Data';
import validateForm from '../../Utils/formValidation';
// État initial du formulaire
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
      const [errors, setErrors] = useState({});
      const [showModal, setShowModal] = useState(false);

      // Gestion des changements des inputs
      const handleChange = useCallback((e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
            e.target.classList.add('selected');
      }, []);

      // Gestion du changement des dates
      const handleDateChange = useCallback((name, date) => {
            setFormData((prev) => ({
                  ...prev,
                  [name]: date,
            }));
      }, []);

      // Gestion du blur (validation des champs)
      const handleBlur = (e) => {
            const { name, value } = e.target;
            const updatedFormData = { ...formData, [name]: value };
            const validationErrors = validateForm(updatedFormData);

            setErrors((prevErrors) => ({
                  ...prevErrors,
                  [name]: validationErrors[name] || '',
            }));
      };

      // Gestion de la soumission du formulaire
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

      // Gestion de la fermeture de la modal
      const handleCloseModal = useCallback(() => {
            setShowModal(false);
            navigate('/employees');
      }, [navigate]);

      return (
            <EmployeeTemplate
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  states={states}
                  departmentOptions={departmentOptions}
                  showModal={showModal}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleDateChange={handleDateChange}
                  handleSaveEmployee={handleSaveEmployee}
                  handleCloseModal={handleCloseModal}
            />
      );
}

export default Home;
