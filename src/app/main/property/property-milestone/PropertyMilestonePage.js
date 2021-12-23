import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import { fetchPropertyMilestoneStart } from 'app/main/property/store/actions';
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'react-google-charts';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import FuseAnimate from '@fuse/core/FuseAnimate';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  title: {
    color: theme.palette.primary.dark,
    fontWeight: 'bold !Important',
    fontSize: '12px'
  },
  paper: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '240px'
  },
  toggler: {
    padding: theme.spacing(2),
    textAlign: 'right',
    color: theme.palette.text.secondary
  }
}));

const PropertyMilestonePage = () => {
  const currentTheme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParam = useParams();
  const caseInstanceId = routeParam.caseInstanceId;

  const stateAction = useSelector(
    ({ property }) => property.milestone.stateAction
  );
  const ganttChartData = useSelector(
    ({ property }) => property.milestone.milestoneData.ganttChartData
  );
  const tableChartData = useSelector(
    ({ property }) => property.milestone.milestoneData.tableChartData
  );

  const property = useSelector(({ property }) => property.get);
  const propertyId = useRef(property.property?.loan.propertyId);
  const loanId = useRef(property.property?.loan.loanId);
  const user = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    if (property.stateAction) {
      dispatch(
        fetchPropertyMilestoneStart(
          propertyId,
          loanId,
          user.tenantCode,
          caseInstanceId
        )
      );
    }
  }, [
    dispatch,
    property.stateAction,
    caseInstanceId,
    user.tenantCode,
    propertyId,
    loanId
  ]);

  const ganttChartOptions = {
    width: '100%',
    height: '100%',
    gantt: {
      labelStyle: {
        fontName: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
        fontSize: 14,
        color: '#757575'
      },
      tooltip: {
        fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
        fontSize: 14
      },
      palette: [
        {
          color: currentTheme.palette.secondary.main,
          dark: currentTheme.palette.secondary.dark,
          light: currentTheme.palette.secondary.light
        }
      ]
    }
  };

  const tableChartOpions = {
    showRowNumber: false,
    alternatingRowStyle: false,
    sort: 'disable',
    width: '100%',
    height: '100%',
    cssClassNames: {
      headerRow: 'tableChartHeading',
      tableRow: 'tableChartRow'
    }
  };

  const [showGraph, setShowGraph] = useState({
    tableGraph: false
  });

  const handleChange = (event) => {
    setShowGraph({ tableGraph: event.target.checked });
  };

  return (
    <MonarchPageCarded
      gridSize={3}
      contentTitle={'Milestone'}
      contentToolbar={<></>}
      content={
        !stateAction ? (
          <FuseLoading />
        ) : (
          <Paper className="w-full rounded-8 shadow-1 border-0">
            <div className="propertyMilestoneContent p-12">
              <div className="flex flex-1 w-full items-center justify-between">
                <div className="flex items-center justify-between px-4 pt-4">
                  <Typography className={clsx(classes.title)}>
                    {/* Timeline */}
                  </Typography>
                </div>
                <div className="flex items-end">
                  <Tooltip
                    title={`${showGraph.tableGraph ? 'Gantt' : 'Table'} chart`}
                    placement="right"
                  >
                    <Switch
                      checked={showGraph.tableGraph}
                      onChange={handleChange}
                      name="showTableGraph"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                  </Tooltip>
                </div>
              </div>
              <FusePageSimple
                classes={{
                  content: classes.content
                }}
                innerScroll
                content={
                  stateAction && (
                    <div className={clsx(classes.root, 'h-256')}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          {showGraph.tableGraph && (
                            <>
                              {tableChartData.length > 0 ? (
                                <Chart
                                  chartType="Table"
                                  loader={<FuseLoading />}
                                  data={tableChartData}
                                  options={tableChartOpions}
                                  rootProps={{ 'data-testid': '1' }}
                                  alternatingRowStyle={true}
                                />
                              ) : (
                                <FuseAnimate delay={100}>
                                  <div className="flex flex-1 items-center justify-center mt-32">
                                    <Typography
                                      color="textSecondary"
                                      variant="h5"
                                    >
                                      {'NO_DATA'}
                                    </Typography>
                                  </div>
                                </FuseAnimate>
                              )}
                            </>
                          )}
                          {!showGraph.tableGraph && (
                            <div className={classes.paper}>
                              {ganttChartData.length > 0 ? (
                                <Chart
                                  chartType="Gantt"
                                  loader={<FuseLoading />}
                                  data={ganttChartData}
                                  options={ganttChartOptions}
                                  rootProps={{ 'data-testid': '2' }}
                                />
                              ) : (
                                <FuseAnimate delay={100}>
                                  <div className="flex flex-1 items-center justify-center mt-32">
                                    <Typography
                                      color="textSecondary"
                                      variant="h5"
                                    >
                                      {'NO_DATA'}
                                    </Typography>
                                  </div>
                                </FuseAnimate>
                              )}
                            </div>
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  )
                }
              />
            </div>
          </Paper>
        )
      }
      leftSidebarContent={<></>}
    />
  );
};

export default withRouter(PropertyMilestonePage);
