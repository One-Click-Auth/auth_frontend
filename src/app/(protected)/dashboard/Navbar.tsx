"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth()
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}>
      <div className="nav-wrap">
        <ul>
          <div>{user.email}</div>
          {/* navbar element 1  */}
          <li>
            <Link className="linknav" href="/dashboard/page4">
              {/* <Link href="/" className='nav-element'> */}
              <span className="navitem-imgwrap">
                <Image
                  width={24}
                  height={24}
                  src={"/images/gettingstartedicon.svg"}
                  alt="getting_started"
                />
              </span>
              <span className="navitem-text">Getting Started</span>
              {/* </Link> */}
            </Link>
          </li>

          {/* navbar element 2nd */}
          <li>
            <button className="drodown-btn" onClick={toggleDropdown}>
              <Link href="/" className="nav-element">
                <span className="navitem-imgwrap">
                  <Image
                    width={24}
                    height={24}
                    src={"/images/applicationicon.svg"}
                    alt="getting_started"
                  />
                </span>
                <span className="navitem-text">Application Steps</span>
                <span className="navitem-imgwrap forward ms-5">
                  <Image
                    width={24}
                    height={24}
                    src="/images/forwardicon.svg"
                    alt="getting_started"
                  />
                </span>
              </Link>
            </button>
            {/* dropdown */}
            <ul className={`dropdown-menuu ${isDropdownOpen ? "show1" : ""}`}>
              <li>
                {/* <Link className='linknav' href="/dashboard/page2"> */}
                <Link className="nav-element" href="#">
                  <span className="navitem-text collapsabletext">Step 1</span>
                  {/* </Link> */}
                </Link>
              </li>
              <li>
                <Link className="linknav" href="/dashboard/page3">
                  {/* <Link className='nav-element' href='#'> */}

                  <span className="navitem-text collapsabletext">Step 2</span>
                  {/* </Link> */}
                </Link>
              </li>
            </ul>
            {/* dropdown */}
          </li>

          {/* navbar element 3  */}
          <li>
            <Link className="linknav" href="">
              {/* <Link className='nav-element' href='#'> */}
              <span className="navitem-imgwrap">
                <Image
                  width={24}
                  height={24}
                  src="/images/authenticationicon.svg"
                  alt="getting_started"
                />
              </span>
              <span className="navitem-text">Authentication</span>
              {/* </Link> */}
            </Link>
          </li>
          {/* navbar element next element  */}

          {/* navbar element 1  */}
          <li>
            <Link className="linknav" href="/dashboard/page5">
              {/* <Link href="/" className='nav-element'> */}
              <span className="navitem-imgwrap">
                <Image
                  width={24}
                  height={24}
                  src="/images/security.svg"
                  alt="getting_started"
                />
              </span>
              <span className="navitem-text">Passwordless</span>
              {/* </Link> */}
            </Link>
          </li>
          {/* navbar element 1  */}
          <li>
            <Link className="linknav" href="/dashboard/page6">
              {/* <Link href="/" className='nav-element'> */}
              <span className="navitem-imgwrap">
                <Image
                  width={24}
                  height={24}
                  src="/images/authenticationicon.svg"
                  alt="getting_started"
                />
              </span>
              <span className="navitem-text">Organizations</span>
              {/* </Link> */}
            </Link>
          </li>
          {/* navbar element 7  */}
          <li>
            <Link className="linknav" href="/dashboard/page7">
              {/* <Link href="/" className='nav-element'> */}
              <span className="navitem-imgwrap">
                <Image
                  width={24}
                  height={24}
                  src={"/images/gettingstartedicon.svg"}
                  alt="getting_started"
                />
              </span>
              <span className="navitem-text">Email Provider</span>
            </Link>
            {/* </Link> */}
          </li>
        </ul>
      </div>

      <div className="bottombtn p-2">
        <button className="downbtn" onClick={toggleSidebar}>
          <div className="d-flex">
            <span className={`forwardarr ${isSidebarOpen ? "hide" : ""}`}>
              <Image
                width={24}
                height={24}
                alt="forward"
                src="/images/forwardarrow.svg"
              />{" "}
            </span>
            <span className={`backward ${isSidebarOpen ? "" : "hide"}`}>
              <Image
                width={24}
                height={24}
                alt="backward"
                src="/images/backwardarrow.svg"
              />{" "}
            </span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
