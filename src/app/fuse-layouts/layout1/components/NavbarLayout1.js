import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles({
  content: {
    overflowX: 'hidden',
    overflowY: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    // background:
    //   'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 40px, 100% 10px',
    backgroundAttachment: 'local, scroll'
  }
});

function NavbarLayout1(props) {
  const classes = useStyles();

  return (
    <div
      className={clsx('flex flex-col overflow-hidden h-full', props.className)}
    >
      <FuseScrollbars
        className={clsx(classes.content)}
        option={{ suppressScrollX: true }}
      >
        <Navigation layout="vertical" />
      </FuseScrollbars>
    </div>
  );
}

export default React.memo(NavbarLayout1);
