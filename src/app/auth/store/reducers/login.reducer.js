import * as Actions from '../actionTypes';

const initialState = {
	success: false,
	error: {
		username: null,
		password: null
	},
	username: null,
	realm: null
};

const login = (state = initialState, action) => {
	switch (action.type) {

		case Actions.LOGIN_SUCCESS: {
			return {
				...initialState,
				success: true,
				realm: action.response.data.realm,
				username: action.username
			};
		}
		case Actions.LOGIN_ERROR: {
			return {
				success: false,
				error: action.payload
			};
		}
		default: {
			return state;
		}
	}
};

export default login;
