import { useDispatch, useSelector } from 'react-redux'
import './MyVideos.css'
import { useEffect } from 'react'
import { getAllVideosThunk } from '../../store/videos'
import VideoBar from './VideoBar'

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
    console.log("All my videos", allMyVids)

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
                        Channel content
                    </h2>
                    <div className='my-videos-content-toggle' >
                        <div>Videos</div>
                        <div>Playlists</div>
                    </div>
                </div>

                <div className='my-videos-content-bottom'>
                    {allMyVids.map((vid) => {
                        return <VideoBar vid={vid}/>
                    })}
                </div>
            </div>
        </div>

    )
}

export default MyVideos
