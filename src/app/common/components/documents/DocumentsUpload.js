import React from 'react';
import { Form } from '@flowable/forms';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import Snackbar from '@material-ui/core/Snackbar';
import { updateModal } from 'app/store/actions';
import * as Actions from 'app/common/store/actionTypes';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const DocumentsUpload = ({ propertyId, fileCatType }) => {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const flowable = useSelector(({ common }) => common.flowable);
  const uploadInProgress = useSelector(
    ({ property }) => property.document.uploadInProgress
  );
  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange' || 'Payload.beforeChange':
        if (api.formValid()) {
          dispatch({
            type: Actions.FLOWABLE_FORM_DATA_TABLE_ROW_SELECTED_DATA,
            payload: api.payload.get()
          });
          dispatch(updateModal(api.formValid()));
        }
        break;
      default:
        break;
    }
    return true;
  };

  const ShowMessage = (props) => {
    let message = '';
    if (uploadInProgress) {
      message = 'Uploading file...';
    }
    return (
      <Snackbar
        style={{ paddingTop: '80px' }}
        open={props.show}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={`${message}`}
      ></Snackbar>
    );
  };
  return (
    <div className="p-0">
      <ShowMessage show={uploadInProgress} />
      {!flowable['DocumentsUpload']?.processed ? (
        <FuseLoading />
      ) : (
        <>
          <Form
            className={clsx(flwClasses.form, '')}
            onEvent={onEventHandler}
            config={flowable['DocumentsUpload']?.formDef}
            payload={{ dropDownList: fileCatType }}
          />
        </>
      )}
    </div>
  );
};

export default DocumentsUpload;
