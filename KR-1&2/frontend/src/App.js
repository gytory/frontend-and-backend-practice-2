import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProductList from './components/auth/ProductList';
import ProductForm from './components/products/ProductForm';
import ProductDetail from './components/products/ProductDetail';
import UserList from './components/users/UserList';
import UserEdit from './components/users/UserEdit';

const isAuthenticated = () => !!localStorage.getItem('accessToken');

const getUserRole = () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch {
    return null;
  }
};

const ProtectedRoute = ({ children, allowedRoles = null }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  if (allowedRoles && !allowedRoles.includes(getUserRole())) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
            <Route path="/products/new" element={<ProtectedRoute allowedRoles={['seller', 'admin']}><ProductForm /></ProtectedRoute>} />
            <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
            <Route path="/products/:id/edit" element={<ProtectedRoute allowedRoles={['seller', 'admin']}><ProductForm isEdit={true} /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute allowedRoles={['admin']}><UserList /></ProtectedRoute>} />
            <Route path="/users/:id/edit" element={<ProtectedRoute allowedRoles={['admin']}><UserEdit /></ProtectedRoute>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;