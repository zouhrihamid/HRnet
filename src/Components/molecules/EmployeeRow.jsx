import Button from '../atoms/Button';

// Fonction pour formater la date en dd/mm/yyyy
const formatDate = (date) => {
      if (!date) return '';
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
};

// Composant pour une ligne employé
const EmployeeRow = ({ employee, onDelete }) => (
      <tr>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{formatDate(employee.dateOfBirth)}</td>
            <td>{formatDate(employee.startDate)}</td>
            <td>{employee.street}</td>
            <td>{employee.city}</td>
            <td>{employee.state}</td>
            <td>{employee.zipCode}</td>
            <td>{employee.department}</td>
            <td>
                  <Button text="Delete" onClick={() => onDelete(employee.id)} className="delete-button" />
            </td>
      </tr>
);
export default EmployeeRow;
