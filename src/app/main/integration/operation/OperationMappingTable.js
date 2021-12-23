import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import Paper from '@material-ui/core/Paper';
import * as Actions from '../store/actions';
import { hasAccess } from 'app/common/helpers/common-helper';

const OperationMappingTable = ({ inputInforamtion }) => {
  const dispatch = useDispatch();
  const loading = useSelector(
    ({ integration }) => integration.operation.loading
  );
  const contextResources = useSelector(
    (state) => state.common.IAMResource.contextResources
  );
  const onActionClick = (action, data) => {
    dispatch(Actions.mappingPublish(data, action));
  };
  const [state] = useState({
    columns: [
      {
        title: 'App Key',
        field: 'appKey'
      },
      {
        title: 'Process Key',
        field: 'processKey'
      },
      {
        title: 'Task Key',
        field: 'taskKey'
      },
      {
        title: 'Published',
        field: 'isPublish',
        lookup: {
          1: 'Published',
          0: 'Unpublished'
        }
      }
    ]
  });

  return (
    <MaterialTable
      components={{
        Container: (props) => <Paper {...props} elevation={0} />
      }}
      stickyHeader
      title="Mapping"
      isLoading={loading}
      columns={state.columns}
      data={inputInforamtion.mapping}
      editable={{
        onRowAdd:
          hasAccess(
            contextResources,
            'Integration_Service_Operations_Mapping_Actions_Add'
          ) &&
          ((newData) =>
            new Promise((resolve) => {
              dispatch(
                Actions.saveMappingByOperationID(
                  newData,
                  inputInforamtion.operationsId
                )
              );
              resolve();
            })),
        onRowUpdate:
          hasAccess(
            contextResources,
            'Integration_Service_Operations_Mapping_Actions_Edit'
          ) &&
          ((editedData) =>
            new Promise((resolve) => {
              dispatch(
                Actions.updateMappingByOperationID(
                  editedData,
                  inputInforamtion.operationsId
                )
              );
              resolve();
            })),
        onRowDelete:
          hasAccess(
            contextResources,
            'Integration_Service_Operations_Mapping_Actions_Delete'
          ) &&
          ((oldData) =>
            new Promise((resolve) => {
              dispatch(
                Actions.deleteMappingByOperationID(
                  oldData,
                  inputInforamtion.operationsId
                )
              );
              resolve();
            }))
      }}
      actions={[
        hasAccess(
          contextResources,
          'Integration_Service_Operations_Mapping_Actions_Publish'
        ) &&
          ((rowData) =>
            rowData.isPublish === 1
              ? {
                  icon: GetAppIcon,
                  tooltip: 'click me to unpublish',
                  onClick: (event, rowData) =>
                    onActionClick('unpublish', rowData)
                }
              : {
                  icon: PublishIcon,
                  tooltip: 'click me to publish',
                  onClick: (event, rowData) => onActionClick('publish', rowData)
                })
      ]}
      options={{
        actionsColumnIndex: -1,
        headerStyle: {
          fontSize: 12
        },
        cellStyle: {
          fontSize: 12
        },
        showTitle: true,
        padding: 'dense'
      }}
    />
  );
};

export default OperationMappingTable;
