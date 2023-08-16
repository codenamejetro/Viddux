import { useDispatch } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import UpdatePlaylist from '../UpdatePlaylist'
import './PlaylistBar.css'
import { deletePlaylistThunk } from '../../store/playlists'

const PlaylistBar = ({ playlist }) => {
    const dispatch = useDispatch()

    console.log('fg ewf4ljf4f 4lf mkl4f', playlist)
    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deletePlaylistThunk(playlist.id))
    }
    return (
        <div className='playlist-bar-outercontainer'>
            <div className='playlist-bar-container playlist-bar-keys-container'>
                <div className='playlist-bar-keys-left'>
                    Playlists
                </div>
                <div className='playlist-bar-keys-right'>
                    <div>Visibility</div>
                    <div>Last updated</div>
                    <div>Video Count</div>
                    {/* <div></div> */}
                </div>
            </div>
            <div className="playlist-bar-container">
                <div className="playlist-bar-vid">
                    {/* <playlist src={playlist.mp4} > </playlist> */}
                </div>
                <div className="playlist-bar-title">
                    {playlist.name}
                </div>
                <div className="playlist-bar-date">
                    {playlist.updated_at}
                </div>
                <div className='playlist-bar-functions'>
                    <div>
                        <OpenModalButton
                            buttonText="Edit"
                            modalComponent={<UpdatePlaylist playlistId={playlist.id} />} />
                    </div>
                    <form>

                        <button className='playlist-bar-delete' onClick={handleDelete} type='submit'>
                            Delete
                        </button>

                    </form>

                </div>

            </div>
        </div>
    )
}

export default PlaylistBar
