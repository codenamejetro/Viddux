import './MyPlaylists.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllPlaylistsThunk, getUserPlaylistsThunk } from '../../store/playlists'
import PlaylistBar from './PlaylistBar'
import OpenModalButton from '../OpenModalButton'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import CreatePlaylist from '../CreatePlaylist'
// import CreatePlaylist from '../CreatePlaylist'


const MyPlaylists = () => {
    const dispatch = useDispatch()
    const currUser = useSelector(state => state.session.user)
    const allPlaylists = useSelector(state => state.playlists.allPlaylists)
    // console.log(allPlaylists)
    const allPlaylistsArr = Object.values(allPlaylists)

    const allMyPlaylists = Object.values(allPlaylistsArr)

    useEffect(() => {
        dispatch(getUserPlaylistsThunk())
    }, [dispatch])

    return (

        <div className='my-videos-container'>
            <div className='my-videos-nav'>
                <div className='my-videos-nav-channel'>
                    <div className='my-videos-nav-image'>
                        <img src={currUser.profile_pic} />
                    </div>
                    <div className='my-videos-nav-title'>Your channel</div>
                    <div className='my-videos-nav-name'>{currUser.first_name}  {currUser.last_name}</div>
                </div>
                <div className='my-videos-nav-buttons'>
                    Content
                </div>
            </div>
            <div className='my-videos-content'>
                <div className='my-videos-content-top'>
                    <h2>
                        {/* <p> */}
                        Channel content
                        {/* </p> */}
                    </h2>
                    <div className='my-videos-content-below-title'>
                        <div className='my-content-toggle' >
                            <NavLink className='my-content-all my-content-untoggled' to='/profile/videos'>Videos</NavLink>
                            <div className='my-content-all my-content-toggled' >Playlists</div>
                        </div>
                        {/* <div className='my-videos-content-upload'>
                            <div>
                                <OpenModalButton
                                    buttonText=""
                                    modalComponent={<CreatePlaylist />} />
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className='my-videos-content-bottom'>
                    {allMyPlaylists.map((playlist) => {
                        return <PlaylistBar playlist={playlist} />
                    })}
                </div>
            </div>
        </div>

    )
}


export default MyPlaylists
