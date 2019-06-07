import React, {Component} from 'react';

function NavBar(props) {
  const number = props.number
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span href="/" className="text">get connected with friends</span>
      <span href="/" className="usernumber">users online: {number}</span>
    </nav>
  );
}

export default NavBar;
