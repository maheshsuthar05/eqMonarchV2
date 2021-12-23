import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Cookies from 'js-cookie';
import { forgerock } from 'app/config/api';

function Error403Page(props) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-16">
      <div className="max-w-512 text-center">
        <FuseAnimate animation="transition.expandIn" delay={100}>
          <Typography
            variant="h1"
            color="inherit"
            className="font-medium mb-16"
          >
            403
          </Typography>
        </FuseAnimate>

        <FuseAnimate delay={500}>
          <Typography variant="h5" color="textSecondary" className="mb-16">
            Forbidden
          </Typography>
        </FuseAnimate>

        <FuseAnimate delay={600}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className="mb-48"
          >
            You don't have permission to access{' '}
            {Cookies.get(forgerock.cookie.tenantCode)}
          </Typography>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default Error403Page;
