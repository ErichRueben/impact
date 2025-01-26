import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import '../styles/Navbar.css';

const Navbar = () => {
  const [ isExpanded, setIsExpanded ] = useState( false );

  const toggleNavBar = () => {
    setIsExpanded( !isExpanded )
  }

  return (
    <nav className={ `navbar ${ isExpanded ? 'expanded' : 'collapsed' }` }>
      <ul className="navbar-links">
        <li>
          <div className='toggle' onClick={ toggleNavBar }>
            <MenuOutlinedIcon></MenuOutlinedIcon>
          </div>
        </li>
        <li>
          <Link to="/">
            <HomeIcon></HomeIcon>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/tasks">
            <ListAltOutlinedIcon></ListAltOutlinedIcon>
            <span>Task Manager</span>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <InfoOutlinedIcon></InfoOutlinedIcon>
            <span>About</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;