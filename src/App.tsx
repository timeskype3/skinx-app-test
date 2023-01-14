import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './component/ProtectedRoutes';
import UnprotectedRoutes from './component/UnprotectedRoutes';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route element={<UnprotectedRoutes />}>
        <Route path='/login' element={<LoginPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
