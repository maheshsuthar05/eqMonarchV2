import React, { useState } from 'react';
import MaterialTable from 'material-table';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'app/main/admin/store/actions/decision-rule.actions';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import {
  COMPONENT_TYPE,
  convertTableDataToExpression,
  injectTableDataToPlayload,
  getTypeText
} from '../util/decision-rule.util.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import { closeModal } from 'app/store/actions';
import { Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTableCell-root': {
      fontSize: '0.875rem',
      fontWeight: '500',
    },
    '& .MuiIcon-root': {
      fontSize: '1.4rem',
      color: theme.palette.primary.main
    },
  },
}));

const RuleStaticModification = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(({ auth }) => auth.user);

  const rowData = useSelector((state) => state.admin.rule.rowData);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const [state] = useState({
    columns: [
      {
        title: 'Field',
        field: 'firstLabel',
        width: '250px',
        editable: 'never'
      },
      {
        title: 'Operator',
        field: 'operator',
        editComponent: (props) => (
          <Select
            labelId="operator-label"
            id="operator"
            onChange={(e) => props.onChange(e.target.value)}
            value={props.value}
          >
            {props.rowData.operatorList.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        )
      },
      {
        title: 'Field',
        field: 'secondLabel',
        editable: 'never',
        width: '300px'
      },
      {
        title: 'Value',
        field: 'value',
        render: (rowData) => (
          <div>
            {Array.isArray(rowData.valueLabel)
              ? rowData.valueLabel.join(', ')
              : rowData.valueLabel}{' '}
            {getTypeText(rowData.valueType)}
          </div>
        ),
        editComponent: (props) => {
          if (props && props.rowData) {
            if (
              props.rowData.valueType === COMPONENT_TYPE.number ||
              props.rowData.valueType === COMPONENT_TYPE.days ||
              props.rowData.valueType === COMPONENT_TYPE.percentage
            ) {
              return (
                <>
                  <TextField
                    id="standard-number"
                    type="number"
                    onChange={(e) => props.onChange(e.target.value)}
                    value={props.value}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {getTypeText(props.rowData.valueType)}
                        </InputAdornment>
                      )
                    }}
                  />{' '}
                </>
              );
            } else if (
              props.rowData.valueType === COMPONENT_TYPE.multi ||
              props.rowData.valueType === COMPONENT_TYPE.anyOf
            ) {
              return (
                <Select
                  labelId="value-select-label"
                  id="value-select"
                  multiple
                  style={{ maxWidth: 600 }}
                  onChange={(e) => props.onChange(e.target.value)}
                  value={props.value}
                >
                  {props.rowData.valueList.map((item) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
                </Select>
              );
            } else if (props.rowData.valueType === COMPONENT_TYPE.variable) {
              return <TextField disabled />;
            }

            return (
              <TextField
                id="standard-number"
                onChange={(e) => props.onChange(e.target.value)}
                value={props.value}
              />
            );
          }
        }
      }
    ]
  });

  return (
    <>
    <div className={classes.root}>
      <MaterialTable
        title=""
        columns={state.columns}
        icons={{
          Search: () => null
        }}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />
        }}
        data={rowData.expressions}
        options={{
          paging: false,
          actionsColumnIndex: -1
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              const dataUpdate = [...rowData.expressions];
              dataUpdate[oldData.tableData.id] = newData;
              dataUpdate[
                oldData.tableData.id
              ].dmnExpression = convertTableDataToExpression(newData);
              const updatedPlayloadInXML = injectTableDataToPlayload(
                dataUpdate,
                rowData.originalXML
              );
              dispatch(
                Actions.updateDecisionTable(
                  user.tenantCode,
                  rowData.key,
                  updatedPlayloadInXML
                )
              );
              handleClose();
              resolve();
            }),
          onBulkUpdate: (changes) =>
            new Promise((resolve, reject) => {
              const dataUpdate = [...rowData.expressions];
              for (const item in changes) {
                dataUpdate[item] = changes[item].newData;
                dataUpdate[item].dmnExpression = convertTableDataToExpression(
                  changes[item].newData
                );
                const updatedPlayloadInXML = injectTableDataToPlayload(
                  dataUpdate,
                  rowData.originalXML
                );
                dispatch(
                  Actions.updateDecisionTable(
                    user.tenantCode,
                    rowData.key,
                    updatedPlayloadInXML
                  )
                );
                handleClose();
              }
              resolve();
            })
        }}
      />
      </div>
    </>
  );
};

export default withRouter(RuleStaticModification);
