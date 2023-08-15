import './VideoBar.css'
import OpenModalButton from '../OpenModalButton'
import UpdateVideo from '../UpdateVideo'
import DeleteVideo from '../DeleteVideo'
import { useDispatch } from 'react-redux'
import { deleteVideoThunk } from '../../store/videos'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const VideoBar = ({ vid }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = () => {
        dispatch(deleteVideoThunk(vid.id))
        // history.push('/profile/videos')
        // window.location.reload()
    }
    return (
        <div className='video-bar-outercontainer'>
            <div className="video-bar-container">
                <div className="video-bar-vid">
                    <video src={vid.mp4} > </video>
                </div>
                <div className="video-bar-title">
                    {vid.title}
                </div>
                <div className="video-bar-date">
                    {vid.created_at}
                </div>
                <div className='video-bar-functions'>
                    <div>
                        <OpenModalButton
                            buttonText="Edit"
                            modalComponent={<UpdateVideo videoId={vid.id}/>} />
                    </div>
                    <form>

                        <button className='video-bar-delete' onClick={handleDelete} type='submit'>
                            Delete
                        </button>

                    </form>

                </div>

            </div>
        </div>
    )
}

export default VideoBar
