import useIsMounted from 'app/common/hooks/useIsMounted';
import clsx from 'clsx';
import { Form } from '@flowable/forms';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { closeDialog, openDialog, openModal } from 'app/store/actions';
import {
  documentsDeleteStart,
  getDocumentsListStart
} from 'app/common/store/actions';
import { bytesToSize } from 'app/common/helpers/common-helper';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import * as Actions from 'app/common/store/actionTypes';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { useFormStyles } from '@monarch/Flowable/useStyles';

function DocumentsPage({ propertyId, fileCatType, title }) {
  const flwClasses = useFormStyles();
  const isMounted = useIsMounted();
  const flowable = useSelector(({ common }) => common.flowable);
  const dispatch = useDispatch();
  const uploadInProgress = useSelector(
    ({ property }) => property.document.uploadInProgress
  );
  const deleteFlag = useSelector(({ common }) => common.documents.deleteFlag);
  const documentsList = useSelector(
    ({ common }) => common.documents.documentsList
  );
  const s3Inprogress = useSelector(
    ({ property }) => property?.document?.s3InProgress
  );
  useEffect(() => {
    if (isMounted.current) {
      dispatch(getDocumentsListStart(propertyId));
    }
  }, [isMounted, dispatch, uploadInProgress, propertyId, s3Inprogress]);

  useEffect(() => {
    if (isMounted.current) {
      dispatch({
        type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
        path: 'documents',
        fileNames: ['DocumentsList', 'DocumentsUpload'],
        formAction: Actions.COMMON_FORMDEFIINITION
      });
    }
  }, [isMounted, dispatch]);

  const filePreview = (props) => {
    dispatch(
      openModal({
        children: (
          <div>
            <embed src={props.fileS3Url} width="100%" height="500px" />
          </div>
        ),
        title: props.fileName,
        maxwidth: 'md'
      })
    );
  };

  const onEventHandler = (eventName, config, state, api) => {
    let dataPayload;
    switch (eventName) {
      case 'Payload.afterChange':
        if (api.formValid()) {
          if (api.payload.get().documentsList?.$item !== 'Delete') {
            filePreview(api.payload.get().documentsList);
          }
        }
        break;
      case 'Button.click':
        dataPayload = config.$scope;
        if (config.extraSettings.text === 'Delete') {
          const { fileS3Url, fileCategoryType, fileName } = dataPayload;
          dispatch(
            openDialog({
              children: (
                <>
                  <DialogTitle id="alert-dialog-title">
                    Are You sure you want to delete <code>{fileName}</code>?
                  </DialogTitle>
                  <DialogActions>
                    <MonarchButton
                      onClick={() => dispatch(closeDialog())}
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      {'No'}
                    </MonarchButton>
                    <MonarchButton
                      onClick={() => {
                        dispatch(
                          documentsDeleteStart(
                            fileS3Url,
                            fileCategoryType,
                            propertyId
                          )
                        );
                      }}
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      {'Yes'}
                    </MonarchButton>
                  </DialogActions>
                </>
              )
            })
          );
        }
        break;
      default:
        break;
    }

    return true;
  };

  const documentsListModified = documentsList.map((res) => {
    return {
      ...res,
      fileSize: bytesToSize(res.fileMetadata.fileSize),
      fileCatType: fileCatType.filter(
        (fileCategory) => fileCategory.value === res.fileCategoryType
      )[0]?.name
    };
  });
  return (
    <>
      {!flowable['DocumentsList']?.processed || deleteFlag ? (
        <FuseLoading />
      ) : (
        <Form
          className={clsx(flwClasses.form)}
          onEvent={onEventHandler}
          config={flowable['DocumentsList'].formDef}
          payload={{ documentList: documentsListModified }}
        />
      )}
    </>
  );
}

export default DocumentsPage;
