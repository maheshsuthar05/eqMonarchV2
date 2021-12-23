import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

function ResourceNotFoundPage() {
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
            Sorry we could not find ResouceConfig for the page you are looking for
          </Typography>
        </FuseAnimate>

        <Link className="font-medium" to="/home/dashboard">
          Go back to dashboard
        </Link>
      </div>
    </div>
  );
}

export default ResourceNotFoundPage;
