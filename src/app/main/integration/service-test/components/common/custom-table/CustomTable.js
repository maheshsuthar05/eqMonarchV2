import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const CustomTable = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.keySec}>KEY</th>
            <th className={classes.resValue}>VALUE</th>
          </tr>
        </thead>
        <tbody>
          {props.data.length !== 0 &&
            props.data.map((res, key) => {
              return (
                <tr key={key}>
                  <td className={classes.resValue}>{res.name}</td>
                  <td className={classes.resValue}>{res.value}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '7%',
    marginTop: '5%'
  },
  keySec: {
    width: '46.5%',
    paddingLeft: '2%'
  },
  resValue: {
    paddingLeft: '2%',
    wordBreak: 'break-word'
  },
  table: {
    width: '93%',
    textAlign: 'center',
    border: '1px solid #dfdfdf',
    '& th,td': {
      border: '1px solid #dfdfdf'
    },
    '& tbody': {
      textAlign: 'justify'
    },
    '& thead': {
      textAlign: 'justify'
    }
  }
});

export default CustomTable;
