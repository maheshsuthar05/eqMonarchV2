import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {
  downloadFileStart,
  generateFileStart,
  setFileUrlStart
} from 'app/common/store/actions';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    height: '37px',
    margin: '1%'
  },
  wrapper: {
    position: 'relative'
  },
  buttonSuccess: {},
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  button: {
    backgroundColor: '#ffffff !important',
    color: '#000000',
    fontSize: '10px !important',
    borderRadius: '15px',
    boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
    padding: '6px 16px',
    display: 'flex',
    textTransform: 'capitalize',
    '&:hover': {
      background: '#0c1a82 !important',
      color: '#ffffff'
    }
  }
}));

const DownloadFile = (props) => {
  const { payload, downloadFileUrl } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  const downloadStarted = useSelector(
    ({ common }) => common.downloadFile.downloadFlag
  );

  const fileGenerated = useSelector(
    ({ common }) => common.downloadFile.fileGenerated
  );

  const fileUrl = useSelector(({ common }) => common.downloadFile.fileUrl);

  useEffect(() => {
    if (fileGenerated && loading) {
      dispatch(downloadFileStart(fileUrl));
    }
  }, [fileGenerated, dispatch, loading, fileUrl]);

  useEffect(() => {
    if (!downloadStarted && loading) {
      setSuccess(true);
      setLoading(false);
    }
  }, [downloadStarted, loading]);

  useEffect(() => {
    if (downloadFileUrl !== undefined) {
      dispatch(setFileUrlStart(downloadFileUrl));
    }
  }, [dispatch, downloadFileUrl]);

  const handleButtonClick = () => {
    if (downloadFileUrl === undefined) {
      dispatch(generateFileStart(payload));
    }
    setSuccess(false);
    setLoading(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={loading}
          onClick={handleButtonClick}
          size="small"
        >
          Download
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
};

export default DownloadFile;
