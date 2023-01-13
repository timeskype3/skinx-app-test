import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './component/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
