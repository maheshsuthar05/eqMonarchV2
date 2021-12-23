import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

function HeaderPage(props) {
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
    <div className="flex w-full ml-8">
      <div className="flex w-full pt-4">
        <div className="flex w-full mt-4 flex-wrap">
          <div className="flex w-full">
            <div>
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

            <div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderPage;
