import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PropertyEditableHeader = () => {
  const dispatch = useDispatch();
  const flowable = useSelector(({ flowable }) => flowable.jsonForm);

  useEffect(() => {
    dispatch({ type: 'FLOWABLE_DEFINITION_BY_JSON_CLEAR' });
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'property',
      fileNames: ['Property_Header_Edit_Form']
    });
  }, [dispatch]);

  const property = useSelector((state) => state.property.get);

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        break;
      default:
        return true;
    }
  };

  return (
    <div className="p-0">
      {!flowable.isFormProcessed && !property.inProgress ? (
        <FuseLoading />
      ) : (
        <Form
          onEvent={onEventHandler}
          payload={property}
          config={flowable.formDefinition[0].json}
        />
      )}
    </div>
  );
};

export default PropertyEditableHeader;
