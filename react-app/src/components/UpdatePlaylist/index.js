import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal';
import './UpdatePlaylist.css'
import { getPlaylistThunk, updatePlaylistThunk } from '../../store/playlists';
import { useEffect, useState } from 'react';

const UpdatePlaylist = ({ playlistId }) => {
    const singlePlaylist = useSelector((state) => state.playlists.allPlaylists[playlistId]);
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const playlist = useSelector(state => state.playlists.singlePlaylist)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    // const [isPublic, setIsPublic] = useState(false)
    const [preview_img, setPreviewImg] = useState('')
    const [err, setErr] = useState({})
    // const [,forceRender] = useState('')

    useEffect(() => {
        if (playlist) {
            setName(singlePlaylist.name)
            setDescription(singlePlaylist.description)
            // setIsPublic(singlePlaylist.public)
            // setPreviewImg(singlePlaylist.preview_img)
        }
    },[])


    useEffect(() => {
        const errors = {}
        if (!name) errors.name = "Name is required"
        if (!description) errors.description = "Description is required"
        setErr(errors)
    }, [name, description])

    // useEffect(() => {
    //     dispatch(getPlaylistThunk(playlistId))
    // }, [dispatch, playlistId])

    // useEffect(() => {
    //     const fetchPlaylistDetails = async () => {
    //         const singlePlaylist = await dispatch(getPlaylistThunk(playlistId));
    //         if (singlePlaylist && singlePlaylist !== undefined) {
    //             setName(singlePlaylist.name)
    //             setIsPublic(singlePlaylist.public)
    //             setDescription(singlePlaylist.description)
    //         }
    //     }
    //     fetchPlaylistDetails();
    // }, [dispatch, playlistId]);


    const handleSubmit = async (e) => {
        // e.preventDefault();
        const updatedFormData = new FormData();
        // console.log('form data', updatedFormData);
        updatedFormData.append('name', name)
        // updatedFormData.append('is_public', isPublic)
        updatedFormData.append('description', description)
        dispatch(updatePlaylistThunk(playlistId, updatedFormData));
        // closeModal();
        history.push(`/profile/playlists`);
    }


    if (Object.keys(playlist) === 0) return null

    return (
        <>
            <div className='update-playlist-outercontainer'>

                <form
                    className='update-playlist-form'
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                >
                    <div className='update-playlist-form-wrapped'>
                        <div className='update-playlist-form-info'>
                            <div style={{ paddingBottom: '1rem' }}>
                                <div>
                                    <h5 style={{ display: 'inline-block', fontSize: '12px', color: 'red' }} >*</h5>
                                    <label style={{ paddingBottom: '.5rem' }}>&nbsp;Title</label>
                                </div>
                                <input
                                    className='update-playlist-form-all-input update-playlist-form-title'
                                    type='text'
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            {/* <div>
                                <div>
                                    <h5 style={{ display: 'inline-block', fontSize: '12px', color: 'red' }} >*</h5>
                                    <label style={{ paddingBottom: '.5rem' }}>&nbsp;Public?</label>
                                </div>
                                <input
                                    type="checkbox"
                                    name='isPublic'
                                    checked={isPublic}
                                    onChange={(e) => setIsPublic(!e.target.value)}
                                />
                            </div> */}
                            <div style={{ paddingBottom: '1rem' }}>
                                <div>
                                    <h5 style={{ display: 'inline-block', fontSize: '12px', color: 'red' }} >*</h5>
                                    <label style={{ paddingBottom: '.5rem' }}>&nbsp;Description</label>
                                </div>
                                <textarea
                                    id="story"
                                    name="description"
                                    rows="5"
                                    cols="40"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='update-playlist-form-bottom'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <h5 style={{ fontSize: '12px', color: 'red' }} >*</h5>
                                    <h5>&nbsp;Required fields</h5>
                                </div>
                                <div className='update-playlist-form-bottom-bar-button-div'>
                                    <button type='submit'>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdatePlaylist
