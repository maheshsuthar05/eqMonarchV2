import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';

export default function ShowMessage(props) {
  const ShowMessagePopup = (props) => {
    return (
      <Snackbar
        style={{ paddingTop: '80px' }}
        open={props.show}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={`${props?.message}`}
      ></Snackbar>
    );
  };
  return <ShowMessagePopup {...props} />;
}
