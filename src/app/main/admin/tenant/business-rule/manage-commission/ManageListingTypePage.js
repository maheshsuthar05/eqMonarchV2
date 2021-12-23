import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from '@lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiIconButton-root': {
      '&:hover': {
        background: 'none'
      }
    },
    '& .MuiTableCell-root': {
      fontSize: '0.875rem',
      fontWeight: '500',
      padding: '0px 10px 0px 10px',
      background: theme.palette.background.iconbg,
      color: theme.palette.primary.contrastDark
    },
    '& .MuiIcon-root': {
      fontSize: '1.4rem',
      color: theme.palette.primary.main
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.6rem'
    },
    '& .MuiTypography-caption': {
      fontSize: '0.875rem'
    }
  }
}));

const ManageListingTypePage = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [processing, setProcessing] = React.useState(false);
  const pageSizeOptions = [20, 30, 40, 50];

  const columns = [
    { title: 'Listing type Id', field: 'listingTypeId', editable: 'never' },
    {
      title: 'Listing type options',
      field: 'listingTypeName',
      type: 'string',
      validate: (rowData) =>
        rowData.listingTypeName === ' '
          ? { isValid: false, helperText: 'Name cannot be empty' }
          : true
    }
  ];

  const listingData = useSelector(
    ({ admin }) => admin.tenant_forms.listingTypeData
  );
  const stateAction = useSelector(
    ({ admin }) => admin.tenant_forms.stateAction
  );

  useEffect(() => {
    _.has(listingData, '_embedded')
      ? setProcessing(true)
      : setProcessing(false);
  }, [listingData]);

  return !processing ? (
    <FuseLoading />
  ) : (
    <div className={classes.root}>
      <MaterialTable
        components={{
          Container: (props) => <Paper {...props} elevation={0} />
        }}
        title=""
        columns={columns}
        data={listingData._embedded.listingTypes}
        isLoading={!stateAction}
        icons={{
          Add: (props) => (
            <MonarchButton color="primary" variant="contained" size="small">
              {'Add listing type'}
            </MonarchButton>
          ),
          Search: () => null
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              if (newData.listingTypeName) {
                dispatch(Actions.saveListingTypeStart(newData));
                resolve();
              }
              reject();
            }),
          onRowUpdate: (EditedData) =>
            new Promise((resolve, reject) => {
              dispatch(Actions.editListingTypeStart(EditedData));
              resolve();
            })
        }}
        options={{
          pageSize: 20,
          pageSizeOptions,
          actionsColumnIndex: -1,
          searchFieldVariant: 'outlined',
          searchFieldStyle: {
            height: '38px'
          },
          actionsCellStyle: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
          },
          headerStyle: {
            backgroundColor: theme.buttons.background,
            color: theme.buttons.color
          }
        }}
      />
    </div>
  );
};

export default ManageListingTypePage;
