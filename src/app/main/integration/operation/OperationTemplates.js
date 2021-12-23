import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { Form } from '@flowable/forms';
import * as Actions from '../store/actionTypes';
import { makeStyles } from '@material-ui/core/styles';
import { forgerock } from 'app/config/api';
import Cookies from 'js-cookie';
import { hasAccess } from 'app/common/helpers/common-helper';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const OperationTemplates = ({ templateData }) => {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const flwClasses = useFormStyles();
  const classes = useStyles();
  let inputTmp = [];
  let outputTmp = [];
  const inputInforamtion = useSelector(
    ({ integration }) => integration.operation.formData
  );
  const inputOutputData = templateData;
  const inputTemplateLocation = templateData.inputTemplateLocation;
  const outputTemplateLocation = templateData.outputTemplateLocation;
  const loading = useSelector(
    ({ integration }) => integration.operation.formLoad
  );
  const attachments = useSelector(({ fileUpload }) => fileUpload.uploadDetails);
  const contextResources = useSelector(
    (state) => state.common.IAMResource.contextResources
  );

  useEffect(() => {
    dispatch({ type: Actions.GET_TEMPLATE_FORM });
  }, [dispatch, attachments.uploaded]);

  const onOutcomePressed = (payload, clickEvent) => {
    switch (clickEvent) {
      case 'Upload':
        dispatchUpload(payload);
        break;
      default:
        break;
    }
  };

  const onChange = (payload) => {
    payload.InputAttachments.map((changeData, key) => {
      if (changeData.status === 1) {
        delete payload.InputAttachments[key];
        delete inputTmp[key];
        delete inputTemplateLocation[key];
        dispatchUpload(payload);
      }
      return false;
    });
    payload.OutputAttachments.map((changeData, key) => {
      if (changeData.status === 1) {
        delete payload.OutputAttachments[key];
        delete outputTmp[key];
        delete outputTemplateLocation[key];
        dispatchUpload(payload);
      }
      return false;
    });
  };

  const dispatchUpload = (payload) => {
    dispatch({
      type: Actions.INSERT_TEMPLATE,
      data: inputOutputData,
      routeParams,
      fileUpload: payload
    });
    dispatch({ type: '[FILE UPLOAD] RESET_UPLOAD' });
  };

  if (loading) {
    inputTmp = [];
    outputTmp = [];
    inputTemplateLocation.map((input) => {
      inputTmp.push({
        name: input.fileName,
        downloadUrl: input.fileS3Url,
        previewUrl: input.fileName,
        status: 3
      });
      return input;
    });
    outputTemplateLocation.map((output) => {
      outputTmp.push({
        name: output.fileName,
        downloadUrl: output.fileS3Url,
        previewUrl: output.fileName,
        status: 3
      });
      return output;
    });
  }

  return !loading ? (
    <FuseLoading />
  ) : (
    <div className={classes.root}>
      <Form
        onOutcomePressed={onOutcomePressed}
        onChange={onChange}
        config={inputInforamtion}
        className={flwClasses.form}
        payload={{
          InputAttachments: inputTmp,
          OutputAttachments: outputTmp,
          tenantId: {
            tenantID: Cookies.get(forgerock.cookie.tenantCode)
          },
          uploadAccess: hasAccess(
            contextResources,
            'Integration_Service_Operations_Template_Actions_Upload'
          )
        }}
      />
    </div>
  );
};

export default OperationTemplates;
