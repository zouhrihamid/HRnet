import EmployeeForm from '../organisms/EmployeeForm';
import Modal from '../organisms/Modal';

const EmployeeTemplate = ({ showModal, handleCloseModal, ...props }) => (
      <main className="main-container">
            <div className="container">
                  <div className="title">
                        <h2>Create Employee</h2>
                  </div>
                  <EmployeeForm {...props} />
                  {showModal && <Modal message="Employee Created!" onClose={handleCloseModal} />}
            </div>
      </main>
);

export default EmployeeTemplate;
