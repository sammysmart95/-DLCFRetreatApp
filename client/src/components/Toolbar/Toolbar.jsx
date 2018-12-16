import React from 'react'
import './Toolbar.css'
import SideBarToggleButton from  '../SideBar/SideBarToggleButton'
import nav from '../SideBar/_nav'
import { Link } from 'react-router-dom'

const toolbar = props => (
  <header className='toolbar' >
    <nav className='toolbar-nav' >
      <div className='toolbar-toggle-button' > <SideBarToggleButton click={props.drawerClickHandler} /> </div>
      <div className='toolbar-logo' >
        <a href="/">Hope 2018</a>
      </div>
      <div className="spacer"></div>
      <div className='toolbar-menu-items' >
        <ul>
          {nav.map((navlink, index) => <li key={index + navlink}> <Link to={navlink.route}> {navlink.name} </Link> </li>)}
        </ul>
      </div>
    </nav>
  </header>
)

export default toolbar