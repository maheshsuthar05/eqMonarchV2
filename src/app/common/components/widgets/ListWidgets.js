import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper
  },
  title: {
    color: theme.palette.primary.dark,
    fontWeight: 'bold !Important',
    fontSize: '12px'
  }
}));

export default function ListWidgets(props) {
  const classes = useStyles();

  return (
    <Paper className="w-full rounded-8 shadow-1 border-0">
      <div className="p-16 pb-0 flex flex-row flex-wrap items-end">
        <div className="">
          <Typography className={clsx(classes.title)}>
            {props.widget.title}
          </Typography>
        </div>
      </div>
      <div className={clsx('flex flex-1 flex-col min-w-0', classes.root)}>
        <div className="flex flex-col sm:flex sm:flex-row">
          <div className="widget flex w-full item-center p-16">
            <table className="w-full item-center">
              <tbody>
                {props.widget.data1.map((_item) => (
                  <tr key={_item.key}>
                    <td className="text-right">
                      <Typography color="textSecondary">{_item.key}</Typography>
                    </td>
                    <td className="px-16">
                      <Typography>{_item.value}</Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {props.widget.data2.length > 0 && (
            <div className="widget flex w-full p-16">
              <table className="w-full flex">
                <tbody>
                  {props.widget.data2.map((_item) => (
                    <tr>
                      <td className="text-right">
                        <Typography color="textSecondary">
                          {_item.key}
                        </Typography>
                      </td>
                      <td className="px-16">
                        <Typography>{_item.value}</Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Paper>
  );
}
