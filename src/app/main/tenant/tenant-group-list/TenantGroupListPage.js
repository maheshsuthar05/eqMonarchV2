import { Form } from '@flowable/forms';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useParams, withRouter } from 'react-router';
import useIsMounted from 'app/common/hooks/useIsMounted';
import { useDispatch, useSelector } from 'react-redux';
import { groupDeleteStart, fetchGroupListingFormStart } from '../store/actions';
import FuseLoading from '@fuse/core/FuseLoading';
import { TenantApiConfig } from 'app/config/api';
import MonarchPageSimple from '@monarch/core/MonarchPageSimple';
import { closeDialog, openDialog, openModal } from 'app/store/actions';
import TenantAddGroup from '../tenant-add-group/TenantAddGroupPage';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const TenantGroupList = () => {
  const isMounted = useIsMounted();
  const routeParams = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const stateAction = useSelector(
    (state) => state.tenant.groupList.stateAction
  );
  const formDefinition = useSelector(
    (state) => state.tenant.groupList.formDefinition
  );
  const inProgress = useSelector((state) => state.tenant.groupList.inProgress);
  const refreshAfterAddEdit = useSelector(
    (state) => state.tenant.groupAdd.inProgress
  );
  const user = useSelector(({ auth }) => auth.user);

  let taskType = 'open';

  const additionalData = {
    additionalData: {
      url: TenantApiConfig.api.groupUrl,
      taskType: taskType,
      title: taskType === 'completed' ? 'Completed Tasks' : 'Open Tasks'
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      dispatch(fetchGroupListingFormStart());
    }
  }, [isMounted, dispatch]);

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Link.click':
        dispatch(
          openModal({
            children: (
              <TenantAddGroup isEdit={false} tenantId={routeParams.tenantId} />
            ),
            title: 'Add Property Roles'
          })
        );
        break;
      case 'Payload.afterChange':
        if (api.payload.get().groupListData.key === 'Edit') {
          dispatch(
            openModal({
              children: (
                <TenantAddGroup
                  isEdit={true}
                  payload={api.payload.get().groupListData.DATA}
                  tenantId={routeParams.tenantId}
                />
              ),
              title: 'Edit Property Roles'
            })
          );
        } else {
          dispatch(
            openDialog({
              children: (
                <>
                  <DialogTitle id="alert-dialog-title">
                    Are You sure you want to delete{' '}
                    {api.payload.get().groupListData.DATA.name} ?
                  </DialogTitle>
                  <DialogActions>
                    <MonarchButton
                      onClick={() => dispatch(closeDialog())}
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      {'No'}
                    </MonarchButton>

                    <MonarchButton
                      onClick={() => {
                        dispatch(
                          groupDeleteStart(
                            user.tenantCode,
                            api.payload.get().groupListData.DATA,
                            routeParams.tenantId
                          )
                        );
                        dispatch(closeDialog());
                      }}
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      {'Yes'}
                    </MonarchButton>
                  </DialogActions>
                </>
              )
            })
          );
        }
        break;
      default:
        break;
    }

    return true;
  };

  return !stateAction || refreshAfterAddEdit || inProgress ? (
    <FuseLoading />
  ) : (
    <MonarchPageSimple
      classes={{
        content: classes.content
      }}
      innerScroll
      content={
        <>
          <Form
            config={formDefinition}
            additionalData={additionalData}
            onEvent={onEventHandler}
            className="listing-page"
          />
        </>
      }
    />
  );
};

export default withRouter(TenantGroupList);
