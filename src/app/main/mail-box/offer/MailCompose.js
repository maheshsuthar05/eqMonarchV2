import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import useIsMounted from 'app/common/hooks/useIsMounted';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actionTypes';

const MailCompose = (props) => {
  const { source, payload, additionalData, eventHandlers } = props;
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const stateAction = useSelector(({ mailApp }) => mailApp.compose.stateAction);
  const formDefinition = useSelector(
    ({ mailApp }) => mailApp.compose.formDefinition
  );

  useEffect(() => {
    if (isMounted.current) {
      dispatch({
        type: Actions.GET_MAIL_COMPOSE_FORM,
        source: source
      });
    }
  }, [isMounted, dispatch, source]);

  const onEventHandler = (eventName, config, state, api) => {
    eventHandlers.onEventHandler(eventName, config, state, api);
    return true;
  };

  return (
    <div className="p-12">
      <>
        {!stateAction ? (
          <FuseLoading />
        ) : (
          <>
            <Form
              debug={false}
              onEvent={onEventHandler}
              config={formDefinition}
              additionalData={additionalData}
              payload={payload}
              outcomesElement={[]}
              key={'frmSendWorkSheet'}
            />
          </>
        )}
      </>
    </div>
  );
};
export default MailCompose;
