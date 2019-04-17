import React from 'react'
import './BackDrop.css'

const backDrop = props => (
  <div className="backdrop" onClick={props.backDropClickHandler} ></div>
)

export default backDrop