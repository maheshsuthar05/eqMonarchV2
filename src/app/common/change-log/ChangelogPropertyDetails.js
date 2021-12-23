import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Form } from '@flowable/forms';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import clsx from 'clsx';
import { withRouter } from 'react-router';
import _ from '@lodash';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import Navigation from './Navigation';
import MonarchTabs from '@monarch/core/MonarchTab/MonarchTabs';
import { MonarchTabPanel } from '@monarch/core/MonarchTab';
import MonarchTitle from '@monarch/core/MonarchTitle/MonarchTitle';
import CloseIcon from '@material-ui/icons/Close';
import useIsMounted from 'app/common/hooks/useIsMounted';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import * as Actions from 'app/common/store/actionTypes';
import { closeModal } from 'app/store/actions';
import { flowableCustomFetch } from '../helpers';
import { changeLog } from 'app/config/api';
import { changelogRequestPayload } from '../store/actions/changelog.action';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'none',
    boxShadow: 'none',
    '& .MuiTab-root': {
      minWidth: '0',
      minHeight: '0',
      marginRight: '2px',
      marginBottom: '1px',
      background: '#f8f8fb',
      textTransform: 'capitalize',
      fontSize: '12px',
      padding: '6px 15px'
    },
    '& .MuiTabs-root': {
      minHeight: '0',
      display: 'inline-block'
    },
    '& .MuiAppBar-root': {
      boxShadow: 'none',
      background: 'none !important'
    },
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center'
    },
    '& .panelBg': {
      background: '#f6fbff',
      minHeight: '20rem'
    },
    '& .Mui-selected': {
      background: '#f6fbff !important'
    }
  },
  selectDropdown: {
    border: '1px solid #c4c4c4',
    borderRadius: '0px',
    height: '20px',
    width: '100px'
  },
  tabs: {
    marginLeft: 'auto',
    marginRight: -12
  },
  title: {
    padding: '7px 20px',
    position: 'relative',
    left: '-17px',
    marginBottom: '10px'
  },
  toolbar: {
    height: '34px',
    minHeight: '34px',
    alignItems: 'center'
  },
  iconPad: {
    padding: '0 3px'
  }
}));

const ChangelogPropertyDetails = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const isMounted = useIsMounted();
  const [value, setValue] = React.useState(0);
  const flowable = useSelector(({ common }) => common.flowable);
  const requestPayloadForPropertyChangelog = useSelector(
    ({ common }) => common.changelog.requestPayload
  );
  const propertyInfo = useSelector(({ property }) => property?.get?.property);
  const additionalData = {
    additionalData: {
      url: changeLog.api.getFieldLevelData
    }
  };

  const payload = {
    startCase: (str) => _.startCase(str)
  };

  useEffect(() => {
    if (isMounted.current) {
      dispatch({
        type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
        path: 'change-log',
        fileNames: ['ChangeLog_PropertyDetails'],
        formAction: Actions.COMMON_FORMDEFIINITION
      });
      dispatch(
        changelogRequestPayload([
          propertyInfo?.property?.propertyId,
          propertyInfo?.loan?.loanId
        ])
      );
    }
  }, [isMounted, dispatch, propertyInfo]);

  const customFetch = flowableCustomFetch(
    additionalData.additionalData.url,
    requestPayloadForPropertyChangelog
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.root}>
        <div
          className={clsx(classes.toolbar, 'flex flex-auto justify-between')}
        >
          <MonarchTitle
            title="Change Log"
            className={classes.title}
            forceStyles={true}
          />
          <div className={clsx('flex justify-items-center')}>
            <MonarchTabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              children={Navigation.children}
            />
            <Tooltip title="close dialog" placement="top-end">
              <IconButton
                color="primary"
                aria-label="maximize"
                onClick={() => dispatch(closeModal())}
                component="span"
                size="small"
                className={clsx(classes.iconPad, '')}
                tool
              >
                <CloseIcon className="icon-Color pr-8 cursor-pointer text-2xl" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <MonarchTabPanel value={value} index={0}>
          <div className="flex w-full">
            <div className="flex w-full">
              <div className="w-full">
                <div className={clsx(classes.root, 'p-12')}>
                  {!flowable['ChangeLog_PropertyDetails']?.processed ? (
                    <FuseLoading />
                  ) : (
                    <>
                      <div className={'justify-center m-auto taskDetails'}>
                        <Form
                          className={clsx(flwClasses.form)}
                          config={
                            flowable['ChangeLog_PropertyDetails']?.formDef
                          }
                          fetch={customFetch}
                          payload={payload}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MonarchTabPanel>

        <MonarchTabPanel value={value} index={1}>
          <div className="flex w-full">Process/Task</div>
        </MonarchTabPanel>

        <MonarchTabPanel value={value} index={2}>
          <div className="flex w-full">Offers</div>
        </MonarchTabPanel>
      </div>
    </>
  );
};

export default withRouter(ChangelogPropertyDetails);
