import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './../store/reducers';
import * as snapActions from 'app/main/property/store/actions/snapshot.actions';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
    // background: theme.palette.background.paper
  },
  title: {
    color: theme.palette.secondary.dark,
    fontWeight: 'bold !Important'
  },
  textSmall: {
    //fontSize: '1.1rem',
    color: theme.palette.primary.contrastDark
    //fontWeight: '700'
  },
  verticalText: {
    letterSpacing: '2px',
    writingMode: 'vertical-rl'
  },
  textValueColor: {
    color: '#666'
  },
  titleColor: {
    background: theme.palette.background.widgetTitleBg,
    color: theme.palette.primary.widgetTitleColor,
    '&::before': {
      borderRight: theme.palette.flatWidgetBdr
    }
  },
  titleTxt: {
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    textAlign: 'center',
    padding: '5px 20px',
    fontSize: '1rem',
    fontWeight: '400',
    background: theme.palette.background.widgetTitleBg,
    color: theme.palette.primary.widgetTitleColor
  },
  boxing: {
    padding: theme.spacing(1)
  },
  badge: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  iconButton: {
    color: 'inherity'
  }
}));

function DashboardPage(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const counts = useSelector(({ property }) => property.snapshot);
  const [openCount, setOpenCount] = useState(0);
  const [closeCount, setCloseCount] = useState(0);

  const [teamOpenCount] = useState(0);
  const [teamCloseCount] = useState(0);

  useEffect(() => {
    dispatch(snapActions.fetchOpenTaskCount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(snapActions.fetchCompletedTaskCount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(snapActions.fetchTeamOpenTaskCount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(snapActions.fetchTeamCompletedTaskCount());
  }, [dispatch]);

  useEffect(() => {
    if (counts.openTask.status) {
      setOpenCount(counts.openTask.count);
    }
  }, [dispatch, counts.openTask.status, counts.openTask.count]);

  useEffect(() => {
    if (counts.completedTask.status) {
      setCloseCount(counts.completedTask.count);
    }
  }, [dispatch, counts.completedTask.status, counts.completedTask.count]);

  useEffect(() => {
    if (counts.TeamOpenTask.status) {
      setOpenCount(counts.TeamOpenTask.count);
    }
  }, [dispatch, counts.TeamOpenTask.status, counts.TeamOpenTask.count]);

  useEffect(() => {
    if (counts.TeamCompletedTask.status) {
      setCloseCount(counts.TeamCompletedTask.count);
    }
  }, [
    dispatch,
    counts.TeamCompletedTask.status,
    counts.TeamCompletedTask.count
  ]);

  return (
    <div className="flex w-full bg-white rounded-md p-6">
      <div className="flex w-full">
        <div className="flex w-full mt-4 flex-wrap">
          <div className="flex w-full flex-wrap md:flex-nowrap">
            <div className="vendorSection">
              <h5 className={clsx('card-Title', classes.titleColor)}>
                Assigned Task
              </h5>
            </div>
            <div className="flex w-full flex-wrap">
              <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 w-full flex pl-16">
                <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                  <span className="pb-2">Open</span>
                  <span className={clsx('font-normal', classes.textValueColor)}>
                    {openCount} <span>Tasks</span>
                  </span>
                </li>
                <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                  <span className="pb-2">Completed</span>
                  <span className={clsx('font-normal', classes.textValueColor)}>
                    {closeCount} <span>Tasks</span>
                  </span>
                </li>
              </div>
            </div>

            <div className="vendorSection">
              <h5 className={clsx('card-Title', classes.titleColor)}>
                Team Task
              </h5>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 w-full flex pl-16">
              <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                <span className="pb-2">Open</span>
                <span className={clsx('font-normal', classes.textValueColor)}>
                  {teamOpenCount} <span>Tasks</span>
                </span>
              </li>
              <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                <span className="pb-2">Completed</span>
                <span className={clsx('font-normal', classes.textValueColor)}>
                  {teamCloseCount} <span>Tasks</span>
                </span>
              </li>

              {/* <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                <span>Accepted</span>
                <span className="text-black text-2xl">5</span>
              </li>
              <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                <span>Negotiating</span>
                <span className="text-green-600 text-2xl">4</span>
              </li>
              <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                <span>Held</span>
                <span className="text-red-600 text-2xl">10</span>
              </li>
              <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                <span>Rejected</span>
                <span className="text-yellow-800 text-2xl">2</span>
              </li> */}
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="w-full bg-white rounded-md p-8 pl-0">
    //     <div className={clsx('flex w-full md:flex flex-wrap mb-10', classes.root)}>
    //       <div className={clsx('w-full md:w-auto sm:w-auto mr-12', classes.textDarkBlue)}>
    //               <h5 className={clsx('text-left truncate', classes.titleTxt)}>
    //                 Vendor Overview
    //               </h5>
    //             </div>
    //       <div className={clsx('flex flex-1 flex-col min-w-0', classes.root)}>
    //         <FuseAnimate animation="transition.slideUpIn" delay={600}>
    //           <Typography className={clsx('p-16 pb-8 text-12', classes.title)}>
    //             Assigned Task
    //           </Typography>
    //         </FuseAnimate>
    //         <div className="flex flex-col sm:flex sm:flex-row">
    //           <div
    //             className={clsx('widget flex w-full sm:w-1/2', classes.boxing)}
    //           >
    //             <TaskWidgets
    //               widget={WidgetData.widgets.openTask}
    //               counts={openCount}
    //               redirectUrl={`/vendor/taskManagement/assigned-tasks/open`}
    //             />
    //           </div>
    //           <div
    //             className={clsx('widget flex w-full sm:w-1/2', classes.boxing)}
    //           >
    //             <TaskWidgets
    //               widget={WidgetData.widgets.closeTask}
    //               counts={closeCount}
    //               redirectUrl={`/vendor/taskManagement/assigned-tasks/close`}
    //             />
    //           </div>
    //         </div>
    //       </div>

    //       <div className={clsx('flex flex-1 flex-col min-w-0', classes.root)}>
    //         <FuseAnimate animation="transition.slideUpIn" delay={600}>
    //           <Typography className={clsx('p-16 pb-8 text-12', classes.title)}>
    //             Team Task
    //           </Typography>
    //         </FuseAnimate>
    //         <div className="flex flex-col sm:flex sm:flex-row">
    //           <div
    //             className={clsx('widget flex w-full sm:w-1/2', classes.boxing)}
    //           >
    //             <TaskWidgets
    //               widget={WidgetData.widgets.openTask}
    //               counts={teamOpenCount}
    //               redirectUrl={`/vendor/taskManagement/team-tasks/open`}
    //             />
    //           </div>
    //           <div
    //             className={clsx('widget flex w-full sm:w-1/2', classes.boxing)}
    //           >
    //             <TaskWidgets
    //               widget={WidgetData.widgets.closeTask}
    //               counts={teamCloseCount}
    //               redirectUrl={`/vendor/taskManagement/team-tasks/close`}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       {/* </FuseAnimateGroup> */}
    //     </div>
    //     </div>
  );
}

export default withReducer('vendorDashboardApp', reducer)(DashboardPage);
