import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import React, { useRef, useEffect } from 'react';
import ClaimOpenTaskList from './ClaimTask/ClaimOpenTaskList';
import _ from '@lodash';
import { contextInfo } from 'app/common/helpers';
import Navigation from './Navigation';
import { useSelector } from 'react-redux';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import AssignedTaskOpenList from './assignedTask/AssignedTaskOpenList';
import AssignedTaskCloseList from './assignedTask/AssignedTaskCloseList';
import LegacyCloseTaskList from './legacyTask/LegacyCloseTaskList';
import MonarchTabs from '@monarch/core/MonarchTab/MonarchTabs';
import { MonarchTabPanel } from '@monarch/core/MonarchTab/MonarchTabPanel';
import ProcessAdhoc from './adHoc/ProcessAdhoc';
import { resourceKeys } from 'app/main/task-management/resources/ResourceConfig';
import { hasAccess } from 'app/common/helpers/common-helper';

const TaskManagementApp = (props) => {
  const pageLayout = useRef(null);
  const [value, setValue] = React.useState(0);
  const contextResources = useSelector(
    ({ common }) => common.IAMResource.contextResources
  );
  //const user = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    return () => {
      setValue(0);
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Processes & Tasks'}
      contentToolbar={
        <>
          <MonarchTabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            children={Navigation.children}
          />
          {hasAccess(
            contextResources,
            resourceKeys.Property_Details_Widget_Task_Actions_Adhoc
          ) && <ProcessAdhoc />}
        </>
      }
      content={
        <>
          {_.map(Navigation.children, (item, i) => {
            return (
              (item.title === 'Process Heatmap' && (
                <MonarchTabPanel value={value} index={i} key={value + i}>
                  <ClaimOpenTaskList
                    file={{
                      path: 'tasks/claim-task',
                      name: `${_.upperCase(
                        contextInfo().userType
                      )}ClaimsOpenTaskList`
                    }}
                  />
                </MonarchTabPanel>
              )) ||
              (item.title === 'Claims' && (
                <MonarchTabPanel value={value} index={i} key={value + i}>
                  <ClaimOpenTaskList
                    file={{
                      path: 'tasks/claim-task',
                      name: `${_.upperCase(
                        contextInfo().userType
                      )}ClaimsOpenTaskList`
                    }}
                  />
                </MonarchTabPanel>
              )) ||
              (item.title === 'Open' && (
                <MonarchTabPanel value={value} index={i} key={value + i}>
                  <AssignedTaskOpenList
                    file={{
                      path: 'tasks/assign-task',
                      name: `${_.upperCase(
                        contextInfo().userType
                      )}OpenAssignTaskList`
                    }}
                  />
                </MonarchTabPanel>
              )) ||
              (item.title === 'Closed' && (
                <MonarchTabPanel value={value} index={i} key={value + i}>
                  <AssignedTaskCloseList
                    file={{
                      path: 'tasks/assign-task',
                      name: `${_.upperCase(
                        contextInfo().userType
                      )}CloseAssignTaskList`
                    }}
                  />
                </MonarchTabPanel>
              )) ||
              (item.title === 'Legacy Closed' && (
                <MonarchTabPanel value={value} index={i} key={value + i}>
                  <LegacyCloseTaskList
                    file={{
                      path: 'tasks/legacy-task',
                      name: 'LegacyCloseTaskList'
                    }}
                  />
                </MonarchTabPanel>
              ))
            );
          })}
        </>
      }
      leftSidebarContent={'Task Managment'}
      ref={pageLayout}
    />
  );
};

export default withReducer('TaskManagementApp', reducer)(TaskManagementApp);
