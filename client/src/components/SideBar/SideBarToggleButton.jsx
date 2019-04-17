import React from 'react'
import './SideBarToggleButton.css'

const sideBarToggleButton = props => (
  <button className='toggle-button' onClick={props.click} >
    <span className='toggle-line' ></span>
    <span className='toggle-line' ></span>
    <span className='toggle-line' ></span>
  </button>
)

export default sideBarToggleButton