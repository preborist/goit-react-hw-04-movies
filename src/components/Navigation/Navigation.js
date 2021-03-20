import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
  return (
    <nav>
      <NavLink
        exact
        to="/"
        className="NavLink"
        activeClassName="NavLink--active"
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className="NavLink"
        activeClassName="NavLink--active"
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
