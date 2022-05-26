import React from 'react';
import "./Navbar.css"
import {  Link } from "react-router-dom";
const Navbar= () =>{
  return (
      <div>
		<header class="header">
		<div class="left">
			<a href="#">Movie System</a>
		</div>
  <div class="mid">
		<ul class="navbar">
			 <li>
      <Link to="/">Show Movies</Link>
    </li>
    <li>
      <Link to="/AddMovie">Add Movie</Link>
    </li>
    <li>
      <Link to="/UpdateMovie">Update Movie</Link>
    </li>
    <li>
      <Link to="/DeleteMovie">Delete Movies</Link>
    </li>
		</ul>
   
  </div>
	<div class="right">
          <a href="#">Welcome</a>
        </div>

    </header>
    
    <div className="mybg"><br /><br /><br /><br /> <h1>Movie Management System</h1>&nbsp;</div>
    
    </div>
    
  );
}
export default Navbar;