// App.jsx
import {Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import EmailVerify from '../pages/EmailVerify';
import { AuthProvider } from '../context/AuthContext';

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth/verify-email" element={<AuthProvider><EmailVerify /></AuthProvider>} />
        <Route path="*" element={<h2>404 - Página não encontrada</h2>} />
      </Routes>
  );
}
