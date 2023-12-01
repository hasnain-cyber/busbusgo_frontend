import AdminDashboard from "./public/pages/AdminDashboard/AdminDashboard";
import AdminLogin from "./public/pages/AdminLogin/AdminLogin";
import CustomerLogin from "./public/pages/CustomerLogin/CustomerLogin";
import CustomerRegister from "./public/pages/CustomerRegister/CustomerRegister";
import LandingPage from "./public/pages/LandingPage/LandingPage";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<LandingPage />} />
      <Route path={'/customerLogin'} element={<CustomerLogin />} />
      <Route path={'/customerRegister'} element={<CustomerRegister />} />
      <Route path={'/adminLogin'} element={<AdminLogin />} />
      <Route path={'/adminDashboard'} element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
