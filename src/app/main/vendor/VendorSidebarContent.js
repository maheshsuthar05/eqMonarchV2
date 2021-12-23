import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import React, { Profiler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

const useStyles = makeStyles((theme) => ({
  listItem: {
    color: 'inherit!important',
    textDecoration: 'none!important',
    height: 40,
    width: 'calc(100% - 16px)',
    borderRadius: '0 20px 20px 0',
    paddingLeft: 24,
    paddingRight: 12,
    '&.active': {
      backgroundColor: theme.palette.secondary.main,
      color: `${theme.palette.secondary.contrastText}!important`,
      pointerEvents: 'none',
      '& .list-item-icon': {
        color: 'inherit'
      }
    },
    '& .list-item-icon': {
      fontSize: 16,
      width: 16,
      height: 16,
      marginRight: 16
    }
  },
  listSubheader: {
    paddingLeft: 24
  }
}));

function VendorSidebarContent(props) {
  const dispatch = useDispatch();
  const labels = useSelector(({ vendorApp }) => vendorApp.labels);
  const folders = useSelector(({ vendorApp }) => vendorApp.folders);
  const filters = useSelector(({ vendorApp }) => vendorApp.filters);

  const classes = useStyles(props);

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={400}>
      <div className="flex-auto border-l-1 border-solid">
        <div className={classes.listWrapper}>
          <List>
            {folders.length > 0 &&
              folders.map((folder) => (
                <ListItem
                  button
                  component={NavLinkAdapter}
                  to={`/apps/todo/${folder.handle}`}
                  key={folder.id}
                  activeClassName="active"
                  className={classes.listItem}
                >
                  <Icon className="list-item-icon" color="action">
                    {folder.icon}
                  </Icon>
                  <ListItemText primary={folder.title} disableTypography />
                </ListItem>
              ))}
          </List>

          <List>
            <ListSubheader className={classes.listSubheader} disableSticky>
              WORKFLOW
            </ListSubheader>
            <ListItem button>
              <Icon className="list-item-icon" color="action">
                event_note
              </Icon>
              <ListItemText primary="orders" disableTypography />
            </ListItem>
            <ListItem button>
              <Icon className="list-item-icon" color="action">
                library_books
              </Icon>
              <ListItemText primary="Deliverables" disableTypography />
            </ListItem>
            <ListItem button>
              <Icon className="list-item-icon" color="action">
                location_city
              </Icon>
              <ListItemText primary="Properties" disableTypography />
            </ListItem>
          </List>

          {/* <List>
            <ListSubheader className={classes.listSubheader} disableSticky>
              PROPERTIES
            </ListSubheader> */}

          {/* {labels.length > 0 &&
              labels.map((label) => (
                <ListItem
                  button
                  component={NavLinkAdapter}
                  to={`/apps/todo/label/${label.handle}`}
                  key={label.id}
                  className={classes.listItem}
                >
                  <Icon
                    className="list-item-icon"
                    style={{ color: label.color }}
                    color="action"
                  >
                    label
                  </Icon>
                  <ListItemText primary={label.title} disableTypography />
                </ListItem>
              ))} */}
          {/* </List> */}
          <List>
            <ListSubheader className={classes.listSubheader} disableSticky>
              ADMIN
            </ListSubheader>
            <ListItem button>
              <Icon className="list-item-icon" color="action">
                person_add
              </Icon>
              <ListItemText primary="Add Person" disableTypography />
            </ListItem>
          </List>
          <List>
            <ListSubheader className={classes.listSubheader} disableSticky>
              ACCOUNT
            </ListSubheader>
            <ListItem button>
              <Icon className="list-item-icon" color="action">
                contacts
              </Icon>
              <ListItemText primary="Profile" disableTypography />
            </ListItem>
            <ListItem button>
              <Icon className="list-item-icon" color="action">
                shopping_basket
              </Icon>
              <ListItemText primary="Services" disableTypography />
            </ListItem>
            <ListItem button>
              <Icon className="list-item-icon" color="action">
                attach_money
              </Icon>
              <ListItemText primary="Payment Info" disableTypography />
            </ListItem>
            <ListItem button>
              <Icon className="list-item-icon" color="action">
                featured_play_list
              </Icon>
              <ListItemText primary="Statements" disableTypography />
            </ListItem>
            <ListItem button>
              <Icon className="list-item-icon" color="action">
                assignment
              </Icon>
              <ListItemText primary="Agrements" disableTypography />
            </ListItem>
          </List>
        </div>
      </div>
    </FuseAnimate>
  );
}

export default VendorSidebarContent;
