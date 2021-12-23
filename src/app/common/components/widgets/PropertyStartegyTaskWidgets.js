import Paper from '@material-ui/core/Paper';
import { List, ListItem, ListItemText, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  title: {
    color: theme.palette.primary.dark,
    fontWeight: 'bold !Important',
    fontSize: '12px'
  },
  box: {
    width: '42%',
    padding: '10px',
    borderRadius: '5px',
    color: 'white',
    textAlign: 'center'
  },
  rootBox: {
    height: ' 40px',
    marginBottom: '20px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px'
  },
  timeProjectionDate: {
    width: '55%',
    marginLeft: '30%',
    marginBottom: 0,
    marginTop: 0
  }
}));

const MaterialUIPickers = ({ dateVal, startDateChanges }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(dateVal));
  const classes = useStyles();
  const handleDateChange = (date) => {
    setSelectedDate(date);
    startDateChanges(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className={classes.timeProjectionDate}
        margin="normal"
        id="date-picker-dialog"
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

function PropertyStrategyTaskWidgets(props) {
  const classes = useStyles();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const endDateFunc = (date) => {
    setEndDate(date);
  };

  const diffMonth = (end, start) => {
    return isNaN(
      moment(new Date(end)).diff(new Date(start), 'month', true).toFixed(2)
    )
      ? null
      : moment(new Date(end)).diff(new Date(start), 'month', true).toFixed(2);
  };

  function renderByTaskType(type) {
    switch (type) {
      case 'strategy':
        return (
          <div className="text-center pt-12 pb-28">
            <Typography
              className={`text-16 text-${props.widget.color}`}
              color="textSecondary"
            >
              {props.widget.priority}
            </Typography>
            <Typography
              className={clsx(`text-56 font-300 leading-none text-black`)}
            >
              {'$' + props.widget.price}
            </Typography>
          </div>
        );
      case 'timeProjection':
        return (
          <div
            className={clsx('flex flex-1 flex-col min-w-0 p-16', classes.root)}
          >
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem>
                <ListItemText primary="# Months" />
                <ListItemText
                  primary={diffMonth(
                    endDate === '' ? props.widget.end : endDate,
                    startDate === '' ? props.widget.start : startDate
                  )}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Start" />

                {props.widget.title === 'CWCOT' ? (
                  <ListItemText
                    primary={
                      <MaterialUIPickers
                        dateVal={props.widget.start}
                        startDateChanges={setStartDate}
                      />
                    }
                  />
                ) : props.widget.title === 'Conveyance' ? (
                  <ListItemText
                    primary={
                      <MaterialUIPickers
                        dateVal={props.widget.start}
                        startDateChanges={setStartDate}
                      />
                    }
                  />
                ) : props.widget.title === 'REO As Is' ? (
                  <ListItemText
                    primary={
                      <MaterialUIPickers
                        dateVal={props.widget.start}
                        startDateChanges={setStartDate}
                      />
                    }
                  />
                ) : props.widget.title === 'REO Repair' ? (
                  <ListItemText
                    primary={
                      <MaterialUIPickers
                        dateVal={props.widget.start}
                        startDateChanges={setStartDate}
                      />
                    }
                  />
                ) : null}
              </ListItem>
              <ListItem>
                <ListItemText primary="End" />
                {props.widget.title === 'CWCOT' ? (
                  <ListItemText
                    primary={
                      <MaterialUIPickers
                        dateVal={props.widget.end}
                        startDateChanges={endDateFunc}
                      />
                    }
                  />
                ) : props.widget.title === 'Conveyance' ? (
                  <ListItemText
                    primary={
                      <MaterialUIPickers
                        dateVal={props.widget.end}
                        startDateChanges={endDateFunc}
                      />
                    }
                  />
                ) : props.widget.title === 'REO As Is' ? (
                  <ListItemText
                    primary={
                      <MaterialUIPickers
                        dateVal={props.widget.end}
                        startDateChanges={endDateFunc}
                      />
                    }
                  />
                ) : props.widget.title === 'REO Repair' ? (
                  <ListItemText
                    primary={
                      <MaterialUIPickers
                        dateVal={props.widget.end}
                        startDateChanges={endDateFunc}
                      />
                    }
                  />
                ) : null}
              </ListItem>
            </List>
          </div>
        );
      case 'riskFactor':
        return (
          <div
            className={clsx('flex flex-1 flex-col min-w-0 p-16', classes.root)}
          >
            <div className={classes.rootBox}>
              <Box display="flex" alignItems="flex-start">
                {props.widget.level === 'low' ? (
                  <Box bgcolor="#4CAF50" className={classes.box} ml={'0%'}>
                    Low
                  </Box>
                ) : props.widget.level === 'medium' ? (
                  <Box bgcolor="#FF9800" className={classes.box} ml={'25%'}>
                    Medium
                  </Box>
                ) : props.widget.level === 'occupied' ? (
                  <Box bgcolor="#F44336" className={classes.box} ml={'57%'}>
                    Occupied
                  </Box>
                ) : null}
              </Box>
            </div>
          </div>
        );
      case 'chart':
        return props.children;
      default:
        return null;
    }
  }
  return (
    <Paper className="w-full rounded-8 shadow-1 border-0">
      <div className="p-16 pb-0 flex flex-row flex-wrap items-end">
        <div className="">
          <Typography className={clsx(classes.title)}>
            {props.hasOwnProperty('widget') ? props.widget.title : null}
          </Typography>
        </div>
      </div>
      {renderByTaskType(props.taskType)}
    </Paper>
  );
}

export default React.memo(PropertyStrategyTaskWidgets);
