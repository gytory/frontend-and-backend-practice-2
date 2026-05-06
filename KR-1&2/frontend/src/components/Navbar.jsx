import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem('accessToken');

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

  const role = getUserRole();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Магазин пряжи</Link>
      <div className="nav-links">
        {isAuth ? (
          <>
            <Link to="/">Товары</Link>
            {(role === 'seller' || role === 'admin') && (
              <Link to="/products/new">Добавить товар</Link>
            )}
            {role === 'admin' && (
              <Link to="/users">Пользователи</Link>
            )}
            <span>
              {role === 'admin' ? 'Администратор' : role === 'seller' ? 'Продавец' : 'Покупатель'}
            </span>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c' }}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login">Вход</Link>
            <Link to="/register">Регистрация</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;