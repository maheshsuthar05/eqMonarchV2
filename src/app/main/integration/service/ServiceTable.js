import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from 'material-table';
import { withRouter } from 'react-router-dom';
import { Form } from '@flowable/forms';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as Actions from '../store/actions';
import * as actionType from '../store/actionTypes';
import { hasAccess } from 'app/common/helpers/common-helper';
import Tooltip from '@material-ui/core/Tooltip';
import { IoAddCircleOutline } from 'react-icons/io5';
import { RiFileUploadLine } from 'react-icons/ri';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTableCell-root': {
      fontSize: '0.875rem',
      fontWeight: '500',
      padding: '0 0 0 5px',
      background: 'none',
      color: theme.palette.primary.widgetTitleColor
    },
    '& .MuiTableHead-root': {
      background: `${theme.palette.background.widgetTitleBg}!important`,
      color: theme.palette.primary.widgetTitleColor,
      borderTopLeftRadius: '3px',
      borderTopRightRadius: '3px'
    },
    '& .MuiIcon-root': {
      fontSize: '1.4rem',
      color: theme.palette.primary.main
    },
    '& .MuiIconButton-root': {
      padding: '2px'
    },
    '& .MuiTable-root': {
      width: '99%',
      margin: '10px auto'
    },
    '& .MuiTableSortLabel-root:hover': {
      color: theme.palette.primary.widgetTitleColor
    },
    '& .MuiTableCell-footer': {
      color: '#000000 !important'
    },
    '& .MuiTypography-caption': {
      fontSize: 'inherit'
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.4rem'
    },
    '& .MuiFormControl-root': {
      '& button:nth-child(1)': {
        right: '0'
      }
    },
    '& .materialTableToolbar': {
      position: 'fixed',
      top: '-2px',
      right: '100px',
      display: '-webkit-inline-box',
      '& button:nth-child(1)': {
        right: '-30px',
        top: '-2px'
      },
      '& button:nth-child(2)': {
        position: 'fixed',
        top: '10px',
        right: '42px'
      }
    }
  }
}));

const ServiceTable = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const pageSizeOptions = [10, 15, 20, 30, 40, 50];
  const service = useSelector(({ integration }) => integration.services.data);
  const loading = useSelector(
    ({ integration }) => integration.services.loading
  );
  const serviceUploadFormData = useSelector(
    ({ integration }) => integration.services.serviceUploadFormData
  );
  const pageInfo = useSelector(({ integration }) => integration.services.page);

  const [page] = useState(pageInfo ? pageInfo.number : 0);
  const [rowsPerPage] = useState(pageInfo ? pageInfo.size : 5);

  const [openModal, setOpenModal] = useState(false);
  const contextResources = useSelector(
    (state) => state.common.IAMResource.contextResources
  );

  useEffect(() => {
    dispatch(Actions.getServices(page, rowsPerPage));
    dispatch({ type: actionType.GET_SERVICE_UPLOAD_FORM });
  }, [dispatch, page, rowsPerPage]);

  const [state] = useState({
    columns: [
      {
        title: 'Key',
        field: 'serviceKey'
      },
      {
        title: 'Name',
        field: 'serviceName'
      },
      {
        title: 'Type',
        field: 'type',
        lookup: {
          SOAP: 'SOAP',
          REST: 'REST',
          KAFKA: 'KAFKA',
          FTP: 'FTP',
          SFTP: 'SFTP'
        }
      },
      {
        title: 'Category',
        field: 'category',
        lookup: {
          Internal: 'Internal',
          External: 'External'
        }
      },
      {
        title: 'Base Url',
        field: 'baseUrl',
        render: () => null
      }
    ]
  });

  function handleClick(event, data) {
    props.history.push(`/integration/service/${data.serviceId}/operations`);
  }

  const dialogClose = () => {
    setOpenModal(false);
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Button.click':
        if (config.extraSettings.text === 'Upload') {
          if (api.payload.get().hasOwnProperty('serviceData')) {
            let payload = api.payload.get().serviceData[0].fileData;
            dispatch(Actions.getServiceUpload(payload));
            setOpenModal(false);
          }
        }
        break;
      default:
        break;
    }
    return true;
  };
  return (
    <div className={classes.root}>
      <MaterialTable
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
          Toolbar: (props) => (
            <div className="materialTableToolbar">
              <MTableToolbar {...props} />
            </div>
          )
        }}
        title=""
        isLoading={loading}
        columns={state.columns}
        data={service.services}
        onRowClick={(event, rowData) => handleClick(event, rowData)}
        icons={{
          Add: (props) => (
            <Tooltip title="Add Service">
              <IconButton
                color="primary"
                aria-label="maximize"
                component="span"
                size="small"
              >
                <IoAddCircleOutline />
              </IconButton>
            </Tooltip>
          ),
          Search: () => null
        }}
        editable={{
          onRowAdd:
            hasAccess(contextResources, 'Integration_Services_Actions_Add') &&
            ((newData) =>
              new Promise((resolve) => {
                dispatch(Actions.addNewService(newData));
                resolve();
              })),
          onRowUpdate:
            hasAccess(contextResources, 'Integration_Services_Actions_Edit') &&
            ((editedData) =>
              new Promise((resolve) => {
                dispatch(Actions.editService(editedData));
                resolve();
              })),
          onRowDelete:
            hasAccess(
              contextResources,
              'Integration_Services_Actions_Delete'
            ) &&
            ((oldData) =>
              new Promise((resolve) => {
                dispatch(Actions.deleteServices(oldData));
                resolve();
              }))
        }}
        actions={[
          {
            icon: 'save_alt',
            tooltip: 'Download',
            onClick: (event, rowData) => {
              new Promise((resolve) => {
                dispatch(Actions.getServiceDownload(rowData.serviceId));
                resolve();
              });
            }
          },
          {
            icon: () => (
              <Tooltip title="Upload Service">
                <IconButton
                  color="primary"
                  aria-label="maximize"
                  component="span"
                  onClick={(event, rowData) => setOpenModal(true)}
                  size="small"
                >
                  <RiFileUploadLine className={theme.icons.fontSize} />
                </IconButton>
              </Tooltip>
            ),
            isFreeAction: true,
            hidden: hasAccess(
              contextResources,
              'Integration_Services_Actions_Upload'
            )
              ? false
              : true
          }
        ]}
        options={{
          pageSize: 20,
          pageSizeOptions,
          actionsColumnIndex: -1,
          searchFieldVariant: 'outlined',
          searchFieldStyle: {
            width: '125%',
            height: '32px',
            marginLeft: '-30%'
          },
          actionsCellStyle: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginBottom: '-1px'
          }
        }}
      />
      <Dialog
        onClose={dialogClose}
        aria-labelledby="customized-dialog-title"
        fullWidth
        open={openModal}
      >
        <DialogTitle id="customized-dialog-title">
          Upload Services
          <IconButton
            aria-label="close"
            style={{ float: 'right' }}
            onClick={dialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Form onEvent={onEventHandler} config={serviceUploadFormData} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default withRouter(ServiceTable);
