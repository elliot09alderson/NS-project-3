import React from 'react'
import {Link} from "react-router-dom"
import {ImSearch} from "react-icons/im"
import './Header.scss'
import logo from '../images/netflix-logo.png'

const Header = () => {
  return (
   <nav className='header'>
    <img src={logo} alt="logo"/>
    <div>
        <Link to="/tvShows">TV Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/recently-added">Recently Added</Link>
        <Link to="/my-list">My List</Link>
        <Link to="/suggest us">Suggest us</Link>
       
    </div>
    <ImSearch/>
   </nav>
  )
}

export default Header