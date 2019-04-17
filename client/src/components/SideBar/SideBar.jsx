import React from "react";
import "./SideBar.css";
import nav from './_nav'
import { Link } from 'react-router-dom'

const sideBar = props => {
  return <nav className={props.show ? "sidebar open" : "sidebar" } >
    <ul>
    {nav.map((navlink, index) => <li key={index + navlink} > <Link to={navlink.route}> {navlink.name} </Link> </li>)}
    </ul>
  </nav>;
};

export default sideBar;
