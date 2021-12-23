import axios from 'axios';

import * as Actions from '../actionTypes';

export const fetchMails = (routeParams) => ({
	type: Actions.FETCH_MAILS,
	routeParams
})

export const getMails = (routeParams, data) => ({
	type: Actions.GET_MAILS,
	routeParams,
	entities: data
})

export const getMailById = (routeParams, data) => ({
	type: Actions.GET_MAIL_BY_ID,
	routeParams,
	entities: data
})

export function updateMails() {
	return (dispatch, getState) => {
		const { routeParams } = getState().mailApp.mails;

		const request = axios.get('/api/mail-app/mails', {
			params: routeParams
		});

		return request.then(response =>
			dispatch({
				type: Actions.UPDATE_MAILS,
				payload: response.data
			})
		);
	};
}

export function selectAllMails() {
	return {
		type: Actions.SELECT_ALL_MAILS
	};
}

export function deselectAllMails() {
	return {
		type: Actions.DESELECT_ALL_MAILS
	};
}

export function selectMailsByParameter(parameter, value) {
	return {
		type: Actions.SELECT_MAILS_BY_PARAMETER,
		payload: {
			parameter,
			value
		}
	};
}

export function toggleInSelectedMails(mailId) {
	return {
		type: Actions.TOGGLE_IN_SELECTED_MAILS,
		mailId
	};
}

export const setSearchText = (event, routeParams) => ({
	type: Actions.SET_SEARCH_TEXT,
	searchText: event.target.value.toLowerCase(),
	routeParams: routeParams
});

export const setFolderOnSelectedMails = (id) => ({
	type: Actions.SET_FOLDER_ON_SELECTED_MAILS
})

export const toggleLabelOnSelectedMails = (id) => ({
	type: Actions.TOGGLE_LABEL_ON_SELECTED_MAILS
});


export const getUnreadMailCount = (count) => ({
	type: Actions.GET_MAILS_UNREAD_COUNT,
	count: count
})

export const fetchUnreadMailCount = () => ({
	type: Actions.FETCH_MAILS_UNREAD_COUNT
})