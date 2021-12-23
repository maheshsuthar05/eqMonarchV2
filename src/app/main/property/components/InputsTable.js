import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React from 'react';

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
    border: '1px solid rgba(0,0,0,0.07)'
  }
}));

const InputsTable = (props) => {
  const classes = useStyles();
  const { inputs, loading } = props;

  return loading ? (
    <div className={classes.loader}>
      <CircularProgress />
    </div>
  ) : inputs ? (
    <Box margin={1} className={classes.border}>
      <Typography className="pl-16 text-lg font-bold" component="div">
        Inputs
      </Typography>
      <Table size="small" aria-label="inputs">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inputs.map((input, index) => (
            <TableRow key={'input-tr-' + index}>
              <TableCell>{input.name}</TableCell>
              <TableCell>{input.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  ) : (
    <Typography variant="h6" gutterBottom component="div">
      No data found
    </Typography>
  );
};

export default InputsTable;
