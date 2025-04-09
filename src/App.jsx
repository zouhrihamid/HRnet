import { useState } from 'react';
import Header from './Components/organisms/Header';
import Footer from './Components/organisms/Footer';
import Home from './pages/Home';
import Employees from './pages/Employees';
import { Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import mockEmployees from './Data/mockEmployees';
function App() {
      const [employees, setEmployees] = useState(mockEmployees);
      return (
            <div className="app-container">
                  <Header />
                  <Routes>
                        <Route path="/" element={<Home employees={employees} setEmployees={setEmployees} />} />
                        <Route path="/employees" element={<Employees employees={employees} setEmployees={setEmployees} />} />
                  </Routes>
                  <Footer />
            </div>
      );
}
export default App;
