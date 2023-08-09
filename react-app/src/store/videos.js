// constants
export const GET_ALLVIDEOS = "videos/GET_ALLVIDEOS";
const GET_VIDEO = 'videos/GET_VIDEO'
const CREATE_VIDEO = 'videos/CREATE_VIDEO'
const UPDATE_VIDEO = 'videos/UPDATE_VIDEO'
const DELETE_VIDEO = 'videos/DELETE_VIDEO'



export const getAllVideosAction = (videos) => ({
	type: GET_ALLVIDEOS,
	videos
});

const getVideoAction = (video) => ({
	type: GET_VIDEO,
	video
})

const createVideoAction = (video) => ({
	type: CREATE_VIDEO,
	video
})

const updateVideoAction = (video) => ({
	type: UPDATE_VIDEO,
	video
})

const deleteVideoAction = (videoId) => ({
	type: DELETE_VIDEO,
	videoId
})


export const getAllVideosThunk = () => async (dispatch) => {
	const response = await fetch("/api/videos/")
	// console.log("responseeeeeeeeeeeeeeee", response)
	if (response.ok) {
		const data = await response.json();
		// console.log('DDDAAATAAALLVIDEOS', data)
		if (data.errors) {
			return;
		}
		console.log("dataaaaaaaaaaaaaaaa", data)

		dispatch(getAllVideosAction(data));
	}
};

export const getVideoThunk = (id) => async (dispatch) => {
	console.log("THE IDDDD ", id)
	const response = await fetch(`/api/videos/${id}`)
	// console.log("THE RESPONSE ", response)
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return
		}
		// console.log("DATAAAA ", data)
		dispatch(getVideoAction(data))
		return data
	}
}

// export const createVideoThunk = (video) => async (dispatch) => {
// 	// console.log("VIDEO")
// 	const response = await fetch('/api/videos/new', {
// 		method: 'POST',
// 		body: video
// 	})

// 	if (response.ok) {
// 		const data = await response.json();
// 		if (data.errors) {
// 			return data.errors
// 		}
// 		dispatch(createVideoAction(data))
// 	}
// }

// export const updateVideoThunk = (video, updatedVideo) => async (dispatch) => {
// 	console.log("TEST 2", video)

// 	const response = await fetch(`/api/videos/${video}`, {
// 		method: 'PUT',
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			id: updatedVideo.id,
// 			name: updatedVideo.name,
// 			artist_name: updatedVideo.artist_name,
// 			artist_id: updatedVideo.artist_id,
// 			genre: updatedVideo.genre,
// 			preview_img: updatedVideo.preview_img
// 		}),
// 	})

// 	if (response.ok) {
// 		const data = await response.json();

// 		if (data.errors) {
// 			// console.log("TEST 6")
// 			return data.errors
// 		}
// 		// console.log("TEST 4")
// 		dispatch(updateVideoAction(data))
// 		return data
// 	}
// }

// export const deleteVideoThunk = (videoId) => async (dispatch) => {
// 	const response = await fetch(`/api/videos/${videoId}`, {
// 		method: 'DELETE',
// 		body: videoId
// 	})
// 	if (response.ok) {
// 		const data = await response.json()
// 		if (data.errors) {
// 			return data.errors
// 		}
// 		dispatch(deleteVideoAction(data))
// 	}
// }

const initialState = { allVideos: {}, singleVideo: {} }

export default function videosReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_ALLVIDEOS:
            // console.log("THIS IS ACTIONNN", action.videos.videos)
			newState = { ...state, allVideos: { ...action.allVideos } }
			action.videos.videos.forEach(video => newState.allVideos[video.id] = video)
			return newState
		case GET_VIDEO:
			// console.log("ACTIONN ", action)
			newState = { ...state, singleVideo: { ...action.video } }
			// console.log("NEW STATEEEE ", newState)
			return newState
		case CREATE_VIDEO:
			// console.log("STATEEEE", state)
			// console.log("ACTIONNN", action)
			newState = { ...state, singleVideo: { ...action.singleVideo } }
			return newState
		case UPDATE_VIDEO:
			newState = {
				...state,
				singleVideo: {
					...state.singleVideo,
				},
			};
			newState[action.video.id] = action.video;
			return newState;
		case DELETE_VIDEO:
			newState = { ...state, allVideos: { ...state.allVideos } }
			delete newState.allVideos[action.videoId]
			return newState

		default:
			return state;
	}
}
