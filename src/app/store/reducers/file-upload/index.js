import { combineReducers } from 'redux';
import uploadDetails from './file-upload.reducer';

const fileUploadReducers = combineReducers({
    uploadDetails
});

export default fileUploadReducers;
