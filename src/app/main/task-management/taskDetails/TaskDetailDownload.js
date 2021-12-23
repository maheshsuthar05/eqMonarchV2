import * as Actions from 'app/common/store/actionTypes';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrDocumentDownload } from 'react-icons/gr';
import { generateFileStart } from 'app/common/store/actions';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';

const TaskDetailDownload = (props) => {
  const dispatch = useDispatch();

  const showDownload = useSelector(
    ({ common }) => common.downloadFile.templateFlag
  );

  const payload = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.details.variables
  );

  const inProgress = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.details.formStatus
  );
  useEffect(() => {
    if (inProgress) {
      dispatch({
        type: Actions.CHECK_TEMPLATE_START,
        templateDetails: {
          templateKey: props.taskDetails.formKey
        }
      });
    }
  }, [dispatch, inProgress, props.taskDetails.formKey]);

  const handleButtonClick = () => {
      dispatch(generateFileStart(payload));
  };

  return (
    <>
      {inProgress && showDownload && (
        <Tooltip title="Download">
          <IconButton
            color="primary"
            aria-label="maximize"
            component="span"
            onClick={handleButtonClick}
            size="small"
            tool
          >
            <GrDocumentDownload className="icon-Color pr-8 cursor-pointer text-3xl" />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default TaskDetailDownload;
