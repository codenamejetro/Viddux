import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="profile-dropdown-inner">
              <NavLink className="nav-link profile-dropdown-inner-li" to='/profile'>
                <i className="fa-solid fa-image-portrait"></i>
                <div>&nbsp;Your channel</div>
              </NavLink>
              <li className="profile-dropdown-inner-li">
                <i className="fa-solid fa-paint-roller"></i>
                <div>Appearance</div>
              </li>
              <li className="profile-dropdown-inner-li" onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <div>Sign Out</div>
              </li>
            </div>
          </>
        ) : (
          <>
            <div className="profile-dropdown-inner">
              <NavLink className='nav-link profile-dropdown-inner-li' to='/login'>
                <i className="fa-solid fa-right-to-bracket"></i>
                <div>Log in</div>
              </NavLink>
              <NavLink className='nav-link profile-dropdown-inner-li' to='/signup'>
                <i className="fa-solid fa-user"></i>
                <div>Sign up</div>
              </NavLink>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
