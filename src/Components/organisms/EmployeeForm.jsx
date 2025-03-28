import InputGroup from '../molecules/InputGroup';
import AddressFieldset from '../molecules/AddressFieldset';
import CustomDatePicker from '../atoms/CustomDatePicker';
import CustomSelectInput from '../atoms/SelectInput';
import Button from '../atoms/Button';

const EmployeeForm = ({ formData, handleChange, handleBlur, handleDateChange, handleSaveEmployee, states, departmentOptions, errors }) => (
      <form className="form-content" onSubmit={handleSaveEmployee}>
            <InputGroup label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your first name" error={errors.firstName} />
            <InputGroup label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your last name" error={errors.lastName} />

            <CustomDatePicker label="Date of Birth" value={formData.dateOfBirth} onChange={(date) => handleDateChange('dateOfBirth', date)} onBlur={handleBlur} />
            {errors.dateOfBirth && <div className="error">{errors.dateOfBirth}</div>}

            <CustomDatePicker label="Start Date" value={formData.startDate} onChange={(date) => handleDateChange('startDate', date)} onBlur={handleBlur} />
            {errors.startDate && <div className="error">{errors.startDate}</div>}

            <AddressFieldset formData={formData} handleChange={handleChange} handleBlur={handleBlur} states={states} errors={errors} />

            <CustomSelectInput label="Department" name="department" value={formData.department} options={departmentOptions} onChange={handleChange} onBlur={handleBlur} />
            {errors.department && <div className="error-select">{errors.department}</div>}

            <Button text="Save" type="submit" />
      </form>
);

export default EmployeeForm;
