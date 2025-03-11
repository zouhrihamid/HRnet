import { useEffect, useState, useMemo, memo } from 'react';
import './Employees.css';
import { useNavigate } from 'react-router-dom';

const SortIcon = ({ direction }) => (
      <span className={`sort-icon ${direction === 'asc' ? 'asc' : 'desc'}`}>
            <i className={`fa fa-sort-${direction === 'asc' ? 'up' : 'down'}`}></i>
      </span>
);

const EmployeeRow = memo(({ employee }) => {
      return (
            <tr>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.dateOfBirth}</td>
                  <td>{employee.startDate}</td>
                  <td>{employee.street}</td>
                  <td>{employee.city}</td>
                  <td>{employee.state}</td>
                  <td>{employee.zipCode}</td>
                  <td>{employee.department}</td>
            </tr>
      );
});

function Employee() {
      const [employees, setEmployees] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [entriesToShow, setEntriesToShow] = useState(5);
      const [currentPage, setCurrentPage] = useState(1);
      const [sortColumn, setSortColumn] = useState(null);
      const [sortDirection, setSortDirection] = useState('asc');
      const navigate = useNavigate();

      useEffect(() => {
            const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
            setEmployees(storedEmployees);
      }, []);

      const filteredAndSortedEmployees = useMemo(() => {
            let sortedEmployees = [...employees];

            if (sortColumn) {
                  sortedEmployees.sort((a, b) => {
                        const valueA = a[sortColumn]?.toString().toLowerCase() || '';
                        const valueB = b[sortColumn]?.toString().toLowerCase() || '';
                        return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
                  });
            }

            return sortedEmployees.filter((employee) => Object.values(employee).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())));
      }, [employees, searchTerm, sortColumn, sortDirection]);

      const totalEntries = filteredAndSortedEmployees.length;
      const totalPages = Math.ceil(totalEntries / entriesToShow);
      const startIndex = (currentPage - 1) * entriesToShow;
      const displayedEmployees = filteredAndSortedEmployees.slice(startIndex, startIndex + entriesToShow);

      const handleSort = (column) => {
            setSortColumn(column);
            setSortDirection((prev) => (sortColumn === column && prev === 'asc' ? 'desc' : 'asc'));
      };

      return (
            <main className="employee-container">
                  <h1>Current Employees</h1>

                  <div className="container">
                        <div className="controls">
                              <div className="entries-select controls-text">
                                    <label>Show </label>
                                    <select value={entriesToShow} onChange={(e) => setEntriesToShow(Number(e.target.value))}>
                                          <option value="5">5</option>
                                          <option value="10">10</option>
                                          <option value="20">20</option>
                                          <option value={employees.length}>All</option>
                                    </select>
                                    <label> entries</label>
                              </div>
                              <div className="search-box controls-text">
                                    <label>Search: </label>
                                    <div className="search-input-container">
                                          <i className="fa fa-search"></i>
                                          <input type="text" placeholder="Search employees" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                    </div>
                              </div>
                        </div>

                        <table className="employee-table">
                              <thead>
                                    <tr>
                                          {['firstName', 'lastName', 'dateOfBirth', 'startDate', 'street', 'city', 'state', 'zipCode', 'department'].map((column) => (
                                                <th key={column} onClick={() => handleSort(column)} className={sortColumn === column ? sortDirection : ''}>
                                                      {column.replace(/([A-Z])/g, ' $1').trim()}
                                                      {sortColumn === column && <SortIcon direction={sortDirection} />}
                                                </th>
                                          ))}
                                    </tr>
                              </thead>
                              <tbody>
                                    {displayedEmployees.length > 0 ? (
                                          displayedEmployees.map((employee) => <EmployeeRow key={employee.id} employee={employee} />)
                                    ) : (
                                          <tr>
                                                <td colSpan="9">Aucun employé ajouté.</td>
                                          </tr>
                                    )}
                              </tbody>
                        </table>

                        <div className="pagination controls-text">
                              <span>
                                    Showing {startIndex + 1} to {Math.min(startIndex + entriesToShow, totalEntries)} of {totalEntries} entries
                              </span>
                              <div className="next-pre">
                                    <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                                          Previous
                                    </button>
                                    <span>{currentPage}</span>
                                    <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                                          Next
                                    </button>
                              </div>
                        </div>

                        <button className="button-home" onClick={() => navigate('/')}>
                              Home
                        </button>
                  </div>
            </main>
      );
}

export default Employee;
