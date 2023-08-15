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
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(getAllVideosAction(data));
	}
};

export const getVideoThunk = (id) => async (dispatch) => {
	console.log('IN GETBYID ID', typeof id)

	const response = await fetch(`/api/videos/${id}`)
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return
		}
		dispatch(getVideoAction(data))
		return data
	}
}

export const createVideoThunk = (video) => async (dispatch) => {
	const response = await fetch('/api/videos/new', {
		method: 'POST',
		body: video
	})

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data.errors
		}
		dispatch(createVideoAction(data))
	}
}

export const updateVideoThunk = (id, updatedVideo) => async (dispatch) => {
	// console.log('IN UPDATETHUNK ID', typeof id)
	// for (const value of updatedVideo.values()) {
	// 	console.log(value);
	//   }
	const response = await fetch(`/api/videos/${id}`, {
		method: 'PUT',
		body: updatedVideo
		// body: JSON.stringify({
		// 	mp4: updatedVideo.mp4,
		// 	description: updatedVideo.description,
		// 	title: updatedVideo.title,
		// }),
	})

	if (response.ok) {
		const data = await response.json();

		if (data.errors) {
			return data.errors
		}
		dispatch(updateVideoAction(data))
		return data
	}
}

export const deleteVideoThunk = (videoId) => async (dispatch) => {
	console.log('VIDEO DELETE THUNK',videoId)
	const response = await fetch(`/api/videos/${videoId}`, {
		method: 'DELETE',
		body: videoId
	})
	if (response.ok) {
		const data = await response.json()
		if (data.errors) {
			return data.errors
		}
		dispatch(deleteVideoAction(data))
	}
}

const initialState = { allVideos: {}, singleVideo: {} }

export default function videosReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_ALLVIDEOS:
			newState = { ...state, allVideos: { ...action.allVideos } }
			action.videos.videos.forEach(video => newState.allVideos[video.id] = video)
			return newState
		case GET_VIDEO:
			newState = { ...state, singleVideo: { ...action.video } }
			return newState
		case CREATE_VIDEO:
			newState = { ...state, singleVideo: { ...action.singleVideo } }
			return newState
		case UPDATE_VIDEO:
			// newState = {
			// 	...state, singleVideo: {...state.singleVideo,},};
			// 	console.log('UPDATEVIDEO CASE ACTION', action)
			// newState[action.video.id] = action.video;

			newState = {allVideos: {...state.allVideos}, singleVideo: {...state.singleVideo}}
			newState.singleVideo = action.video

			return newState;
		case DELETE_VIDEO:
			newState = { ...state, allVideos: { ...state.allVideos } }
			delete newState.allVideos[action.videoId]
			return newState

		default:
			return state;
	}
}
