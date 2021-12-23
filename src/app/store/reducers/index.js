import auth from 'app/auth/store/reducers';
import integration from 'app/main/integration/store/reducers';
import commonReducers from 'app/common/store/reducers';
import propertyReducers from 'app/main/property/store/reducers';
import tenantReducers from 'app/main/tenant/store/reducers';
import { combineReducers } from 'redux';
import apiCallInProgress from './apiStatusReducer';
import fileUpload from './file-upload';
import flowableCore from 'app/config/flowable-core/store/reducers';
import verification from 'app/main/verification/store/reducers';
import fuse from './fuse';
import serviceTestReducers from 'app/main/integration/service-test/store/reducers';
import adminReducers from 'app/main/admin/store/reducers';
import fileManager from 'app/main/agent/store/reducers';
import vendorReducer from 'app/main/vendor/store/reducers';
import flowableFormRefresh from 'app/store/reducers/flowableFormRefresh';
import flowableControl from 'app/config/flowable-control/store/reducers';
import monarch from './monarch';

const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    fuse,
    fileUpload,
    integration,
    property: propertyReducers,
    tenant: tenantReducers,
    common: commonReducers,
    apiCallInProgress,
    ...asyncReducers,
    serviceTestReducers,
    flowable: flowableCore,
    admin: adminReducers,
    verification,
    fileManager,
    vendor: vendorReducer,
    flowableFormRefresh,
    flowableControl,
    monarch
  });

export default createReducer;
