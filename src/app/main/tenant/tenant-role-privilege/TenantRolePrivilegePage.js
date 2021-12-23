import { useForm } from '@fuse/hooks';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import OutlinedDiv from 'app/common/components/OutlinedDiv';
import ShowMessage from 'app/common/components/ShowMessage';
import { saveTenantRolePrivilegeStart } from 'app/main/tenant/store/actions';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import { closeModal } from 'app/store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root, .MuiInput-root': {
      width: '100%'
    },
    '& .MuiOutlinedInput-input': {
      padding: '15px'
    },
    '& .MuiTableCell-root': {
      fontSize: 'inherit'
    },
    '& .MuiTypography-root': {
      fontSize: 'inherit'
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.4rem'
    },
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: theme.palette.primary.main
    },
    '& .MuiPaper-root': {
      boxShadow: 'none',
      borderRadius: '4px !important',
      border: '0px',
      background: theme.palette.background.widgetTitleBg
    },
    '& .MuiCardHeader-root .MuiCheckbox-root': {
      color: theme.palette.primary.widgetTitleColor
    },
    '& .MuiCardHeader-content .MuiTypography-root': {
      color: theme.palette.primary.widgetTitleColor
    }
  },
  cardHeader: {
    padding: theme.spacing(0.25, 0.5),
    color: theme.palette.primary.widgetTitleColor
  },
  cardAvatar: {
    marginRight: '4px'
  },
  listItemIcon: {
    minWidth: '44px'
  },
  list: {
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing(0.5, 0)
  },
  listItem: {
    padding: theme.spacing(0.25, 0.5),
    borderBottom: '1px solid #e5e5e5'
  },
  privilegeWidth: {
    width: '44%'
  }
}));

const defaultFormState = {
  name: '',
  description: '',
  resources: [],
  listOfGroups: [],
  listOfUsers: [],
  listOfUsersAndGroups: [],
  actionValues: {}
};

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TenantRolePrivilegePage(props) {
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm({ ...defaultFormState });
  const classes = useStyles();
  const theme = useTheme();
  const [checked, setChecked] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const leftChecked = intersection(checked, availableItems);
  const rightChecked = intersection(checked, selectedItems);
  const [isValidRoleForm, setIsValidRoleForm] = useState(true);

  const roleData = useSelector(
    (state) => state.tenant.rolePrivilege.dataForEdit.data
  );
  const saveInProgress = useSelector(
    (state) => state.tenant.rolePrivilege.saveInProgress
  );
  const [readOnly] = useState(() => {
    return roleData?.action === 'EDITROLE';
  });

  const initDialog = useCallback(() => {
    if (roleData.action === 'EDITROLE') {
      setAvailableItems([...roleData?.resources?.available]);
      setSelectedItems([...roleData?.resources?.selected]);
      setForm({
        ...roleData.role
      });
    } else {
      setAvailableItems([...roleData?.resources?.available]);
      setSelectedItems([]);
      setForm({
        name: '',
        description: '',
        resources: [],
        listOfGroups: [],
        listOfUsers: [],
        listOfUsersAndGroups: [],
        actionValues: { GRANT: true, GET: true }
      });
    }
  }, [
    roleData.action,
    roleData.resources.available,
    roleData.resources.selected,
    roleData.role,
    setForm
  ]);

  useEffect(() => {
    initDialog();
  }, [roleData, initDialog]);

  useEffect(() => {
    dispatch({
      type: 'GET_FLOWABLE_FORM_DATA_START',
      payload: form
    });
  }, [dispatch, form]);

  useEffect(() => {
    checkValidRoleForm(form);
    form.resources = selectedItems;
    checkValidRoleForm(form);
  }, [selectedItems, form]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setSelectedItems(selectedItems.concat(leftChecked));
    setAvailableItems(not(availableItems, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setAvailableItems(availableItems.concat(rightChecked));
    setSelectedItems(not(selectedItems, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card variant="elevation">
      <CardHeader
        classes={{ root: classes.cardHeader, avatar: classes.cardAvatar }}
        avatar={
          <Checkbox
            className={theme.icons.fontSize}
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list" required>
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
              className={classes.listItem}
            >
              <Tooltip
                title={value}
                aria-label="add"
                placement="bottom-start"
                style={{ padding: '0px' }}
              >
                <span style={{ padding: '0px' }}>
                  <ListItemIcon className={classes.listItemIcon}>
                    <Checkbox
                      className={theme.icons.fontSize}
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                </span>
              </Tooltip>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  const checkValidRoleForm = (roleFormData) => {
    let isValid = false;
    if (
      roleFormData.description &&
      roleFormData.name &&
      roleFormData.resources &&
      roleFormData.description.trim().length &&
      roleFormData.name.trim().length &&
      roleFormData.resources.length
    ) {
      isValid = true;
    }
    setIsValidRoleForm(isValid);
  };

  const onRoleSaveClick = (event) => {
    const tempTenantCode = '';
    const data = {
      payload: form,
      action: readOnly ? 'edit' : 'new',
      tempTenantCode: tempTenantCode
    };
    dispatch(saveTenantRolePrivilegeStart(data));
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <ShowMessage show={saveInProgress} message="Please wait..." />
      <div className={clsx(classes.root, 'px-4 sm:px-4')}>
        <FormControl className="mt-8 mb-16" required fullWidth>
          <TextField
            id="my-input"
            label="Name"
            autoFocus
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            variant="outlined"
            InputProps={{
              readOnly: readOnly
            }}
          />
        </FormControl>
        <FormControl className="mt-8 mb-16" required fullWidth>
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </FormControl>
        <FormControl className="mt-8 mb-16" required fullWidth>
          <OutlinedDiv label="Privileges *">
            <Grid
              variant="outlined"
              container
              spacing={2}
              justify="center"
              alignItems="center"
              className="w-full"
            >
              <Grid item className={classes.privilegeWidth}>
                {customList('Choices', availableItems)}
              </Grid>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                  >
                    &gt;
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                  >
                    &lt;
                  </Button>
                </Grid>
              </Grid>
              <Grid item className={classes.privilegeWidth}>
                {customList('Chosen', selectedItems)}
              </Grid>
            </Grid>
          </OutlinedDiv>
        </FormControl>
        <Box display="flex" justifyContent="flex-end" p={-8}>
          <MonarchButton onClick={handleClose} size="small">
            Close
          </MonarchButton>
          <MonarchButton
            onClick={onRoleSaveClick}
            color="primary"
            disabled={!isValidRoleForm || saveInProgress}
            variant="contained"
            className="ml-4"
          >
            Save
          </MonarchButton>
        </Box>
      </div>
    </>
  );
}
