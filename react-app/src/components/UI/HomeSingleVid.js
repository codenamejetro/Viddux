import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import './HomeSingleVid.css'

const HomeSingleVid = ({ vid }) => {
    console.log(vid.mp4)
    return (
        <NavLink className='home-single-video-wrapper' to={`/videos/${vid.id}`}>
            {/* <video className='home-single-video-video' src={vid.mp4}></video> */}
            <iframe className='home-single-video-video' src={vid.mp4}></iframe>
            <div className='home-single-video-bottom'>
                <img src='ff' />
                {/* <img src={vid.user_profile_pic} /> */}
                <div className='home-single-video-bottom-right'>
                    <div className='home-single-video-title'>{vid.title}</div>
                    <div className='home-single-video-created'>{vid.created_at}</div>
                </div>
            </div>
        </NavLink>
    )
}

export default HomeSingleVid
