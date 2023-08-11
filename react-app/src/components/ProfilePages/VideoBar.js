import './VideoBar.css'
import OpenModalButton from '../OpenModalButton'
import UpdateVideo from '../UpdateVideo'
import DeleteVideo from '../DeleteVideo'

const VideoBar = ({ vid }) => {
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
                            modalComponent={<UpdateVideo />} />
                    </div>
                    <div>
                        <OpenModalButton
                            buttonText="Delete"
                            modalComponent={<DeleteVideo />} />

                    </div>

                </div>

            </div>
        </div>
    )
}

export default VideoBar
