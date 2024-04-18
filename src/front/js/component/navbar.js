import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from '../store/appContext';

export const Navbar = () => {
	const { store, actions } = useContext(Context);
  	const isLoggedIn = !!store.token;
  	const handleLogout = () => {
		actions.logout();
		navigate('/login');
	};

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          {isLoggedIn ? (
            <button className="btn btn-warning" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-danger">Login</button>
            </Link>
          )}
          <Link to="/signup">
            <button className="btn btn-dark">Signup</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
