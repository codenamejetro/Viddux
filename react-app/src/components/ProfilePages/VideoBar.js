import './VideoBar.css'

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
            </div>
        </div>
    )
}

export default VideoBar
