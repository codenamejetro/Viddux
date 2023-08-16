import { useDispatch, useSelector } from 'react-redux'
import './MyVideos.css'
import { useEffect } from 'react'
import { getAllVideosThunk } from '../../store/videos'
import VideoBar from './VideoBar'
import OpenModalButton from '../OpenModalButton'
import UploadVideo from '../UploadVideo'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

const MyVideos = () => {
    const dispatch = useDispatch()
    const currUser = useSelector(state => state.session.user)
    // console.log("Current User Obj", currUser)
    const allVids = useSelector(state => state.videos.allVideos)
    const allVidsArr = Object.values(allVids)
    // console.log("All videos", allVidsArr)

    const allMyVids = allVidsArr.filter(vid => {
        return vid.user_id === currUser.id
    })
    // console.log("All my videos", allMyVids)

    useEffect(() => {
        dispatch(getAllVideosThunk())
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
                        <div className='my-videos-content-toggle' >
                            <div className='my-content-all my-content-toggled'>Videos</div>
                            <NavLink className='my-content-all my-content-untoggled' to='/profile/playlists'>Playlists</NavLink>
                        </div>
                        <div className='my-videos-content-upload'>
                            <div>
                                <OpenModalButton
                                    buttonText="Upload"
                                    modalComponent={<UploadVideo />} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='my-videos-content-bottom'>
                    {allMyVids.map((vid) => {
                        return <VideoBar vid={vid} />
                    })}
                </div>
            </div>
        </div>

    )
}

export default MyVideos
