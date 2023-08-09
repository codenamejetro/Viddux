import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import './VideoPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getVideoThunk } from '../../store/videos'

const VideoPage = () => {
    const { videoId } = useParams()
    const dispatch = useDispatch()
    const vid = useSelector(state => state.videos.singleVideo)
    const vidCreator = useSelector(state => state.videos.singleVideo.creator)
    console.log('The video', vidCreator)

    useEffect(() => {
        dispatch(getVideoThunk(videoId))
    }, [dispatch, videoId])


    if (!vidCreator) return null
    return (
        <>
            <div className='video-page-outerwrapper'>

                <div className='video-page-wrapper'>
                    <div className='video-page-video'>
                        <video src={vid.mp4}></video>
                    </div>
                    <div>
                        <div>
                            {`${vid.title}`}
                        </div>
                        <div>
                            {`${vidCreator.profile_pic}`}
                            <div>
                            {`${vidCreator.username}`}

                            </div>
                        </div>
                    </div>
                    <div className='video-page-videodetails'>
                        {`${vid.description}`}
                    </div>
                    <div className='video-page-videocomments'>

                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoPage
