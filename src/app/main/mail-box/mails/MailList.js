import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import * as Actions from '../store/actionTypes';
import _ from 'lodash';
import {
  convertNameToAvatar,
  convertTimeStamp
} from 'app/common/helpers/common-helper';
import MailDetails from '../mail/MailDetails';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import InputBase from '@material-ui/core/InputBase';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

let messageId;

const MailList = (props) => {
  const dispatch = useDispatch();
  const drawerWidth = 400;

  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100%',
      flexGrow: 1,
      position: 'relative',
      '& .MuiDrawer-paper': {
        position: 'relative',
        background: '#fff',
        padding: '10px'
      },
      '& .MuiInputBase-root': {
        width: '100%',
        padding: '5px 0 0 5px',
        color: theme.palette.primary.labelTextColor
      }
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      width: '5%',
      left: '20px',
      top: '8px',
      position: 'absolute',
      height: '0',
      color: '#000',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      background: '#f1f3f6',
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(9) - 2,
      '& .search': {
        display: 'none'
      },
      '& .MuiIconButton-root': {
        display: 'none'
      },
      '& .menuButton': {
        marginRight: '0'
      }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      position: 'relative'
    },
    button: {
      background: '#00769b',
      borderRadius: '20px',
      color: '#fff',
      textTransform: 'capitalize',
      fontSize: '1rem',
      marginLeft: '8px',
      '&:hover': {
        background: '#fff',
        color: '#000'
      }
    },
    mailNew: {
      background: '#f1f3f6',
      marginBottom: '4px',
      borderRadius: '8px',
      color: theme.palette.primary.contrastDark
    },
    selectedMail: {
      marginBottom: '4px',
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderRadius: '8px'
    },
    avatarBg: {
      background: '#4f4f4f',
      fontSize: '1rem',
      color: theme.palette.primary.contrastText
    },
    inputTextSearch: {
      border: '1px solid #c4c4c4',
      borderRadius: '0px',
      height: '28px',
      width: '100%',
      padding: '4px 0 0 30px'
    },
    searchInput: {
      background: theme.palette.background.iconbg,
      padding: '10px 0px 10px 0px'
    },
    searchInputBase: {
      background: '#f1f3f6',
      borderRadius: '8px'
    },
    mailSection: {
      overflow: 'auto',
      maxHeight: '100%',
      color: theme.palette.primary.contrastDark
    },
    selectItem: {
      position: 'absolute',
      top: '50%',
      left: '0',
      transform: 'translate(0%, -50%)'
    }
  }));

  const classes = useStyles();
  const mails = useSelector(({ mailApp }) => mailApp.mails.entities);
  const property =useSelector(({property})=> property.get?.property?.property);
  const mail = useSelector(({ mailApp }) => mailApp.mail);
  const routeParams = useParams();
  const [filteredData, setFilteredData] = useState(null);
  const [selectMail, setSelectMail] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [open] = useState(true);

  useEffect(() => {
    const param = _.has(routeParams, 'caseInstanceId')
      ? {
          folderHandle: props.mailType,
          mailId: undefined,
          propertyId: property?.propertyId
        }
      : { folderHandle: props.mailType };

    dispatch({
      type: Actions.FETCH_MAILS,
      routeParams: param
    });
  }, [dispatch, routeParams, props.mailType, mail.processed,property]);

  useEffect(() => {
    function getFilteredArray() {
      const arr = Object.keys(mails).map((id) => mails[id]);
      return arr;
    }

    if (mails) {
      setFilteredData(getFilteredArray());
    }
  }, [mails]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'mail-box',
      fileNames: ['Mail_Message_Reply'],
      formAction: Actions.MAIL_FORMDEFIINITION
    });
  }, [dispatch]);

  const onSelectMail = (data, inx) => {
    let routeParams = {
      mailId: data.MESSAGE_ID
    };
    setSelectMail(inx);
    dispatch({ type: Actions.FETCH_MAIL_BY_ID, routeParams });
    dispatch({ type: Actions.UPDATE_MAIL_BY_ID, routeParams });
  };

  const mailListHasMidified = () => {
    return _.isArray(filteredData)
      ? _.map(filteredData, (res) => {
          return {
            ...res,
            createdDate: convertTimeStamp(res.CREATED_DATE)
          };
        }).filter(
          (item) =>
            item?.RECIPIENT_ID?.toLowerCase().indexOf(
              searchText?.toLowerCase()
            ) > -1
        )
      : [];
  };

  useEffect(() => {
    if (messageId) {
      let routeParams = {
        mailId: messageId
      };
      dispatch({ type: Actions.FETCH_MAIL_BY_ID, routeParams });
      dispatch({ type: Actions.UPDATE_MAIL_BY_ID, routeParams });
    }
  }, [dispatch]);

  return (
    <>
      {!_.isEmpty(mails) ? (
        <div className={classes.root}>
          <div className="w-full flex pt-6 h-full">
            <Drawer
              variant="permanent"
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open
                })
              }}
            >
              <div className={classes.searchInput}>
                <div className={clsx(classes.searchInputBase, 'w-full search')}>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </div>
              <Divider />
              <div className={classes.mailSection}>
                {!_.isEmpty(mailListHasMidified()) ? (
                  _.map(mailListHasMidified(), (res, inx) => {
                    return (
                      <div
                        className={clsx(
                          'flex md:w-full w-auto cursor-pointer',
                          res.IS_READ === 0 ? classes.mailNew : null,
                          inx === selectMail && classes.selectedMail
                        )}
                        onClick={() => onSelectMail(res, inx)}
                      >
                        <div className="flex p-4">
                          <Avatar className={classes.avatarBg}>
                            {convertNameToAvatar(res.RECIPIENT_ID)}
                          </Avatar>
                        </div>
                        <div
                          className={clsx(
                            'w-full inline-block p-4 truncate',
                            classes.mShow
                          )}
                        >
                          <span className="flex font-bold">
                            {res.RECIPIENT_ID}
                          </span>
                          <span className="flex">{res.MAIN_CONTENT_TYPE}</span> <span className="flex"> {res.LOAN_NUMBER} </span>
                        </div>
                        <div className={clsx('flex p-4', classes.mShow)}>
                          {res.createdDate}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <span className="flex justify-center items-center pt-10">
                    No Result found
                  </span>
                )}
              </div>
            </Drawer>
            <main className={classes.content}>
              <MailDetails mailModified={_.isEmpty(mailListHasMidified())} />
            </main>
          </div>
        </div>
      ) : (
        <div className={clsx('flex w-full flex-wrap', classes.selectItem)}>
          <div className="flex w-full justify-center">
            <span className="flex justify-center items-center">
              No Messages
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(MailList);
