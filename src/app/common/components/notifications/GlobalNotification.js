import React, { useCallback, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useSelector, useDispatch } from 'react-redux';

const GlobalNotification = () => {
  const dispatch = useDispatch();

  const isError = useSelector((state) => state.apiCallInProgress.error.isError);
  const message = useSelector((state) => state.apiCallInProgress.error.message);
  const isSuccess = useSelector(
    (state) => state.apiCallInProgress.success.isSuccess
  );
  const successMessage = useSelector(
    (state) => state.apiCallInProgress.success.message
  );

  const { addToast } = useToasts();

  const resetMessages = useCallback(
    (action, index) => {
      dispatch({ type: 'REST_API_MESSAGES', action: action, index: index });
    },
    [dispatch]
  );

  const handleShowError = useCallback(
    (error) => {
      error.map((message, index) => {
        addToast(message, {
          appearance: 'error',
          onDismiss: resetMessages('error', index)
        });
        return true;
      });
    },
    [addToast, resetMessages]
  );

  const handleShowSuccess = useCallback(
    (success) => {
      success.map((message, index) =>
        addToast(message, {
          appearance: 'success',
          onDismiss: resetMessages('success', index)
        })
      );
    },
    [addToast, resetMessages]
  );

  useEffect(() => {
    if (isError) {
      handleShowError(message);
    }
    if (isSuccess) {
      handleShowSuccess(successMessage);
    }
  }, [
    isError,
    isSuccess,
    handleShowError,
    handleShowSuccess,
    message,
    successMessage
  ]);

  return <></>;
};

export default GlobalNotification;
