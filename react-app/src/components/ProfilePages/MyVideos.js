import { useDispatch, useSelector } from 'react-redux'
import './MyVideos.css'
import { useEffect } from 'react'

const MyVideos = () => {
    const dispatch = useDispatch()
    const currUser = useSelector(state => state.session.user)
    console.log("4uewhg4fifewfefef", currUser)

    useEffect(() => {

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
                    fß
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
                    {/* each video */}
                </div>
            </div>
        </div>

    )
}

export default MyVideos
