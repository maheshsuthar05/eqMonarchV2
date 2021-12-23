import { Form } from "@flowable/forms";
import React, { useEffect } from "react";
import useIsMounted from "app/common/hooks/useIsMounted";
import { useDispatch, useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
import MonarchPageSimple from "@monarch/core/MonarchPageSimple";
import { fetchStateRoleAssignmentFormStart } from "app/main/admin/store/actions/tenant-admin.actions";

const RoleAssignmentPage = ({ match, history, location }) => {
  const isMounted = useIsMounted();
  const dispatch = useDispatch();
  const stateAction = useSelector(
    (state) => state.admin.tenant_forms.stateAction
  );
  const formDefinition = useSelector(
    (state) => state.admin.tenant_forms.formDefinition
  );

  useEffect(() => {
    if (isMounted.current) {
      dispatch(fetchStateRoleAssignmentFormStart());
    }
  }, [isMounted, dispatch]);

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case "Modal.open":
        break;
      case "Button.click":
        break;
      default:
        break;
    }

    return true;
  };

  return !stateAction ? (
    <FuseLoading />
  ) : (
    <Form
      config={formDefinition}
      className="listing-page"
      onEvent={onEventHandler}
    />
  );
};

export default RoleAssignmentPage;
