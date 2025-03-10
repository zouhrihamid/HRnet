import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Pages/Home/Home';
import Employees from './Components/Pages/Employee/Employees';
import { Routes, Route } from 'react-router-dom';
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
