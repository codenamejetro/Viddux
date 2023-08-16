// constants
const GET_ALLPLAYLISTS = "playlists/GET_ALLPLAYLISTS";
const GET_PLAYLIST = 'playlists/GET_PLAYLIST'
// const GET_USERPLAYLISTS = 'playlists/GET_USERPLAYLISTS'
const ADD_SONG_TO_PLAYLIST = "playlists/ADD_SONG_TO_PLAYLIST";
const CREATE_PLAYLIST = 'playlists/CREATE_PLAYLIST'
const DELETE_PLAYLIST = 'playlists/DELETE_PLAYLIST'
const UPDATE_PLAYLIST = 'playlists/UPDATE_PLAYLIST'

// const GET_USER_PLAYLISTS = "playlists/GET_USER_PLAYLISTS";


const getAllPlaylistsAction = (playlists) => ({
    type: GET_ALLPLAYLISTS,
    playlists
});

// const getUserPlaylistAction = (playlists) => ({
//     type: GET_USERPLAYLISTS,
//     playlists
// })

const getPlaylistAction = (playlist) => ({
    type: GET_PLAYLIST,
    playlist
})

// addedd??

const addSongToPlaylistAction = (playlist) => ({
    type: ADD_SONG_TO_PLAYLIST,
    playlist
})

const createPlaylistAction = (playlistId, playlist) => ({
    type: CREATE_PLAYLIST,
    playlistId,
    playlist
})

const deletePlaylistAction = (playlistId) => ({
    type: DELETE_PLAYLIST,
    playlistId
})

const updatePlaylistAction = (playlist) => ({
    type: UPDATE_PLAYLIST,
    playlist
})


export const getAllPlaylistsThunk = () => async (dispatch) => {
    const response = await fetch("/api/playlists")
    // console.log("IN getAllPlaylistsThunk", response)
    if (response.ok) {
        const data = await response.json();
        console.log("data", data)
        if (data.errors) {
            return data.errors;
        }

        dispatch(getAllPlaylistsAction(data));
    }
};

export const getUserPlaylistsThunk = (id) => async (dispatch) => {
    const response = await fetch('/api/playlists/current')
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return
        }
        dispatch(getAllPlaylistsAction(data))
    }
}

export const getPlaylistThunk = (id) => async (dispatch) => {
    // console.log("THE IDDDD ", id)
    const response = await fetch(`/api/playlists/${id}`)
    // console.log("THE RESPONSE ", response)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return
        }
        // console.log("DATAAAA ", data)
        dispatch(getPlaylistAction(data))
    }
}


export const createPlaylistThunk = (playlist) => async (dispatch) => {
    const response = await fetch('/api/playlists/new', { // Change to your appropriate endpoint
        method: 'POST',
        body: playlist,
    });

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
        dispatch(createPlaylistAction(data));
        return data;
    }
}

export const addSongToPlaylistThunk = (playlistId, songId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/songs/${songId}`, {
        method: "POST",
    });

    if (response.ok) {
        const updatedPlaylist = await response.json();
        if (updatedPlaylist.errors) {
            return
        }

        dispatch(addSongToPlaylistAction(updatedPlaylist));
    }
};

export const updatePlaylistThunk = (playlistId, updatedPlaylist) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}`, {
        method: 'PUT',
        body: updatedPlaylist,
    });

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            // console.log("TEST 6")
            return data.errors
        }
        // console.log("TEST 4")
        dispatch(updatePlaylistAction(data))
        return data
    }
}


export const deletePlaylistThunk = (playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}`, {
        method: 'DELETE',
        body: playlistId
    })
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(deletePlaylistAction(data))
    }
}


const initialState = { allPlaylists: {}, singlePlaylist: {}, userPlaylists: {} }

export default function playlistsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALLPLAYLISTS:
            console.log('action in GETALLPLAYLISTS', action)
            newState = { allPlaylists: { ...action.allPlaylists }, singlePlaylist: { ...state.singlePlaylist } }
            action.playlists.playlists.forEach(playlist => newState.allPlaylists[playlist.id] = playlist)
            return newState

        case ADD_SONG_TO_PLAYLIST:
                newState = { ...state }
                newState.singlePlaylist = { ...action.playlist }
                return newState

        case GET_PLAYLIST:
            newState = { ...state, singlePlaylist: { ...action.playlist } }
            return newState

        case CREATE_PLAYLIST:
            newState = { ...state }
            newState.singlePlaylist = { ...action.playlistId }
            newState.allPlaylists[action.playlistId.id] = action.playlistId  // Add the new playlist to allPlaylists
            return newState

        case UPDATE_PLAYLIST: {
            newState = {allPlaylists: {...state.allPlaylists}, singlePlaylist: {...state.singlePlaylist}}
			newState.singlePlaylist = action.playlist

			return newState;
        }

        case DELETE_PLAYLIST:
            newState = { allPlaylists: { ...state.allPlaylists }, singlePlaylist: { ...state.singlePlaylist } }
            delete newState.allPlaylists[action.playlistId]
            return newState
        default:
            return state;
    }
}
