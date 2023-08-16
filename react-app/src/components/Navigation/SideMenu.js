import { useDispatch, useSelector } from 'react-redux';
import './Navigation.css'
import { useEffect, useRef, useState } from 'react';
import { getAllPlaylistsThunk, getUserPlaylistsThunk } from '../../store/playlists';
import PlaylistBar from '../ProfilePages/PlaylistBar'


const SideMenu = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const myPlaylists = useSelector(state => state.playlists.allPlaylists)

    const myPlaylistsArr = Object.values(myPlaylists)


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

    const ulClassName = "side-menu-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(getUserPlaylistsThunk())
    }, [dispatch])


    return (
        <>
            <button className='side-menu-button' onClick={openMenu}>
                <i className="fa-solid fa-bars fa-lg"></i>
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <div>

                            <div>
                                <div>
                                    Home
                                </div>
                                <div>
                                    Subscriptions
                                </div>
                            </div>

                            <div>
                                <div>
                                    Your videos
                                </div>
                                <div>
                                    Liked videos
                                </div>
                                {myPlaylistsArr.map((playlist) => {
                                    return <PlaylistBar playlist={playlist} />
                                })}
                            </div>


                        </div>
                    </>
                ) : (
                    <>
                    </>
                )}

            </ul>
        </>
    )
}

export default SideMenu
