import { Form } from '@flowable/forms';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { closeModal } from 'app/store/actions';
import { templateDownloadStart } from 'app/main/property/store/actions';
import clsx from 'clsx';
import { bulkOperations } from 'app/config/api';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import { flowableCustomFetch } from 'app/common/helpers/common-helper';

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    height: '30px'
  },
  progressEnd: {
    display: 'none'
  },
  progressStart: {
    display: 'block',
    margin: '4px 12px'
  }
}));

function PropertyBulkImportTemplateDetails({ batchId, batchError }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const flowable = useSelector(({ flowable }) => flowable.jsonForm);
  const errorFileDetails = useSelector(
    ({ property }) => property.bulkimport.errorFileDetails
  );
  const downloadDuration = useSelector(
    ({ property }) => property.bulkimport.downloadFlag
  );
  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Link.click':
        if (config.$original.value === 'Download') {
          return;
        }
        dispatch(closeModal());
        break;
      default:
        return true;
    }

    return true;
  };
  const onFormButtonHandler = () => {
    let file_path = errorFileDetails[0].fileS3Url;
    dispatch(templateDownloadStart(file_path));
  };
  const ProgressComponent = ({ progressFlag }) => {
    return (
      <div
        className={progressFlag ? classes.progressStart : classes.progressEnd}
      >
        <CircularProgress color="inherit" size={30} />
      </div>
    );
  };
  return (
    <div className="p-0">
      {!flowable.isFormProcessed ? (
        <FuseLoading />
      ) : (
        <>
          <Form
            onEvent={onEventHandler}
            config={flowable.formDefinition[2].json}
            fetch={flowableCustomFetch(
              bulkOperations.api.batchErrorList(batchId),
              null,
              'GET'
            )}
            additionalData={{ batchId, batchError }}
          />
          <div className={clsx('flex flex-row justify-end')}>
            {errorFileDetails.length > 0 ? (
              <>
                <ProgressComponent progressFlag={downloadDuration} />
                <Button
                  className={classes.button}
                  onClick={onFormButtonHandler}
                  color="primary"
                  variant="contained"
                  size="medium"
                >
                  Download
                </Button>
              </>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

export default PropertyBulkImportTemplateDetails;
