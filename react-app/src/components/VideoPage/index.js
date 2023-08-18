import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import './VideoPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getVideoThunk } from '../../store/videos'
import OpenModalButton from '../OpenModalButton'
import AddVideoToPlaylist from '../AddVideoToPlaylist'

const VideoPage = () => {
    const { videoId } = useParams()
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    console.log(user)
    const vid = useSelector(state => state.videos.singleVideo)
    const vidCreator = useSelector(state => state.videos.singleVideo.creator)

    useEffect(() => {
        dispatch(getVideoThunk(videoId))
    }, [dispatch, videoId])


    if (!vidCreator) return null
    return (
        <>
            <div className='video-page-outerwrapper'>

                <div className='video-page-innerwrapper'>
                    <div className='video-page-video'>
                        {/* <video controls>
                            <source src={vid.mp4}></source>
                        </video> */}
                        <iframe height="450rem" width="900rem" src={vid.mp4}></iframe>
                    </div>
                    <div className='video-page-details'>
                        <div className='video-page-title'>
                            {`${vid.title}`}
                        </div>
                        <div className='video-page-details-lower'>
                            <div className='video-page-details-left'>
                                <div className='video-page-profilepic' >
                                    {`${vidCreator.profile_pic}`}
                                </div>
                                <div className='video-page-username-sub'>
                                    <div className='video-page-username'>
                                        {`${vidCreator.username}`}
                                    </div>
                                    <div className='video-page-sub'>
                                        Adding subscriber count soon
                                    </div>

                                </div>
                            </div>
                            <div className='video-page-details-right'>

                                <div className='video-page-addtoplaylist'>
                                    {user ? <OpenModalButton
                                        buttonText="Add to playlist"
                                        modalComponent={<AddVideoToPlaylist videoId={vid.id} />}
                                        />
                                        : <div></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='video-page-description'>
                        {`${vid.description}`}
                    </div>
                    <div className='video-page-comments'>

                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoPage
