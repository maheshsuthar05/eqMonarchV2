import { Form } from '@flowable/forms';
import React, { useEffect, useRef } from 'react';
import useIsMounted from 'app/common/hooks/useIsMounted';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { openModal } from 'app/store/actions';
import * as actions from 'app/main/admin/store/actionTypes';
import TaskPropertiesEdit from './TaskPropertiesEdit';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import clsx from 'clsx';

import { useFormStyles } from '@monarch/Flowable/useStyles';

function TaskPropertiesPage(props) {
  const pageLayout = useRef(null);
  const isMounted = useIsMounted();
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const tableRefresh = useSelector(
    ({ admin }) => admin.propertyAdmin.tableRefresh
  );
  const flowable = useSelector(({ admin }) => admin.flowable);
  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );
  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  useEffect(() => {
    if (isMounted.current) {
      dispatch({ type: actions.GET_PARTY_ROLE_TYPE_LIST_START });
      dispatch({
        type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
        path: 'tenant-admin',
        fileNames: ['task_properties_list', 'task_properties_edit'],
        formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
      });
    }
  }, [isMounted, dispatch]);

  const onFormButtonHandler = () => {
    dispatch({
      type: actions.TENANT_ADMIN_TASK_PROPERTIES_EDIT_START,
      payload: formPayloadRef.current.formData
    });
  };

  function handleAddLegalEntityClick(data, isEdit) {
    dispatch(
      openModal({
        children: <TaskPropertiesEdit data={data} isEdit={isEdit} />,
        title: isEdit ? `Edit ${data.taskDisplayName}` : 'Add Task Properties',
        maxwidth: 'md',
        buttons: (
          <>
            <MonarchButton
              color="primary"
              variant="contained"
              size="small"
              disabled
              onClick={onFormButtonHandler}
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
        break;
      default:
        break;
    }

    return true;
  };

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Task Property'}
      contentToolbar={<></>}
      content={
        <>
          {!flowable['task_properties_list']?.processed ? (
            <FuseLoading />
          ) : (
            <Form
              config={flowable['task_properties_list']?.formDef}
              className={clsx(flwClasses.form, 'listing-page')}
              onEvent={onEventHandler}
              additionalData={{ tableRefresh }}
            />
          )}
        </>
      }
      leftSidebarContent={<></>}
      ref={pageLayout}
    />
  );
}

export default TaskPropertiesPage;
