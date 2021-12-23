import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './../store/actionTypes';
import { useParams } from 'react-router';
import FuseLoading from '@fuse/core/FuseLoading';
import { Form } from '@flowable/forms';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { PostPlanItemInstances } from '../store/actions/adhoc.actions';
import { VscSourceControl } from 'react-icons/vsc';
import Tooltip from '@material-ui/core/Tooltip';
import { useTheme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { _cookies, openModal, updateModal } from 'app/store/actions';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import { forgerock } from 'app/config/api';

export default function ProcessAdhoc(props) {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const routeParams = useParams();
  const theme = useTheme();

  const [formInputPayload, setFormInputPayload] = React.useState({
    state: false,
    title: '',
    caseInstanceID: '',
    propertyId: '',
    planItemDefinitionType: ''
  });

  const [formOutputPayload, setFormOutputPayload] = React.useState({});
  const [submitButton, setSubmitButton] = React.useState(false);

  const flowable = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.flowable
  );

  const propertyId = useSelector(
    ({ property }) => property?.get?.property?.property?.propertyId
  );

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tasks/ad-hoc',
      fileNames: ['Adhoc_Plan_Item_Instance_for_process_and_task'],
      formAction: Actions.TASKMANAGMENT_FORMDEFIINITION
    });
  }, [dispatch]);

  useEffect(() => {
    if (typeof propertyId != undefined) {
      setFormInputPayload({
        state: true,
        title: 'Process / Task',
        caseInstanceId: routeParams.caseInstanceId,
        propertyId: propertyId
      });
    }
  }, [routeParams.caseInstanceId, propertyId]);

  useEffect(() => {
    if (submitButton) {
      dispatch(PostPlanItemInstances(formOutputPayload));
    }
  }, [formOutputPayload, submitButton, dispatch]);

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        const payload = api.payload.get();
        dispatch(updateModal(api.formValid()));
        if (api.formValid()) {
          if (state.assignToMe) {
            payload['assignTo'] = _cookies.getCookies(
              forgerock.cookie.userName
            );
          } else {
            payload['assignTo'] = payload.assignee.id;
          }
          setFormOutputPayload(payload);
        }
        break;
      default:
        break;
    }
  };

  const onFormButtonHandler = () => {
    setSubmitButton(true);
  };

  const handleOpenDialog = () => {
    dispatch(
      openModal({
        children: (
          <>
            {!flowable['Adhoc_Plan_Item_Instance_for_process_and_task']
              ?.processed || !formInputPayload.state ? (
              <FuseLoading />
            ) : (
              <Form
                config={
                  flowable['Adhoc_Plan_Item_Instance_for_process_and_task']
                    .formDef
                }
                payload={formInputPayload}
                onEvent={onEventHandler}
                className={clsx(flwClasses.form, '')}
              />
            )}
          </>
        ),
        title: 'Ad-hoc Process or Task',
        buttons: (
          <>
            <MonarchButton
              onClick={onFormButtonHandler}
              color="primary"
              variant="contained"
              size="small"
              disabled
            >
              {'Ad-hoc'}
            </MonarchButton>
          </>
        ),
        maxwidth: 'sm',
        minHeight: '40rem'
      })
    );
  };
  return (
    <Tooltip title="Ad-hoc process or task">
      <IconButton
        color="primary"
        aria-label="maximize"
        component="span"
        onClick={(ev) => handleOpenDialog(ev)}
        size="small"
        className="pr-16"
      >
        <VscSourceControl className={theme.icons.fontSize} />
      </IconButton>
    </Tooltip>
  );
}
