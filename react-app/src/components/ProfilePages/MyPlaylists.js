import './MyPlaylists.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllVideosThunk } from '../../store/videos'
import VideoBar from './VideoBar'
import OpenModalButton from '../OpenModalButton'
import UploadVideo from '../UploadVideo'


const MyPlaylists = () => {
    const dispatch = useDispatch()
    const currUser = useSelector(state => state.session.user)
    const allPlaylists = useSelector(state => state.playlists.allPlaylists)
    const allPlaylistsArr = Object.values(allPlaylists)

    const allMyPlaylists = allPlaylistsArr.filter(playlist => {
        return playlist.user_id === currUser.id
    })
    return ('')
}


export default MyPlaylists
