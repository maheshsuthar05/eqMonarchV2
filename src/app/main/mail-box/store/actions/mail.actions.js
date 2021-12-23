import * as Actions from '../actionTypes';

export const getMail = (routeParams, data) => ({
	type: Actions.GET_MAIL,
	routeParams,
	payload: data
})

export function toggleStar(mail) {
	const newMail = {
		...mail,
		starred: !mail.starred
	};
	return dispatch => {
		dispatch({ type: Actions.TOGGLE_STAR });
		return dispatch(updateMail(newMail));
	};
}

export function toggleImportant(mail) {
	const newMail = {
		...mail,
		important: !mail.important
	};

	return dispatch => {
		dispatch({ type: Actions.TOGGLE_IMPORTANT });
		return dispatch(updateMail(newMail));
	};
}

export const updateMail = (mail) => ({
	type: Actions.UPDATE_MAIL,
	payload: mail
})
