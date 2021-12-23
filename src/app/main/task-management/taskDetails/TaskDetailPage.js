import { Button, makeStyles, Tab, Tabs } from '@material-ui/core';
import MonarchPageSimple from '@monarch/core/MonarchPageSimple';
import { TabPanel } from 'app/main/integration/service-test/components/common/tab-panel/TabPanel';
import ImageDialog from 'app/main/property/components/ImageDialog';
import PropertyDecision from 'app/main/property/components/PropertyDecision';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import TaskDetail from './TaskDetail';
import { flowable } from 'app/config/api';
import { useDispatch, useSelector } from 'react-redux';
import * as FlowableActions from 'app/config/flowable-core/store/actions/flowable-core.actions';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.MuiTabs-root': {
      height: '42px',
      minHeight: '42px'
    },
    '&.MuiTab-root': {
      minWidth: '60px'
    }
  }
}));

const TaskDetailPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [processDiagramImageUrl, setProcessDiagramImageUrl] = React.useState(
    null
  );

  const processInstance = useSelector(
    ({ taskManagement }) => taskManagement.details.parentProcessInstance
  );
  const instanceDiagramImageUrl = flowable.api.processInstanceDiagram(
    props.taskDetails.processInstanceId
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onSkip = () => {
    const payload = {};
    dispatch(
      FlowableActions.flowableCoreSkipTask(payload, props.taskDetails.id)
    );
  };

  const handleOnUnclaim = () => {
    dispatch(FlowableActions.flowableCoreUnClaimTask(props.taskDetails.id));
  };
  useEffect(() => {
    // if (coreTaskSkipped) {
    //   dispatch(hideTaskDetails());
    // }
    if (processInstance) {
      setProcessDiagramImageUrl(
        flowable.api.processInstanceDiagram(processInstance.id)
      );
    }
  }, [processInstance, setProcessDiagramImageUrl]);

  return (
    <MonarchPageSimple
      contentToolbar={
        <>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            className={clsx('navigation', classes.root)}
          >
            <Tab
              key={'TaskDetails'}
              label={props.taskDetails.name}
              className={clsx(classes.root)}
            />
            <Tab
              key={'Process Diagram'}
              label={'Process Diagram'}
              className={clsx(classes.root)}
            />
            <Tab
              key={'Instance Diagram'}
              label={'Instance Diagram'}
              className={clsx(classes.root)}
            />
            <Tab key={'Rules'} label={'Rules'} className={clsx(classes.root)} />
          </Tabs>

          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleOnUnclaim}
          >
            {'unclaim'}
          </Button>

          <Button
            onClick={onSkip}
            color="primary"
            size="small"
            variant="contained"
          >
            {'Skip'}
          </Button>
        </>
      }
      content={
        <>
          <TabPanel value={value} index={0}>
            <TaskDetail
              taskDetails={props.taskDetails}
              taskType={props.taskType}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ImageDialog imageUrl={processDiagramImageUrl} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ImageDialog imageUrl={instanceDiagramImageUrl} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <PropertyDecision
              taskId={props.taskDetails.id}
              taskType={props.taskType}
              {...props}
            />
          </TabPanel>
        </>
      }
      innerScroll
    />
  );
};

export default withRouter(TaskDetailPage);
