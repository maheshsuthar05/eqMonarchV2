import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core';
import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
import { FaCloudUploadAlt } from 'react-icons/fa';
import clsx from 'clsx';
import PreviewImages from './PreviewImages';
import { useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import { hasAccess } from 'app/common/helpers/common-helper';
import { resourceKeys } from 'app/main/property/resources/ResourceConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: theme.shadows[0]
  },
  imgWidth: {
    width: '100%',
    height: '100%', //auto
    border: '1px solid #ccc',
    padding: '2px',
    position: 'absolute',
    top: '0',
    left: '0',
    objectFit: 'cover'
  },
  textSmall: {
    fontSize: '1.1rem'
  },
  iconPlace: {
    padding: '5px',
    width: '35px',
    borderRadius: '4px',
    margin: '5px 0',
    color: theme.palette.background.iconcolor,
    background: '#fff',
    border: '1px solid #ccc',
    height: 'auto'
  }
}));

const MonarchImageCarousel = (props) => {
  const classes = useStyles();
  const contextResources = useSelector(
    ({ common }) => common.IAMResource.contextResources
  );
  const onUploadHandler = () => {
    props.onUploadClick();
  };

  return (
    <div className="object-cover w-full">
      <div className="flex w-full">
        <img
          src={props.images[0]}
          alt=""
          className={clsx('mobImage', classes.imgWidth)}
        />
        <div className="w-full icon-container">
          <PreviewImages images={props.images} hasImg={props.hasImages} />
          {hasAccess(
            contextResources,
            resourceKeys.Property_Details_Header_Upload_Images
          ) && (
            <Tooltip title="Upload">
              <div
                onClick={onUploadHandler}
                className="text-center text-xs text-blue-800 underline font-bold cursor-pointer"
              >
                <FaCloudUploadAlt
                  className={clsx(
                    'text-2xl inline-block align-middle iconIpad',
                    classes.iconPlace
                  )}
                />
                <span
                  className={clsx('align-text-top', classes.textSmall)}
                ></span>
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(MonarchImageCarousel);
