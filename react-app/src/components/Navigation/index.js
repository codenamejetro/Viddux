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
				<div className='navbar-home-button'>
					<div className='navbar-modal-menu'>
						<i class="fa-solid fa-bars fa-lg"></i>
					</div>
					<NavLink
						className='navbar-site-name'
						exact to="/">
						<i class="navbar-play fa-solid fa-play"></i>
						Viddux
						<i class="navbar-pause fa-solid fa-pause"></i>
					</NavLink>
				</div>

				<div>
					<input></input>
				</div>
				{isLoaded && (
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</div>
		</>
	);
}

export default Navigation;
