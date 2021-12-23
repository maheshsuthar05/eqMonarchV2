import { combineReducers } from 'redux';
import filters from './filters.reducer';
import folders from './folders.reducer';
import labels from './labels.reducer';
import mail from './mail.reducer';
import mails from './mails.reducer';
import compose from './compose.reducer';
import counter from './counter.reducer';
import MailFlowableReducer from './mail.flowable.reducer';

const reducer = combineReducers({
	mails,
	mail,
	folders,
	labels,
	filters,
	compose,
	counter,
	flowable:MailFlowableReducer
});

export default reducer;
