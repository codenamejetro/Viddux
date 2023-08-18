import { useDispatch } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import UpdatePlaylist from '../UpdatePlaylist'
import './PlaylistBar.css'
import { deletePlaylistThunk } from '../../store/playlists'
import { formatDate } from '../../HelperFuncs/formatDate'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

const PlaylistBar = ({ playlist }) => {
    const dispatch = useDispatch()

    console.log('fg ewf4ljf4f 4lf mkl4f', playlist)
    const handleDelete = (e) => {
        // e.preventDefault()
        dispatch(deletePlaylistThunk(playlist.id))
    }
    return (
        <div className='playlist-bar-outercontainer'>
            {/* <div className='playlist-bar-container playlist-bar-keys-container'>
                <div className='playlist-bar-keys-left'>
                    Playlists
                </div>
                <div className='playlist-bar-keys-right'>
                    <div>Visibility</div>
                    <div>Last updated</div>
                    <div>Video Count</div>
                    <div></div>
                </div>
            </div> */}
            <div className="playlist-bar-container">

                <NavLink to={`/playlists/${playlist.id}`} className='nav-link playlist-bar-left'>
                    <div className="playlist-bar-playlist">
                        {/* <playlist src={playlist.mp4} > </playlist> */}
                    </div>
                    <div className='playlist-bar-title-description'>
                        <div className="playlist-bar-title">
                            {playlist.name}
                        </div>
                        <div className='playlist-bar-description'>
                            {playlist.description}
                        </div>
                    </div>
                </NavLink>

                <div className='playlist-bar-right'>


                    <div className='playlist-bar-visibility-date-count'>
                        {playlist.public === true ? <div className='playlist-bar-allkeys playlist-bar-visibility'>Public</div> : <div className='playlist-bar-visibility'>Private</div>}
                        <div className="playlist-bar-allkeys playlist-bar-date">
                            {formatDate(playlist.updated_at)}
                        </div>
                        <div className='playlist-bar-allkeys playlist-bar-count'>
                            {playlist.videos.length}
                        </div>

                    </div>
                    <div className='playlist-bar-functions'>
                        <div className='playlist-bar-edit'>
                            <OpenModalButton
                                buttonText="Edit"
                                modalComponent={<UpdatePlaylist playlistId={playlist.id} />} />
                        </div>
                        <form className='playlist-bar-delete-form'>
                            <button className='playlist-bar-delete' onClick={handleDelete} type='submit'>
                                Delete
                            </button>

                        </form>

                    </div>

                </div>
            </div>


        </div>
    )
}

export default PlaylistBar
