import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicNote from './pages/PublicNote';
import { useEffect, useState } from 'react';
import { SiteContext } from './context/siteContext';

function App() {
  const [siteData, setSiteData] = useState({
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: null,
    notes: [],
    data_loaded: false,
  });
  useEffect(() => {
    const user = localStorage.getItem('user_infov1');

    if (user) {
      setSiteData({ ...siteData, user: JSON.parse(user), data_loaded: true });
    }
  }, []);
  return (
    <>
      <SiteContext.Provider value={{ siteData, setSiteData }}>
        <Router>
          <div className="container">
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/public_notes" element={<PublicNote />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      </SiteContext.Provider>
    </>
  );
}

export default App;
