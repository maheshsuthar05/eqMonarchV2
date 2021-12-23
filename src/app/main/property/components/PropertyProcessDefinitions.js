import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FlowableControl from 'app/config/flowable-control/components/FlowableControl';
import { flowableControlLogin } from 'app/config/flowable-control/store/actions';
import { fetchPropertyProcessIntances } from 'app/main/property/store/actions';
import { openModal } from 'app/store/actions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PropertyProcessDefinitions = (props) => {
  const dispatch = useDispatch();
  const headerStateAction = useSelector(
    ({ property }) => property.header.stateAction
  );
  const flowableControl = useSelector(
    ({ flowableControl }) => flowableControl.control.login
  );
  const processInstances = useSelector(
    ({ property }) => property.header.allProcessIntances
  );
  const propertyId = useSelector(
    ({ property }) => property.get.property?.property?.propertyId
  );
  useEffect(() => {
    if (propertyId) {
      dispatch(flowableControlLogin());
      dispatch(
        fetchPropertyProcessIntances({
          propertyId: propertyId
        })
      );
    }
  }, [dispatch, propertyId]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex] = useState(0);
  const [processName, setProcessName] = useState('Process Name');

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (event, index, processDefinition) => {
    if (processDefinition.hasOwnProperty('id')) {
      setProcessName(processDefinition?.processDefinitionName);
      dispatch(
        openModal({
          children: (
            <>
              <FlowableControl processDefinition={processDefinition} />
            </>
          ),
          title: processDefinition?.processDefinitionName,
          maxwidth: 'xl',
          buttons: <></>
        })
      );
    }
    setAnchorEl(null);
  };

  return !flowableControl.isAuthenticated ? (
    <CircularProgress size={24} />
  ) : (
    <>
      <List component="nav">
        <ListItem button onClick={handleClickListItem}>
          <div className="inline-block text-black font-bold no-underline">
            <Typography variant="subtitle2" component="div" color="primary">
              <ListItemText primary={processName} />
            </Typography>
          </div>
          <Icon className="text-16" variant="action">
            keyboard_arrow_down
          </Icon>
        </ListItem>
      </List>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        color="primary"
        PaperProps={{
          style: {
            backgroundColor: '#fff',
            color: '#000'
          }
        }}
      >
        {processInstances.data.map((option, index) => (
          <MenuItem
            key={option?.id}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index, option)}
          >
            {option?.processDefinitionName}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default PropertyProcessDefinitions;
