import { useEffect, useState, useMemo, useCallback, memo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Employees.css';

//  Icône de tri
const SortIcon = ({ active, direction }) => (
      <span className="sort-icon">
            <span className={`arrow arrow-up ${active && direction === 'asc' ? 'active' : ''}`}>&#129169;</span>
            <span className={`arrow arrow-down ${active && direction === 'desc' ? 'active' : ''}`}>&#129171;</span>
      </span>
);

//  Composant optimisé pour une ligne employé (évite les rendus inutiles)
const EmployeeRow = memo(({ employee }) => (
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
));

function Employee() {
      const [employees, setEmployees] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [entriesToShow, setEntriesToShow] = useState(5);
      const [currentPage, setCurrentPage] = useState(1);
      const [sortColumn, setSortColumn] = useState(null);
      const [sortDirection, setSortDirection] = useState('asc');
      const navigate = useNavigate();
      const debounceTimeout = useRef(null);

      //  Chargement des employés depuis le localStorage
      useEffect(() => {
            const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
            setEmployees(storedEmployees);
      }, []);

      //  Gestion de la recherche avec debounce
      const handleSearchChange = useCallback((value) => {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
            debounceTimeout.current = setTimeout(() => {
                  setSearchTerm(value);
            }, 300);
      }, []);

      //  Fonction de tri et filtrage optimisée
      const filteredAndSortedEmployees = useMemo(() => {
            return employees
                  .filter((employee) => [employee.firstName, employee.lastName, employee.city, employee.state, employee.department].some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())))
                  .sort((a, b) => {
                        if (!sortColumn) return 0;
                        const valueA = a[sortColumn]?.toString().toLowerCase() || '';
                        const valueB = b[sortColumn]?.toString().toLowerCase() || '';
                        return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
                  });
      }, [employees, searchTerm, sortColumn, sortDirection]);

      //  Pagination optimisée
      const totalEntries = filteredAndSortedEmployees.length;
      const totalPages = useMemo(() => Math.ceil(totalEntries / entriesToShow), [totalEntries, entriesToShow]);
      const startIndex = (currentPage - 1) * entriesToShow;
      const displayedEmployees = useMemo(() => filteredAndSortedEmployees.slice(startIndex, startIndex + entriesToShow), [filteredAndSortedEmployees, startIndex, entriesToShow]);

      //  Gestion du tri
      const handleSort = useCallback(
            (column) => {
                  setSortColumn(column);
                  setSortDirection((prevDirection) => (sortColumn === column && prevDirection === 'asc' ? 'desc' : 'asc'));
            },
            [sortColumn]
      );

      return (
            <main className="employee-container">
                  <h1>Current Employees</h1>
                  <div className="container">
                        {/*  Contrôles (sélection et recherche) */}
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

                        {/*  Tableau des employés */}
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
                                          displayedEmployees.map((employee) => <EmployeeRow key={`${employee.id || employee.firstName}-${employee.lastName}`} employee={employee} />)
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
                                    <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                                          Previous
                                    </button>
                                    <span>{currentPage}</span>
                                    <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                                          Next
                                    </button>
                              </div>
                        </div>

                        {/* Bouton retour à l'accueil */}
                        <button className="button-home" onClick={() => navigate('/')}>
                              Home
                        </button>
                  </div>
            </main>
      );
}

export default Employee;
