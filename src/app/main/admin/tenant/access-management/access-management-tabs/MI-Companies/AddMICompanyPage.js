import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@flowable/forms';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import { updateModal } from 'app/store/actions';
import { makeStyles } from '@material-ui/core/styles';
import FuseLoading from '@fuse/core/FuseLoading';
import clsx from 'clsx';

import { useFormStyles } from '@monarch/Flowable/useStyles';

const useStyles = makeStyles((theme) => ({
  addMI: {
    '& .flw__boolean__checkbox': {
      marginTop: 0
    }
  }
}));

function AddMICompanyPage(props) {
  const { caseId, data, isEdit } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const flwClasses = useFormStyles();
  const [dataPayload, setDataPayload] = useState({});
  const formDefinition = useSelector(
    ({ flowable }) => flowable.formDefinition.formFinalAction
  );
  const isFormProcessing = useSelector(
    ({ flowable }) => flowable.formDefinition.isFormProcessing
  );

  useEffect(() => {
    if (data && Array.isArray(data.variables) && isEdit) {
      setDataPayload(Actions.payloadToEditScreen(data));
    }
  }, [data, isEdit]);

  useEffect(() => {
    if (caseId) {
      dispatch(Actions.getForm(caseId));
    }
  }, [dispatch, caseId]);

  const fn = {
    getAdditionalData: () => ({
      additionalData: {
        isEdit: isEdit
      }
    }),
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Payload.afterChange':
          if (api.formValid()) {
            dispatch(updateModal(api.formValid(), api.payload.get(), true));
            dispatch({
              type: 'GET_FLOWABLE_FORM_DATA_START',
              payload: api.payload.get()
            });
          } else {
            dispatch(updateModal(api.formValid(), {}, false));
          }
          break;
        default:
          break;
      }
    }
  };

  return isFormProcessing ? (
    <FuseLoading />
  ) : (
    <Form
      className={clsx(flwClasses.form, classes.addMI)}
      config={formDefinition}
      payload={dataPayload}
      onEvent={fn.onEventHandler}
      additionalData={fn.getAdditionalData()}
    />
  );
}

export default AddMICompanyPage;
