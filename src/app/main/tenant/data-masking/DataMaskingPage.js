import { Form } from '@flowable/forms';
import React, { useEffect, useRef, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { addDataMaskFormStart } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { closeModal, openModal, updateModal } from 'app/store/actions';
import { IconButton, Tooltip } from '@material-ui/core';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const DataMaskingPage = (props) => {
  const dispatch = useDispatch();
  const tenantId = useParams().tenantId;
  const flwClasses = useFormStyles();
  const [formPayload, setFormPayload] = useState({});

  const loading = useSelector(({ tenant }) => tenant.dataMask.loading);
  const flowable = useSelector(({ tenant }) => tenant.flowable);

  const formPayloadRef = useRef({});
  formPayloadRef.current = formPayload;

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-IAM',
      fileNames: ['dataMask_add', 'Data_Masking_Template'],
      formAction: 'TENANT_FORMDEFIINITION'
    });
  }, [dispatch]);

  const onFormButtonHandler = () => {
    dispatch(addDataMaskFormStart(formPayloadRef.current, tenantId));
    dispatch(closeModal());
  };

  const handleAddMaskingClick = () => {
    dispatch(
      openModal({
        children: !flowable['dataMask_add']?.processed ? (
          <FuseLoading />
        ) : (
          <div className="bg-white">
            <Form
              config={flowable['dataMask_add']?.formDef}
              onEvent={onEventHandler}
              className={flwClasses.form}
            />
          </div>
        ),
        title: 'Add Masking',
        maxwidth: 'sm',
        buttons: (
          <>
            <MonarchButton
              onClick={() => onFormButtonHandler()}
              color="primary"
              variant="contained"
              size="small"
              disabled
            >
              {'Save'}
            </MonarchButton>
          </>
        )
      })
    );
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        dispatch(updateModal(api.formValid()));
        if (api.formValid()) {
          const payload = api.payload.get();
          payload['pattern'] =
            payload.patternType === 'text'
              ? payload.patternText
              : payload.patternNumber;
          setFormPayload(payload);
        }
        break;
      default:
        break;
    }

    return true;
  };

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Data Masking'}
      contentToolbar={
        <>
          <Tooltip title="Add Masking">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={handleAddMaskingClick}
              size="small"
            >
              <IoAddCircleOutline />
            </IconButton>
          </Tooltip>
          <div className="show-clear-filter">&nbsp;</div>
        </>
      }
      content={
        <>
          {!flowable['Data_Masking_Template']?.processed || !loading ? (
            <FuseLoading />
          ) : (
            <Form
              config={flowable['Data_Masking_Template']?.formDef}
              onEvent={onEventHandler}
              className={flwClasses.form}
            />
          )}
        </>
      }
      leftSidebarContent={<></>}
    />
  );
};

export default DataMaskingPage;
