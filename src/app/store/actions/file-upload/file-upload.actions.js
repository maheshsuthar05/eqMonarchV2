import * as Actions from '../actionTypes';

export const postUploadAttachment = (attachments, data) => ({
    type: Actions.POST_UPLOAD_ATTACHMENT,
    attachments: attachments,
    data: data
});

export const getUploadAttachmentData = () => ({
    type: Actions.GET_UPLOAD_ATTACHMENT
})
