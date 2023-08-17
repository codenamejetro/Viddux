import { useDispatch, useSelector } from 'react-redux';
import './AddVideoToPlaylist.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';
import { useModal } from '../../context/Modal';
import { addVideoToPlaylistThunk, getAllPlaylistsThunk } from '../../store/playlists';
import OpenModalButton from '../OpenModalButton';
import CreatePlaylist from '../CreatePlaylist';

const AddVideoToPlaylist = ({videoId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const playlists = useSelector(state => state.playlists.allPlaylists);
    const playlist = useSelector(state => state.playlists.singlePlaylist);
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const playlistId = playlist.id
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getAllPlaylistsThunk());
    }, [dispatch]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const createdPlaylist = dispatch(addVideoToPlaylistThunk(selectedPlaylist, videoId));
        closeModal();
        if (createdPlaylist) {
            history.push("/profile/playlists");
        }
    };

    return (
            <div className="modal" onClick={closeModal}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div>
                        <OpenModalButton
                            buttonText='Create Playlist'
                            modalComponent= {< CreatePlaylist />}
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Select Playlist:
                            <select className="playlist-select" value={selectedPlaylist} onChange={e => setSelectedPlaylist(e.target.value)}>
                                {Object.values(playlists).map(playlist => (
                                    <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                                ))}
                            </select>
                        </label>
                        <button className="add-video-button" type="submit">Add Video</button>
                    </form>
                </div>
            </div>
    );
}

export default AddVideoToPlaylist
