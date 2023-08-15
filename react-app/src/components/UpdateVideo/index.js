import { useDispatch, useSelector } from 'react-redux'
import './UpdateVideo.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect, useState } from 'react'
import { getVideoThunk, updateVideoThunk } from '../../store/videos'

const UpdateVideo = ({ videoId }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const video = useSelector(state => state.videos.singleVideo)
    const [title, setTitle] = useState(video.title)
    const [description, setDescription] = useState(video.description)
    const [err, setErr] = useState({})
    const [displayErr, setDisplayErr] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(err).length > 0) {
            setDisplayErr(true)
            return
        }
        else {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            formData.append('mp4', video.mp4)

            dispatch(updateVideoThunk(videoId, formData))
            // history.push('/profile/videos')
        }
    }


    useEffect(() => {
        const errors = {}
        if (!title) errors.name = "Title is required"
        if (!description) errors.description = "Description is required"
        setErr(errors)
    }, [title, description])

    // useEffect(() => {
    //     dispatch(getVideoThunk(videoId));

    // }, [dispatch, videoId]);

    useEffect(() => {
        const fetchSongDetails = async () => {
            dispatch(getVideoThunk(videoId));
            if (video && video !== undefined) {
                setTitle(video.title)
                setDescription(video.description)
            }
        }
        fetchSongDetails();
    }, [dispatch, video, videoId]);

    return (
        <>
            <div className='update-video-container'>
                <div className='update-video-outer-form'>
                    <form
                        className='update-video-form'
                        // action={`/api/videos/${videoId}`}
                        method="PUT"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                    >
                        <div className='update-video-form-title'>
                            Title
                            <input
                                className='update-video-form-all-input update-video-form-input-title'
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                // required
                                placeholder='Enter a title'
                            >
                            </input>
                        </div>
                        {displayErr === true && err.title && (<div className="errors">· {err.title}</div>)}


                        <div className='update-video-form-description'>
                            Description
                            <input
                                className='update-video-form-all-input update-video-form-input-description'
                                type='text'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                // required
                                placeholder='Enter a description'
                            >
                            </input>
                        </div>
                        {displayErr === true && err.description && (<div className="errors">· {err.description}</div>)}


                        <div className='update-video-button'>

                            <button onClick={handleSubmit} type='submit' >Save</button>
                            {/* <button type='submit'>Upload</button> */}
                        </div>
                    </form>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}

export default UpdateVideo
