import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import * as Actions from '../store/actions';
import { hasAccess } from 'app/common/helpers/common-helper';

const OperationInputTable = ({ inputInforamtion }) => {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const loading = useSelector(
    ({ integration }) => integration.operation.loading
  );
  const contextResources = useSelector(
    (state) => state.common.IAMResource.contextResources
  );

  const [state] = useState({
    columns: [
      {
        title: 'Name',
        field: 'name'
      },
      {
        title: 'Value',
        field: 'value'
      },
      {
        title: 'Type',
        field: 'type',
        lookup: {
          Header: 'Header',
          String: 'String',
          Date: 'Date',
          Boolean: 'Boolean',
          Integer: 'Integer',
          Long: 'Long',
          Double: 'Double',
          JSON: 'JSON',
          Array: 'Array',
          Query: 'Query',
          Template: 'Template'
        }
      },
      {
        title: 'Required',
        field: 'required',

        lookup: { true: 'true', false: 'false' }
      },
      {
        title: 'Param Name',
        field: 'parameterName'
      }
    ]
  });

  return (
    <MaterialTable
      components={{
        Container: (props) => <Paper {...props} elevation={0} />
      }}
      stickyHeader
      title="Input"
      isLoading={loading}
      columns={state.columns}
      data={inputInforamtion.input}
      editable={{
        onRowAdd:
          hasAccess(
            contextResources,
            'Integration_Service_Operations_Input_Actions_Add'
          ) &&
          ((newData) =>
            new Promise((resolve) => {
              dispatch(
                Actions.updateOperationalDetails(
                  inputInforamtion.input,
                  newData,
                  inputInforamtion.operationsId,
                  'Add',
                  'input',
                  routeParams
                )
              );
              resolve();
            })),
        onRowUpdate:
          hasAccess(
            contextResources,
            'Integration_Service_Operations_Input_Actions_Edit'
          ) &&
          ((editedData) =>
            new Promise((resolve) => {
              dispatch(
                Actions.updateOperationalDetails(
                  inputInforamtion.input,
                  editedData,
                  inputInforamtion.operationsId,
                  'Update',
                  'input',
                  routeParams
                )
              );
              resolve();
            })),
        onRowDelete:
          hasAccess(
            contextResources,
            'Integration_Service_Operations_Input_Actions_Delete'
          ) &&
          ((oldData) =>
            new Promise((resolve) => {
              dispatch(
                Actions.updateOperationalDetails(
                  inputInforamtion.input,
                  oldData,
                  inputInforamtion.operationsId,
                  'Delete',
                  'input',
                  routeParams
                )
              );
              resolve();
            }))
      }}
      options={{
        actionsColumnIndex: -1,
        headerStyle: {
          fontSize: 12
        },
        cellStyle: {
          fontSize: 12
        },
        padding: 'dense'
      }}
    />
  );
};

export default OperationInputTable;
