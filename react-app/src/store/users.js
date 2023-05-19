const GET_USER = 'users/GET_USER'

export const getUserAction = (user) => ({
    type: GET_USER,
    user
})

export const getUserThunk = (id) => async (dispatch) => {
	const response = await fetch(`/api/users/${id}`)
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		console.log("dataaaaaaaaaaaaaaaa", data)

		dispatch(getUserAction(data));
	}
};
