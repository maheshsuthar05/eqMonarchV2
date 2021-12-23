import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@flowable/forms';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import { updateModal } from 'app/store/actions';
import FuseLoading from '@fuse/core/FuseLoading';
import { DecisionRuleApiConfig } from 'app/config/api';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { IconButton, Tooltip, useTheme } from '@material-ui/core';
import { FiEdit } from 'react-icons/fi';
import { closeModal, openModal } from 'app/store/actions';
import { uniqueIdentifier } from 'app/common/helpers/common-helper';
import { useFormStyles } from '@monarch/Flowable/useStyles';

export default function AddWorkstationConfig(props) {
  const { caseId, caseData, FLOWABLE_CASE_KEY } = props;
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const theme = useTheme();
  const [formPayload, setFormPayload] = useState({});
  const flowable = useSelector(({ flowable }) => flowable.formDefinition);
  const user = useSelector(({ auth }) => auth.user);

  const caseDef = useSelector((state) => state?.admin?.tenant_forms?.caseDatas);
  const processId = useSelector((state) => state.admin.tenant_forms.processId);

  const formPayloadRef = useRef({});
  formPayloadRef.current = formPayload;

  const isEdit = caseData ? true : false;

  useEffect(() => {
    if (caseId) {
      dispatch(Actions.getForm(caseId));
    }
  }, [dispatch, caseId]);

  const additionalData = {
    additionalData: {
      url: DecisionRuleApiConfig.api.getInvestorGroup
    }
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        dispatch(updateModal(api.formValid()));
        if (api.formValid()) {
          const payload = api.payload.get();
          setFormPayload(payload);
        }
        break;
      default:
        break;
    }
  };

  const onFormButtonHandler = () => {
    if (!formPayloadRef.current.hasOwnProperty('formSettingATSId') && !isEdit) {
      formPayloadRef.current['formSettingATSId'] = uniqueIdentifier();
    }
    formPayloadRef.current['lastUpdatedOn'] = new Date().toLocaleString();
    formPayloadRef.current['userEmail'] = user.data.email;
    const variables = [];

    Object.keys(formPayloadRef.current).map((item) => {
      const type = typeof formPayloadRef.current[item];
      variables.push({
        name: item,
        type: type === 'object' ? 'json' : type,
        value: formPayloadRef.current[item]
      });
      return item;
    });

    let targetPayload = {
      processDefinitionId: processId,
      businessKey: formPayload.formSettingATSId,
      variables: variables
    };

    const uniqueSearchPayload = Actions.uniqueSearchVariable(
      FLOWABLE_CASE_KEY,
      variables,
      'formSettingATSId'
    );

    if (isEdit) {
      dispatch(
        Actions.update(
          user.tenantCode,
          uniqueSearchPayload,
          targetPayload.variables,
          FLOWABLE_CASE_KEY,
          caseDef[FLOWABLE_CASE_KEY]?.caseData.data[0].id
        )
      );
    } else {
      targetPayload.caseDefinitionId = caseId;
      dispatch(
        Actions.save(
          user.tenantCode,
          uniqueSearchPayload,
          targetPayload,
          FLOWABLE_CASE_KEY
        )
      );
    }
    dispatch(closeModal());
  };

  const handleUpdateWorkConfigModal = () => {
    dispatch(
      openModal({
        children: !flowable['workstationConfigurationATS']?.processed ? (
          <FuseLoading />
        ) : (
          <div className="bg-white">
            <Form
              config={flowable['workstationConfigurationATS']?.formDef}
              payload={caseData}
              additionalData={additionalData}
              onEvent={onEventHandler}
              className={flwClasses.form}
            />
          </div>
        ),
        title: 'Update Work Station Configuration',
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
              {'Send'}
            </MonarchButton>
          </>
        )
      })
    );
  };

  return (
    <Tooltip title="Update Work Station Configuration">
      <IconButton
        color="primary"
        aria-label="maximize"
        component="span"
        onClick={() => handleUpdateWorkConfigModal()}
        size="small"
      >
        <FiEdit className={theme.icons.fontSize} />
      </IconButton>
    </Tooltip>
  );
}
