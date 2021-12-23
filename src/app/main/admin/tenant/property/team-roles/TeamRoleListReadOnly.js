import React from 'react';
import { Form } from '@flowable/forms';
import { useSelector } from 'react-redux';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import clsx from 'clsx';

const TeamRoleListReadOnly = ({ config }) => {
  const flwClasses = useFormStyles();
  const partyRoleTypeList = useSelector(
    ({ admin }) => admin.propertyAdmin.partyRoleTypeList
  );
  const fn = {
    fetchPayload: () => ({ customData: partyRoleTypeList })
  };

  return (
    <Form
      config={config}
      className={clsx(flwClasses.form)}
      payload={fn.fetchPayload()}
      debug={false}
    />
  );
};

export default TeamRoleListReadOnly;
