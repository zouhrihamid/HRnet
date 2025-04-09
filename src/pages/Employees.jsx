import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Employees.css';
import EmployeeRow from '../Components/molecules/EmployeeRow';
import Button from '../Components/atoms/Button';
// Icône de tri
const SortIcon = ({ active, direction }) => (
      <span className="sort-icon">
            <span className={`arrow arrow-up ${active && direction === 'asc' ? 'active' : ''}`}>&#129169;</span>
            <span className={`arrow arrow-down ${active && direction === 'desc' ? 'active' : ''}`}>&#129171;</span>
      </span>
);

function Employee({ employees, setEmployees }) {
      const [searchTerm, setSearchTerm] = useState('');
      const [entriesToShow, setEntriesToShow] = useState(5);
      const [currentPage, setCurrentPage] = useState(1);
      const [sortColumn, setSortColumn] = useState(null);
      const [sortDirection, setSortDirection] = useState('asc');
      const navigate = useNavigate();
      const debounceTimeout = useRef(null);

      // Gestion de la recherche avec debounce
      const handleSearchChange = useCallback((value) => {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
            debounceTimeout.current = setTimeout(() => {
                  setSearchTerm(value);
            }, 300);
      }, []);

      // Fonction de tri et filtrage
      const filteredAndSortedEmployees = employees
            .filter((employee) =>
                  [employee.firstName, employee.lastName, employee.city, employee.state, employee.department].some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .sort((a, b) => {
                  if (!sortColumn) return 0;
                  const valueA = a[sortColumn]?.toString().toLowerCase() || '';
                  const valueB = b[sortColumn]?.toString().toLowerCase() || '';
                  return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
            });

      // Pagination
      const totalEntries = filteredAndSortedEmployees.length;
      const totalPages = Math.ceil(totalEntries / entriesToShow);
      const startIndex = (currentPage - 1) * entriesToShow;
      const displayedEmployees = filteredAndSortedEmployees.slice(startIndex, startIndex + entriesToShow);

      // Gestion du tri
      const handleSort = useCallback(
            (column) => {
                  setSortColumn(column);
                  setSortDirection((prevDirection) => (sortColumn === column && prevDirection === 'asc' ? 'desc' : 'asc'));
            },
            [sortColumn]
      );

      // Fonction de suppression d'un employé
      const handleDelete = (employeeId) => {
            const updatedEmployees = employees.filter((employee) => employee.id !== employeeId);
            setEmployees(updatedEmployees);
      };

      return (
            <main className="employee-container">
                  <h1>Current Employees</h1>
                  <div className="container">
                        {/* Contrôles (sélection et recherche) */}
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
                                          <input type="text" placeholder="Search employees" onChange={(e) => handleSearchChange(e.target.value)} />
                                    </div>
                              </div>
                        </div>

                        {/* Tableau des employés */}
                        <table className="employee-table">
                              <thead>
                                    <tr>
                                          {['firstName', 'lastName', 'dateOfBirth', 'startDate', 'street', 'city', 'state', 'zipCode', 'department'].map((column) => (
                                                <th key={column} onClick={() => handleSort(column)} className={sortColumn === column ? sortDirection : ''}>
                                                      <div className="sort-header">
                                                            {column.replace(/([A-Z])/g, ' $1').trim()}
                                                            <SortIcon active={sortColumn === column} direction={sortDirection} />
                                                      </div>
                                                </th>
                                          ))}
                                    </tr>
                              </thead>
                              <tbody>
                                    {displayedEmployees.length > 0 ? (
                                          displayedEmployees.map((employee) => (
                                                <EmployeeRow key={`${employee.id || employee.firstName}-${employee.lastName}`} employee={employee} onDelete={handleDelete} />
                                          ))
                                    ) : (
                                          <tr>
                                                <td colSpan="9">Aucun employé ajouté.</td>
                                          </tr>
                                    )}
                              </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="pagination controls-text">
                              <span>
                                    Showing {startIndex + 1} to {Math.min(startIndex + entriesToShow, totalEntries)} of {totalEntries} entries
                              </span>
                              <div className="next-pre">
                                    <Button text="Prev" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                                    <span>{currentPage}</span>
                                    <Button text="Next" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                              </div>
                        </div>

                        {/* Bouton retour à l'accueil */}
                        <Button text="Home" onClick={() => navigate('/')} className="button-home" />
                  </div>
            </main>
      );
}

export default Employee;
