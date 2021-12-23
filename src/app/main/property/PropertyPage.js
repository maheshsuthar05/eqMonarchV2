import { makeStyles } from '@material-ui/core/styles';
import {
  fetchPropertyInitStart,
  fetchPropertyInstanceDetailsStart,
  fetchPropertyStart
} from 'app/main/property/store/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import PropertyMainHeader from './components/PropertyMainHeader.js';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading.js';
import { fetchFormByProcess } from 'app/config/flowable-core/store/actions/flowable-core.actions.js';
import MonarchGridLayout from '@monarch/core/MonarchGridLayout/MonarchGridLayout.js';
import { contextInfo } from 'app/common/helpers/common-helper';
import _ from '@lodash';
import * as actions from 'app/auth/store/actionTypes';
import { _cookies } from 'app/auth/store/actions';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {}
}));

function PropertyPage(props) {
  const classes = useStyles(props);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const userType = contextInfo().userType;
  const user = useSelector(({ auth }) => auth.user);
  const property = useSelector(({ property }) => property.init);

  useEffect(() => {
    if (
      !_.isUndefined(_cookies.getCookies('vendorTaskSearchTenant')) &&
      (userType === 'vendor' || userType === 'agent')
    ) {
      dispatch({
        type: actions.SET_TENANT_FROM_VENDOR_AGENT_TASK
      });
    }
  }, [dispatch, userType]);

  useEffect(() => {
    dispatch(
      fetchPropertyInitStart(user.selectedTenant, routeParams.caseInstanceId)
    );
    dispatch(
      fetchPropertyStart(user.selectedTenant, routeParams.caseInstanceId)
    );
    dispatch(
      fetchPropertyInstanceDetailsStart(
        user.selectedTenant,
        routeParams.caseInstanceId
      )
    );
    dispatch(fetchFormByProcess(user.selectedTenant, 'propertyHeader','PropertyHeaderInformation'));
  }, [dispatch, routeParams.caseInstanceId, user.selectedTenant]);

  const config = {
    layouts: {
      lg: [
        {
          w: 12,
          h: 6,
          x: 0,
          y: 0,
          i: 'TaskManagmentApp',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 8,
          h: 8,
          x: 0,
          y: 6,
          i: 'PropertyDetailsMain',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 8,
          x: 8,
          y: 6,
          i: 'MailApp',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 7,
          h: 6,
          x: 0,
          y: 20,
          i: 'PropertyDocumentPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 12,
          h: 6,
          x: 0,
          y: 14,
          i: 'OfferListPropertyPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 5,
          h: 6,
          x: 7,
          y: 20,
          i: 'AssignedRolePage',
          moved: false,
          static: false
        }
      ],
      md: [
        {
          w: 10,
          h: 7,
          x: 0,
          y: 0,
          i: 'TaskManagmentApp',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 8,
          x: 0,
          y: 7,
          i: 'PropertyDetailsMain',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 8,
          x: 6,
          y: 7,
          i: 'MailApp',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 5,
          h: 9,
          x: 0,
          y: 23,
          i: 'PropertyDocumentPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 10,
          h: 8,
          x: 0,
          y: 15,
          i: 'OfferListPropertyPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 5,
          h: 9,
          x: 5,
          y: 23,
          i: 'AssignedRolePage',
          moved: false,
          static: false
        }
      ],
      sm: [
        {
          w: 6,
          h: 7,
          x: 0,
          y: 0,
          i: 'TaskManagmentApp',
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 6,
          x: 0,
          y: 7,
          i: 'PropertyDetailsMain',
          moved: false,
          static: false
        },
        { w: 6, h: 6, x: 0, y: 13, i: 'MailApp', moved: false, static: false },
        {
          w: 6,
          h: 5,
          x: 0,
          y: 24,
          i: 'PropertyDocumentPage',
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 5,
          x: 0,
          y: 19,
          i: 'OfferListPropertyPage',
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 5,
          x: 0,
          y: 29,
          i: 'AssignedRolePage',
          moved: false,
          static: false
        }
      ],
      xs: [
        {
          w: 4,
          h: 7,
          x: 0,
          y: 0,
          i: 'TaskManagmentApp',
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 7,
          x: 0,
          y: 7,
          i: 'PropertyDetailsMain',
          moved: false,
          static: false
        },
        { w: 4, h: 6, x: 0, y: 14, i: 'MailApp', moved: false, static: false },
        {
          w: 4,
          h: 7,
          x: 0,
          y: 34,
          i: 'PropertyDocumentPage',
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 7,
          x: 0,
          y: 20,
          i: 'OfferListPropertyPage',
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 7,
          x: 0,
          y: 27,
          i: 'AssignedRolePage',
          moved: false,
          static: false
        }
      ]
    },
    components: [
      'TaskManagmentApp',
      'PropertyDetailsMain',
      'MailApp',
      'PropertyDocumentPage',
      'OfferListPropertyPage',
      'AssignedRolePage'
    ]
  };

  const fn = {
    onLayoutChange: () => {
      return config;
    }
  };

  return !property.stateAction ? (
    <FuseLoading />
  ) : (
    <MonarchGridLayout
      classes={{
        root: classes.layoutRoot
      }}
      header={routeParams.caseInstanceId && <PropertyMainHeader />}
      config={fn.onLayoutChange()}
      {...fn}
    />
  );
}

export default PropertyPage;
