import './MyPlaylists.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllPlaylistsThunk, getUserPlaylistsThunk } from '../../store/playlists'
import PlaylistBar from './PlaylistBar'
import OpenModalButton from '../OpenModalButton'
// import CreatePlaylist from '../CreatePlaylist'


const MyPlaylists = () => {
    const dispatch = useDispatch()
    const currUser = useSelector(state => state.session.user)
    const allPlaylists = useSelector(state => state.playlists.allPlaylists)
    // console.log(allPlaylists)
    const allPlaylistsArr = Object.values(allPlaylists)

    const allMyPlaylists = allPlaylistsArr.filter(playlist => {
        return playlist.user_id === currUser.id
    })

    useEffect(() => {
        dispatch(getUserPlaylistsThunk())
    }, [dispatch])

    return ('')
}


export default MyPlaylists
