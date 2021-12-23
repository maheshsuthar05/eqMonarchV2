import React, { useEffect, useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import OperationHeader from './OperationHeader';
import Paper from '@material-ui/core/Paper';
import * as Actions from '../store/actions/operation.actions';
import * as actionType from '../store/actionTypes';
import * as PrefectAction from '../store/actions/service.actions';
import OperationDetails from './OperationDetails';
import { hasAccess } from 'app/common/helpers/common-helper';
import { openModal } from 'app/store/actions';
import ServiceTestPage from '../service-test/ServiceTestPage';
import Tooltip from '@material-ui/core/Tooltip';
import { IoAddCircleOutline } from 'react-icons/io5';

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
    '& .MuiTab-root': {
      fontSize: '0.875rem'
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
    '& .MuiBox-root div[class*="MTableToolbar-root-"]': {
      position: 'static',
      display: 'flex'
    },
    '& .materialTableToolbar': {
      position: 'fixed',
      top: '-2px',
      right: '32px',
      display: '-webkit-inline-box'
    }
  }
}));

const OperationTable = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();
  const serviceInfo = useSelector(
    ({ integration }) => integration.services.serviceByID.data
  );
  const mappingInformation = useSelector(
    ({ integration }) => integration.operation.mapping
  );
  const loading = useSelector(
    ({ integration }) => integration.operation.loading
  );
  const operation = useSelector(
    ({ integration }) => integration.operation.data
  );
  const contextResources = useSelector(
    (state) => state.common.IAMResource.contextResources
  );

  useEffect(() => {
    dispatch(Actions.getOperations(routeParams));
    dispatch({ type: actionType.GET_ALL_MAPPING });
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (loading) {
      dispatch(PrefectAction.getServiceByID(routeParams));
    }
  }, [dispatch, loading, routeParams]);
  let operationData;
  if (operation.operations !== undefined) {
    if (operation.operations.length > 0) {
      operationData = operation.operations.map((operationResponse) => {
        let getMapping = mappingInformation
          .map((mappingResponse) => {
            if (
              mappingResponse.operationId === operationResponse.operationsId
            ) {
              return mappingResponse;
            }
            return false;
          })
          .filter((res) => res);
        return { ...operationResponse, mapping: [...getMapping] };
      });
    }
  }
  const [state] = useState({
    columns: [
      {
        title: 'Name',
        field: 'operationName'
      },
      {
        title: 'Key',
        field: 'operationKey'
      },
      {
        title: 'Method',
        field: 'method',
        lookup: {
          GET: 'GET',
          POST: 'POST',
          PUT: 'PUT',
          PATCH: 'PATCH',
          DELETE: 'DELETE'
        }
      },
      {
        title: 'Description',
        field: 'description'
      },
      {
        title: 'ContentType',
        field: 'contentType',
        lookup: {
          'application/json': 'application/json',
          'application/xml': 'application/xml',
          'text/xml': 'text/xml',
          'text/plain': 'text/plain',
          'text/javascript': 'text/javascript'
        }
      },
      {
        title: 'URI',
        field: 'url'
      }
    ]
  });
  const handleClickOpen = (event, data) => {
    event.preventDefault();
    dispatch(Actions.getApiServices(data));
    dispatch(
      openModal({
        children: <ServiceTestPage />,
        title: <>{data.operationName}</>,
        maxwidth: 'xl'
      })
    );
  };

  return (
    <div className={classes.root}>
      <OperationHeader serviceName={serviceInfo?.serviceName} />
      {/* <FuseAnimate animation="transition.slideLeftIn" delay={300}>
        <Typography className="text-16 mx-16" variant="h6" color="secondary">
          {serviceInfo?.serviceName}
        </Typography>
      </FuseAnimate> */}
      <MaterialTable
        className={classes.operationSection}
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
        data={operationData}
        icons={{
          Add: (props) => (
            <Tooltip title="Add Operation">
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
            hasAccess(
              contextResources,
              'Integration_Service_Operations_Actions_Add'
            ) &&
            ((newData) =>
              new Promise((resolve) => {
                dispatch(Actions.addNewOperation(newData, routeParams));
                resolve();
              })),
          onRowUpdate:
            hasAccess(
              contextResources,
              'Integration_Service_Operations_Actions_Edit'
            ) &&
            ((editedData) =>
              new Promise((resolve) => {
                dispatch(Actions.editOperation(editedData, routeParams));
                resolve();
              })),
          onRowDelete:
            hasAccess(
              contextResources,
              'Integration_Service_Operations_Actions_Delete'
            ) &&
            ((oldData) =>
              new Promise((resolve) => {
                dispatch(Actions.deleteOperation(oldData, routeParams));
                resolve();
              }))
        }}
        options={{
          pageSize: 20,
          searchFieldVariant: 'outlined',
          searchFieldStyle: {
            width: '125%',
            height: '32px',
            marginLeft: '-30%'
          },
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: 'touch_app',
            tooltip: 'Test',
            onClick: (event, rowData) => handleClickOpen(event, rowData)
          }
        ]}
        detailPanel={(rowData) => {
          return <OperationDetails data={rowData} />;
        }}
      />
    </div>
  );
};

export default OperationTable;
