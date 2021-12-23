import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import clsx from 'clsx'
import FuseLoading from '@fuse/core/FuseLoading';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  },
  loader: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  border: {
    // border: '1px solid rgba(0,0,0,0.07)'
  },
  table: {
    border: '1px solid rgba(0,0,0,0.07)'
  }
}));

const RulesTable = (props) => {
  const classes = useStyles();
  const results = useSelector(({ property }) => property.decision.results);
  if (_.isNull(results)) {
    return <FuseLoading />;
  }
  return !_.isNull(results.rules) && !_.isNull(results.inputs) ? (
    <div className="flex w-full">
      <Box margin={1} className={clsx('w-2/4',classes.border)}>
        <Typography className="text-lg font-bold" component="div">
          Rules
        </Typography>
        <Table size="small" aria-label="rules" className={classes.table}>
          <TableHead className={classes.root}>
            <TableRow className="font-bold">
              {results.rules.columns.map((column, index) => (
                <TableCell key={'rule-th-' + index}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {results.rules.rows.map((row, rowIndex) => (
              <TableRow key={'rule-tr-' + rowIndex}>
                {results.rules.columns.map((column, colIndex) => (
                  <TableCell
                    key={'rule-td-' + colIndex}
                    style={{ backgroundColor: row[column].color }}
                  >
                    {row[column].text}&nbsp;&nbsp;&nbsp;
                    {column === 'First' && row[column].valid === '1' && (
                      <CheckCircleOutlineIcon style={{ color: '#009900' }} />
                    )}
                    {column === 'First' && row[column].valid === '2' && (
                      <CancelIcon style={{ color: '#990000' }} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box margin={1} className={clsx('w-2/4',classes.border)}>
        <Typography className="text-lg font-bold" component="div">
          Inputs
        </Typography>
        <Table size="small" aria-label="inputs" className={classes.table}>
          <TableHead className={classes.root}>
            <TableRow className="font-bold">
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.inputs.map((input, index) => (
              <TableRow key={'input-tr-' + index}>
                <TableCell>{input.name}</TableCell>
                <TableCell>{input.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </div>
  ) : (
    <Typography variant="h6" gutterBottom component="div">
      No data found
    </Typography>
  );
};

export default RulesTable;
