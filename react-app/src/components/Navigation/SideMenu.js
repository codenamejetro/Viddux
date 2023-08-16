import { useDispatch, useSelector } from 'react-redux';
import './Navigation.css'
import { useEffect, useRef, useState } from 'react';
import { getAllPlaylistsThunk, getUserPlaylistsThunk } from '../../store/playlists';
import PlaylistTab from './PlaylistTab';


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
            <div className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <div className='side-menu-dropdown-wrapper'>

                            <div className='side-menu-tab-divider'>
                                <div className='side-menu-tabs'>
                                    Home
                                </div>
                                <div className='side-menu-tabs'>
                                    Subscriptions
                                </div>
                            </div>



                            <div className='side-menu-tab-divider'>
                                <div className='side-menu-tabs'>
                                    Your videos
                                </div>
                                <div className='side-menu-tabs'>
                                    Liked videos
                                </div>
                                {myPlaylistsArr.map((playlist) => {
                                    return <PlaylistTab playlist={playlist} />
                                })}
                            </div>


                        </div>
                    </>
                ) : (
                    <>
                    </>
                )}

            </div>
        </>
    )
}

export default SideMenu
