import { Form } from '@flowable/forms';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import {
  deleteLegalEntityStart,
  saveLegalEntityStart,
  editLegalEntityStart
} from 'app/main/admin/store/actions/tenant-admin.actions';
import AddLegalEntityPage from './AddLegalEntityPage';
import {
  openModal,
  closeModal,
  openDialog,
  closeDialog
} from 'app/store/actions';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import Tooltip from '@material-ui/core/Tooltip';
import { DialogActions, DialogTitle, IconButton } from '@material-ui/core';
import { IoAddCircleOutline } from 'react-icons/io5';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import clsx from 'clsx';

import { useFormStyles } from '@monarch/Flowable/useStyles';
import { REFRESH } from 'app/main/admin/store/actions';

function LegalEntitiesPage(props) {
  const pageLayout = useRef(null);
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const flowable = useSelector(({ admin }) => admin.flowable);

  const refresh = useSelector(({ admin }) => admin.refresh.LEGAL_ENTITY);

  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );

  const [refreshForm, setRefreshForm] = React.useState(false);

  useEffect(() => {
    if (refresh) {
      setRefreshForm(true);
      setTimeout(() => {
        setRefreshForm(false);
        dispatch({
          type: REFRESH.PROPERTY.LEGAL_ENTITY,
          payload: false
        });
      }, 2000);
    }
  }, [dispatch, refreshForm, refresh]);

  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: ['legal_entity_list', 'add_legal_entity'],
      formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
    });
  }, [dispatch]);

  const onAddLegalEntityHandler = (data, isEdit) => {
    if (isEdit) {
      dispatch(
        editLegalEntityStart(
          formPayloadRef.current,
          REFRESH.PROPERTY.LEGAL_ENTITY
        )
      );
    } else {
      dispatch(
        saveLegalEntityStart(
          formPayloadRef.current,
          REFRESH.PROPERTY.LEGAL_ENTITY
        )
      );
    }
    dispatch(closeModal());
  };

  function handleAddLegalEntityClick(data, isEdit) {
    dispatch(
      openModal({
        children: <AddLegalEntityPage data={data} isEdit={isEdit} />,
        title: isEdit ? 'Edit Entity' : 'Add Entity',
        maxwidth: 'sm',
        buttons: (
          <>
            <MonarchButton
              onClick={() => onAddLegalEntityHandler(data, isEdit)}
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
  }

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Button.click':
        if (config.extraSettings.text === 'Edit') {
          handleAddLegalEntityClick(config.$scope, true);
        }
        if (config.extraSettings.text === 'Delete') {
          dispatch(
            openDialog({
              children: (
                <>
                  <DialogTitle id="alert-dialog-title">
                    Are You sure you want to delete{' '}
                    {config.$scope.legalEntityName} ?
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
                          deleteLegalEntityStart(
                            config.$scope,
                            REFRESH.PROPERTY.LEGAL_ENTITY
                          )
                        );
                        dispatch(closeDialog());
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

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Legal Entity'}
      contentToolbar={
        <>
          <Tooltip title="Add Legal Entity">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => handleAddLegalEntityClick({}, false)}
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
          {!flowable['legal_entity_list']?.processed ? (
            <FuseLoading />
          ) : (
            <Form
              config={flowable['legal_entity_list']?.formDef}
              className={clsx(flwClasses.form, 'listing-page')}
              onEvent={onEventHandler}
              additionalData={{ tableRefresh: refreshForm }}
            />
          )}
        </>
      }
      leftSidebarContent={<></>}
      ref={pageLayout}
    />
  );
}

export default LegalEntitiesPage;
