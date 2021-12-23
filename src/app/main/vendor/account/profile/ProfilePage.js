import { IconButton, makeStyles, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import useIsMounted from 'app/common/hooks/useIsMounted';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { Form } from '@flowable/forms';
import EditableProfileDetails from './EditableProfileDetails';
import { openModal } from 'app/store/actions';
import { forgerock } from 'app/config/api';
import * as Actions from 'app/main/vendor/store/actionTypes';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import Tooltip from '@material-ui/core/Tooltip';
import { FiEdit } from 'react-icons/fi';
import { BiReset } from 'react-icons/bi';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  content: {
    padding: '2px'
  },
  title: {
    color: theme.palette.primary.dark,
    fontWeight: 'bold !Important',
    fontSize: '12px'
  }
}));

const ProfilePage = (props) => {
  const classes = useStyles();
  const isMounted = useIsMounted();
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const flwClasses = useFormStyles();
  const flowable = useSelector(({ vendor }) => vendor.flowable);
  const theme = useTheme();
  const formPayload = useSelector(
    ({ vendor }) => vendor.vendorProfile.formData
  );
  const user = useSelector(({ auth }) => auth.user);
  const userType = user.userType;
  const vendorProfileInformation = useSelector(
    ({ vendor }) => vendor.vendorProfile.vendorProfileInformation
  );
  const formRefresh = useSelector(
    ({ vendor }) => vendor.vendorProfile.formRefresh
  );
  const formPayloadRef = useRef({});
  formPayloadRef.current = formPayload;
  const additionalData = {
    additionalData: {
      isVendor: userType === 'vendor' ? true : false,
      isAgent: userType === 'agent' ? true : false
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      dispatch({
        type: Actions.GET_VENDOR_PROFILE_INFORMATION_START,
        payload: additionalData
      });
      dispatch({
        type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
        path: 'profile',
        fileNames: ['VendorDetails', 'EditVendorProfile'],
        formAction: Actions.VENDOR_FORMDEFIINITION
      });
    }
  }, [dispatch, isMounted, formRefresh, additionalData]);

  const onButtonClickHandler = () => {
    dispatch({
      type: Actions.UPDATE_VENDOR_PROFILE_INFORMATION_START,
      payload: formPayloadRef.current,
      additionalData
    });
  };
  function onEditButtonHandler() {
    dispatch(
      openModal({
        children: <EditableProfileDetails />,
        title: 'Edit Profile Details',
        maxwidth: 'lg',
        buttons: (
          <>
            <MonarchButton
              color="primary"
              variant="contained"
              size="small"
              disabled
              onClick={onButtonClickHandler}
            >
              {'Save'}
            </MonarchButton>
          </>
        )
      })
    );
  }

  function onResetPasswordClick(e) {
    e.preventDefault();
    window.open(forgerock.api.resetPasswordAPI(user.realm), '_blank');
  }

  function onResetSecuityQAClick(e) {
    e.preventDefault();
    window.open(forgerock.api.resetSecurityQaApi(user.realm), '_blank');
  }

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Profile'}
      leftSidebarContent={<></>}
      ref={pageLayout}
      contentToolbar={
        <>
          <Tooltip title="Profile Edit" placement="top-end">
            <IconButton
              color="primary"
              aria-label="maximize"
              onClick={onEditButtonHandler}
              component="span"
              size="small"
            >
              <FiEdit className={theme.icons.fontSize} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Rest Password" placement="top-end">
            <IconButton
              color="primary"
              aria-label="maximize"
              onClick={onResetPasswordClick}
              component="span"
              size="small"
            >
              <BiReset className={theme.icons.fontSize} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset Security Q/A" placement="top-end">
            <IconButton
              color="primary"
              aria-label="maximize"
              onClick={onResetSecuityQAClick}
              component="span"
              size="small"
            >
              <AiOutlineSafetyCertificate className={theme.icons.fontSize} />
            </IconButton>
          </Tooltip>
        </>
      }
      content={
        <>
          <div className={classes.root}>
            {!flowable['VendorDetails']?.processed ? (
              <FuseLoading />
            ) : (
              <Form
                config={flowable['VendorDetails']?.formDef}
                className={clsx(flwClasses.form, 'propertDetails')}
                additionalData={additionalData}
                payload={{
                  profileImgURL: user.data.photoURL,
                  vendorProfileInformation
                }}
              />
            )}
          </div>
        </>
      }
    />
  );
};

export default ProfilePage;
