import Header from './Components/organisms/Header';
import Footer from './Components/organisms/Footer';
import Home from './pages/Home/Home';
import Employees from './pages/Employee/Employees';
import { Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
function App() {
      return (
            <div className="app-container">
                  <Header />
                  <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/employees" element={<Employees />} />
                  </Routes>
                  <Footer />
            </div>
      );
}
export default App;
