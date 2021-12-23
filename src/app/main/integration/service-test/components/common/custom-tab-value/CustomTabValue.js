import React from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { makeStyles } from '@material-ui/core/styles';
import ReactJson from 'react-json-view';
import XMLViewer from 'react-xml-viewer';

const customTheme = {
  attributeKeyColor: 'black',
  attributeValueColor: 'black',
  tagColor: 'black',
  textColor: 'black'
};

export const CustomTabValue = ({ tab, loading, data }) => {
  const classes = useStyles();
  let responseView;
  switch (tab) {
    case 'pretty':
      responseView = loading ? (
        <FuseLoading />
      ) : data.hasOwnProperty('headers') &&
        data.headers['content-type'] === 'application/xml' ? (
        <XMLViewer xml={data.data} />
      ) : (
        <ReactJson
          name={null}
          displayObjectSize={true}
          displayDataTypes={true}
          theme="flat"
          src={
            data !== null && data !== undefined
              ? data.data
              : { Error: 'Please check the request URL' }
          }
          enableClipboard={false}
        />
      );
      break;
    case 'raw':
      responseView = loading ? (
        <FuseLoading />
      ) : data.hasOwnProperty('headers') &&
        data.headers['content-type'] === 'application/xml' ? (
        <XMLViewer xml={data.data} theme={customTheme} />
      ) : (
        <ReactJson
          name={null}
          displayObjectSize={false}
          displayDataTypes={false}
          style={{ color: 'blue' }}
          src={
            data !== null && data !== undefined
              ? data.data
              : { Error: 'Please check the request URL' }
          }
          enableClipboard={false}
        />
      );
      break;
    case 'preview':
      responseView = loading ? (
        <FuseLoading />
      ) : data.hasOwnProperty('headers') &&
        data.headers['content-type'] === 'application/xml' ? (
        data.data
      ) : data !== null && data !== undefined ? (
        JSON.stringify(data.data)
      ) : (
        JSON.stringify({ Error: 'Please check the request URL' })
      );
      break;
    default:
      break;
  }
  return <div className={classes.resOut}>{responseView}</div>;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  resOut: {
    textAlignLast: 'left',
    overflow: 'scroll',
    marginTop: theme.spacing(1),
    height: '68vh'
  }
}));
