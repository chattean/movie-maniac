import React from 'react';
import { capitalizeFirstLetter } from '../../utils/helpers';
import Auth from "../../utils/auth";
import { Link } from 'react-router-dom';




function Nav(props) {
  const {
    categories = [],
    setCurrentCategory,
    contactSelected,
    currentCategory,
    setContactSelected,
  } = props;

  function showLogin() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/watchList">
              Watch List
          </Link>
          </li>
          <li className="mx-1">
            <a href="/" onClick={() => Auth.logout()}>
              Logout
          </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="header" >
      <h2 className="flex-row">
        <a data-testid="link" href="/">
          <span role="img" aria-label="camera"> </span> Let's watch a movie!
        </a>
      </h2 >
      <nav>
        <ul className="flex-row">
          <li className="mx-2">
            <a data-testid="home" href="#home" onClick={() => setContactSelected(false)}>
              Home
            </a>
          </li>
          {categories.map((category) => (
            <li
              className={`mx-1 ${currentCategory.name === category.name && !contactSelected && 'navActive'
                }`}
              key={category.name}
            >
              <span
                onClick={() => {
                  setCurrentCategory(category);
                  setContactSelected(false);
                }}
              >
                {capitalizeFirstLetter(category.name)}
              </span>
            </li>
          ))}
          {showLogin()}
        </ul>
      </nav>
    </header >
  );
}

export default Nav;
