// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Index from '../pages/Index';

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<h2>404 - Página não encontrada</h2>} />
      </Routes>
  );
}
