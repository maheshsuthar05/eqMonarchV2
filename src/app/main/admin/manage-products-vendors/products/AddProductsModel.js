import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import * as Actions from './../../store/actionTypes';
import { Form } from '@flowable/forms';
import { closeModal, openModal, updateModal } from 'app/store/actions';
import { IconButton, Tooltip } from '@material-ui/core';
import { IoAddCircleOutline } from 'react-icons/io5';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import clsx from 'clsx';

const AddProductModel = () => {
  const flwClasses = useFormStyles();
  const [formPayload, setFormPayload] = useState({});
  const formPayloadRef = useRef({});
  formPayloadRef.current = formPayload;

  const dispatch = useDispatch();
  const AddFormDefinition = useSelector(
    ({ admin }) => admin.manageProductVendor
  );

  useEffect(() => {
    dispatch({ type: Actions.FETCH_MANAGE_PRODUCT_FORM });
  }, [dispatch]);

  function handleOpenDialog() {
    dispatch(
      openModal({
        children: !AddFormDefinition.stateAction ? (
          <FuseLoading />
        ) : (
          <div className="bg-white">
            <Form
              className={clsx(flwClasses.form)}
              config={AddFormDefinition.formDefinition}
              onEvent={onEventHandler}
            />
          </div>
        ),
        title: 'Add Products',
        maxwidth: 'sm',
        buttons: (
          <>
            <MonarchButton
              onClick={onFormButtonHandler}
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

  const onFormButtonHandler = () => {
    dispatch({
      type: Actions.POST_MANAGE_PRODUCT_DATA,
      payload: formPayloadRef.current,
      fileNames: ['manageProductApprovedList']
    });
    dispatch(closeModal());
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        dispatch(updateModal(api.formValid()));
        if (api.formValid()) {
          setFormPayload(api.payload.get());
        }
        break;
      default:
        break;
    }
    return true;
  };

  return (
    <Tooltip title="Add Product">
      <IconButton
        color="primary"
        aria-label="maximize"
        component="span"
        onClick={() => handleOpenDialog({})}
        size="small"
      >
        <IoAddCircleOutline />
      </IconButton>
    </Tooltip>
  );
};

export default AddProductModel;
