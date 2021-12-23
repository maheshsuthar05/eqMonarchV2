export const GET_FOLDERS = '[MAIL APP] GET FOLDERS';

const request = [
	{
		"id": 0,
		"handle": "inbox",
		"title": "Inbox",
		"translate": "INBOX",
		"icon": "inbox"
	},
	{
		"id": 1,
		"handle": "sent",
		"title": "Sent",
		"translate": "SENT",
		"icon": "send"
	},
]

export const getFolders = () => ({
	type: GET_FOLDERS,
	payload: request
});

