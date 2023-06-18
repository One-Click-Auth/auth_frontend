import React,{useState} from 'react';
import getstarted from "./images/gettingstartedicon.svg";
import application from "./images/applicationicon.svg";
import forwardicon from "./images/forwardicon.svg";
import authenticate from "./images/authenticationicon.svg";
import forward from "./images/forwardarrow.svg";
import backward from "./images/backwardarrow.svg";
import { Link, Navigate } from 'react-router-dom';
import security from "./images/security.svg";



const Navbar = () => {

  
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  

    

  return (
    <nav className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}>
    <div className='nav-wrap'>
      <ul>

        {/* navbar element 1  */}
        <li>
          <Link className='linknav' to="/dashboard/page4">
          <a className='nav-element'>
            <span className='navitem-imgwrap'>
              <img src={getstarted} alt='getting_started'/>
            </span>
            <span className='navitem-text'>
            Getting Started
            </span>
          </a></Link>
        </li>
        


        {/* navbar element 2nd */}
        <li>
          <button className="drodown-btn" onClick={toggleDropdown}>
          <a className='nav-element'   >
            <span className='navitem-imgwrap'>
              <img src={application} alt='getting_started'/>
            </span>
            <span className='navitem-text'>
            Application Steps
            </span>
            <span className='navitem-imgwrap forward ms-5'>
              <img src={forwardicon} alt='getting_started'/>
            </span>
            
          </a></button>
          {/* dropdown */}
          <ul className={`dropdown-menuu ${isDropdownOpen ? "show1" : ""}`}>
              <li><Link className='linknav' to="/dashboard/page2">
              <a className='nav-element' href='#'>
           
            <span className='navitem-text collapsabletext'>
           Step 1
            </span>
          </a></Link>
              </li>
              <li> <Link className='linknav' to="/dashboard/page3">
              <a className='nav-element' href='#'>
            
            <span className='navitem-text collapsabletext'>
            Step 2
            </span>
          </a></Link>
              </li>
              
            </ul>
            {/* dropdown */}
        </li>
        






          {/* navbar element 3  */}
        <li><Link className='linknav' to="">
          <a className='nav-element' href='#'>
            <span className='navitem-imgwrap'>
              <img src={authenticate} alt='getting_started'/>
            </span>
            <span className='navitem-text'>
            Authentication
            </span>
          </a></Link>
        </li>
        {/* navbar element next element  */}

        
        
        {/* navbar element 1  */}
        <li>
          <Link className='linknav' to="/dashboard/page5">
          <a className='nav-element'>
            <span className='navitem-imgwrap'>
              <img src={security} alt='getting_started'/>
            </span>
            <span className='navitem-text'>
            Passwordless
            </span>
          </a></Link>
        </li>
        {/* navbar element 1  */}
        <li>
          <Link className='linknav' to="/dashboard/page6">
          <a className='nav-element'>
            <span className='navitem-imgwrap'>
              <img src={authenticate} alt='getting_started'/>
            </span>
            <span className='navitem-text'>
            Organizations
            </span>
          </a></Link>
        </li>
        {/* navbar element 7  */}
        <li>
          <Link className='linknav' to="/dashboard/page7">
          <a className='nav-element'>
            <span className='navitem-imgwrap'>
              <img src={getstarted} alt='getting_started'/>
            </span>
            <span className='navitem-text'>
            Email Provider
            </span>
          </a></Link>
        </li>




      </ul>

    </div>


    <div className='bottombtn p-2'>
      <button className="downbtn" onClick={toggleSidebar}>
        <div className='d-flex'>
        <span className={`forwardarr ${isSidebarOpen ? "hide" : ""}`}><img src={forward}/> </span>
        <span className={`backward ${isSidebarOpen ? "" : "hide"}`}><img src={backward} />  </span>
        </div>

       
      </button>
    </div>
      
    
  </nav>

  )
}

export default Navbar