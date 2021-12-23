import { Form } from '@flowable/forms';
import React, { useState } from 'react';
import {
  templateUploadStart,
  templateDownloadStart
} from 'app/main/property/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import FuseLoading from '@fuse/core/FuseLoading';
import { closeModal } from 'app/store/actions';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    height: '30px',
    width: 'auto',
    fontSize: '1rem'
  },
  buttonRoot: {
    marginLeft: '50%'
  },
  upload: {
    height: '30px',
    fontSize: '1rem'
  },
  progressEnd: {
    display: 'none'
  },
  progressStart: {
    display: 'block',
    margin: '0px 12px'
  },
  progressStartDownload: {
    position: 'absolute',
    right: '8px'
  },
  formSection: {
    width: '70%'
  }
}));
function PropertyBulkImportTemplate() {
  const dispatch = useDispatch();
  const flowable = useSelector(({ flowable }) => flowable.jsonForm);
  const uploadFlag = useSelector(
    ({ property }) => property.bulkimport.uploadFlag
  );
  const downloadDuration = useSelector(
    ({ property }) => property.bulkimport.downloadFlag
  );
  const user = useSelector(({ auth }) => auth.user);

  const classes = useStyles();
  const [formButton, setformButton] = useState(false);
  const [formPayload, setFormPayload] = useState(null);
  const [downloadFlag, setDownloadFlag] = useState(false);
  const [downloadFile, setDownloadFile] = useState({});
  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        setformButton(api.formValid());
        if (api.formValid()) {
          setformButton(api.formValid());
          setFormPayload(api.payload.get().selectFile);
        }
        if (state.hasOwnProperty('selectTemplate') !== undefined) {
          if (state.selectTemplate !== undefined) {
            if (state.selectTemplate === null) {
              setDownloadFlag(false);
              return;
            }
            setDownloadFlag(true);
            setDownloadFile(state.selectTemplate);
          }
        }
        break;
      case 'Link.click':
        dispatch(closeModal());
        break;
      default:
        return true;
    }

    return true;
  };
  const onFormButtonHandler = () => {
    let file_path = downloadFile.fileS3Url;
    dispatch(templateDownloadStart(file_path));
  };

  const onFormButtonUpload = () => {
    dispatch(
      templateUploadStart(
        user.tenantCode,
        formPayload[0].fileData,
        'property_bulk_input_bound'
      )
    );
  };

  const ProgressComponent = ({ progressFlag, progressStart, progressEnd }) => {
    return (
      <div className={progressFlag ? progressStart : progressEnd}>
        <CircularProgress color="inherit" size={30} />
      </div>
    );
  };

  const ButtonComponent = ({ classes, clickEvent, flag, title }) => {
    return (
      <Button
        className={classes}
        onClick={clickEvent}
        color="primary"
        variant="contained"
        disabled={flag}
        size="small"
      >
        {title}
      </Button>
    );
  };

  return (
    <div className="p-0">
      {!flowable.isFormProcessed ? (
        <FuseLoading />
      ) : (
        <div className="flex flex-row p-12">
          <div className={clsx('flex flex-col', classes.formSection)}>
            <Form
              onEvent={onEventHandler}
              config={flowable.formDefinition[1].json}
              additionalData={{ downloadFlag }}
            />
            <div className={clsx('flex flex-row', classes.buttonRoot)}>
              <ButtonComponent
                classes={classes.upload}
                flag={uploadFlag ? uploadFlag : !formButton}
                clickEvent={onFormButtonUpload}
                title="Bulk Import"
              />
              <ProgressComponent
                progressStart={classes.progressStart}
                progressEnd={classes.progressEnd}
                progressFlag={uploadFlag}
              />
            </div>
          </div>
          <div className="flex flex-rows m-6">
            <ButtonComponent
              classes={classes.button}
              flag={downloadDuration ? downloadDuration : !downloadFlag}
              clickEvent={onFormButtonHandler}
              title={'Download Template'}
            />
            <ProgressComponent
              progressStart={classes.progressStartDownload}
              progressEnd={classes.progressEnd}
              progressFlag={downloadDuration}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyBulkImportTemplate;
