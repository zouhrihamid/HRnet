// src/Utils/formValidation.js

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
      } else {
            const dateOfBirth = new Date(formData.dateOfBirth);
            const currentDate = new Date();
            if (dateOfBirth.getFullYear() < currentDate.getFullYear() - 150 || dateOfBirth.getFullYear() > currentDate.getFullYear() - 18) {
                  errors.dateOfBirth = `Date of Birth must be between ${currentDate.getFullYear() - 150} and ${currentDate.getFullYear() - 18}`;
            }
      }
      if (!formData.startDate) {
            errors.startDate = 'Start Date is required';
      } else {
            const startDate = new Date(formData.startDate);
            const currentDate = new Date();
            if (startDate > currentDate) {
                  errors.startDate = 'Start Date cannot be in the future';
            }
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
export default validateForm;
