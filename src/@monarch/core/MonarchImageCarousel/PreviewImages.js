import { makeStyles } from '@material-ui/core';
import { openModal } from 'app/store/actions';
import clsx from 'clsx';
import React from 'react';
import { BsFillEyeFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import MonarchCarouselContainer from './CarouselContent';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
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

const PreviewImages = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const openCarousel = () => {
    dispatch(
      openModal({
        children: <MonarchCarouselContainer images={props.images} />,
        title: 'Property Images',
        maxwidth: 'sm'
      })
    );
  };

  const disable = {
    pointerEvents: 'none',
    opacity: '0.7'
  };

  return (
    <Tooltip title="Preview">
      <div
        onClick={openCarousel}
        style={!props.hasImg ? disable : null}
        className="text-center text-xs pt-6 text-blue-800 underline font-bold cursor-pointer"
      >
        {/* <BsEye className={clsx("text-2xl inline-block align-middle", classes.iconPlace)} /> */}
        <BsFillEyeFill
          className={clsx(
            'text-2xl inline-block align-middle iconIpad',
            classes.iconPlace
          )}
        />
        <span className={clsx('align-text-top', classes.textSmall)}></span>
      </div>
    </Tooltip>
  );
};

export default PreviewImages;
