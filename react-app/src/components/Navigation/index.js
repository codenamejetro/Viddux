import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<>
			<div className='navbar'>
				<div className='navbar-left'>
					<div className='navbar-modal-menu'>
						<i className="fa-solid fa-bars fa-lg"></i>
					</div>
					<NavLink
						className='navbar-site-name'
						exact to="/">
						<i className="navbar-play fa-solid fa-play"></i>
						Viddux
						<i className="navbar-pause fa-solid fa-pause"></i>
					</NavLink>
				</div>

				<div className='navbar-middle'>
					<form className='navbar-middle-form'>
						<input className='navbar-search-bar-input'></input>
					</form>
					<button className='navbar-search-bar-button'>
						<i className="fa-solid fa-magnifying-glass"></i>
					</button>
				</div>

				{isLoaded && (
					<div className='navbar-right'>
						<div className='navbar-right-inner'>
							<NavLink to='/studio'>
								<i className="navbar-upload fa-solid fa-video"></i>
							</NavLink>
							<ProfileButton user={sessionUser} />
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Navigation;
