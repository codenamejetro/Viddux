import './VidInPlaylist.css'
import { formatDate } from '../../HelperFuncs/formatDate'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserThunk } from '../../store/users'
import { getVideoThunk } from '../../store/videos'
import OpenModalButton from '../OpenModalButton'
import { removeVideoFromPlaylistThunk } from '../../store/playlists'
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min'


const VidInPlaylist = ({ vid, playlistId }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    // const owner = useSelector(state => state.session.user.username)
    // console.log(vid.user)
    useEffect(() => {
        // console.log('userid', vid.user_id)
        // dispatch(getUserThunk(vid.user_id))
        // dispatch(getVideoThunk(vid.id))
    }, [dispatch])

    const clickHandler = () => {
        dispatch(removeVideoFromPlaylistThunk(playlistId, vid.id))
        history.push(`/playlists/${playlistId}`)
    }

    return (
        <>
            <div className='vidinplaylist-outercontainer'>
                <div className='vidinplaylist-innercontainer'>
                    <NavLink className='vidinplaylist-left' to={`/videos/${vid.id}`}>
                        <div className='vidinplaylist-previewimg'>
                        </div>
                        <div className='vidinplaylist-details'>
                            <div className='vidinplaylist-title'>{vid.title}</div>
                            <div className='vidinplaylist-bottom'>
                                <div className='vidinplaylist-creator'>{vid.user.user_username}&nbsp; •</div>
                                <div className='vidinplaylist-date'>&nbsp;&nbsp;{formatDate(vid.created_at)}</div>
                            </div>
                        </div>
                    </NavLink>


                    <div className='vidinplaylist-right'>
                        <button onClick={clickHandler} > Remove</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VidInPlaylist
