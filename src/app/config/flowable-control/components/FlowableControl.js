import FuseLoading from '@fuse/core/FuseLoading';
import React, { useState } from 'react';
import { flowableControlApiConfig as controlApi } from 'app/config/api';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  flwControlIFrame: {
    width: '100%',
    minHeight: '500px'
  }
}));
const FlowableControl = (props) => {
  const { processDefinition } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const resetLoading = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <FuseLoading />}
      <iframe
        title="Flowable Control"
        src={controlApi.api.view_process_instance(processDefinition?.id)}
        className={classes.flwControlIFrame}
        onLoad={resetLoading}
      ></iframe>
    </>
  );
};

export default FlowableControl;
