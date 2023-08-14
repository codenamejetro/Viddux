import { useState } from 'react'
import './UploadVideo.css'
import { useDispatch, useSelector } from 'react-redux'
import { createVideoThunk } from '../../store/videos'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const UploadVideo = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [mp4, setMp4] = useState('')
    const [err, setDisplayErr] = useState('')

    const sessionUser = useSelector((state) => state.session.user);
    const current_user = sessionUser.id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('HIHHIHI IN HANDLESUBMIT')
        if (Object.keys(err).length > 0) {
            setDisplayErr(true)
        }
        else {
            const formData = new FormData()
            formData.append('mp4', mp4)
            formData.append('title', title)
            formData.append('description', description)
            formData.append('user_id', current_user)
            // formData.append('genre', genre)
            // formData.append('preview_img', preview_img)

            dispatch(createVideoThunk(formData))
            // history.push('/profile/videos')
        }
    }

    return (
        <>
            <div className='upload-video-container'>
                <div className='upload-video-details-container'>
                    <div className='upload-video-details-title'>Details</div>
                    <form className='upload-video-form'>
                        <div
                            className='upload-video-form-left'
                            action="/api/videos/new"
                            method="POST"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}>
                            <div className='upload-video-form-title'>
                                Title
                                <input
                                    className='upload-video-form-all-input upload-video-form-input-title'
                                    type='text'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    // required
                                    placeholder='Enter a title'
                                >
                                </input>
                            </div>
                            <div className='upload-video-form-description'>
                                Description
                                <input
                                    className='upload-video-form-all-input upload-video-form-input-description'
                                    type='text'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    // required
                                    placeholder='Enter a description'
                                >
                                </input>
                            </div>

                        </div>

                        <div className='upload-video-details-right'>
                            Upload a file
                            <input
                                className='upload-video-form-all-input upload-video-form-input-mp4'
                                type='text'
                                value={mp4}
                                onChange={(e) => setMp4(e.target.value)}
                            // required
                            >
                            </input>
                            {/* <input
                                className='upload-video-form-all-input upload-video-form-input-mp4'
                                type='file'
                                value={mp4}
                                onChange={(e) => setMp4(e.target.value)}
                            // required
                            >
                            </input> */}
                        </div>

                        <div className='upload-video-button'>

                            {/* <button onClick={handleSubmit}>Upload</button> */}
                            <button type='submit'>Upload</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default UploadVideo
