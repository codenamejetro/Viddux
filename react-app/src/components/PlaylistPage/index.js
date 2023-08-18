import { useDispatch, useSelector } from 'react-redux'
import './PlaylistPage.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect } from 'react'
import { getPlaylistThunk } from '../../store/playlists'
import VidInPlaylist from './VidInPlaylist.js'

const PlaylistPage = () => {
    const dispatch = useDispatch()
    const { playlistId } = useParams()

    const playlist = useSelector(state => state.playlists.singlePlaylist)

    useEffect(() => {
        dispatch(getPlaylistThunk(playlistId))
    }, [dispatch])

    if (!playlist.user ) return null
    return (
        <>
            <div className='playlist-page-wrapper'>
                <div className='playlist-page-content'>


                    <div className='playlist-page-left'>
                        <div className='playlist-page-left-wrapper'>
                            <div className='playlist-page-previewimg'></div>
                            <div>{playlist.name}</div>
                            <div>{playlist.user.username}</div>
                            <div>{playlist.visibility}</div>
                            <div>{playlist.videos.length} videos</div>
                            <div>{playlist.description}</div>
                        </div>
                    </div>


                    <div className='playlist-page-right'>
                        {playlist.videos.map(vid => {
                            return <VidInPlaylist vid={vid}/>
                        })}

                    </div>

                </div>
            </div>
        </>
    )
}

export default PlaylistPage
