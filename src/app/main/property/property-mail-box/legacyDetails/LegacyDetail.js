import FuseAnimate from '@fuse/core/FuseAnimate';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import MonarchPageSimple from '@monarch/core/MonarchPageSimple';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { withRouter } from 'react-router';
import {
  convertNameToAvatar,
  convertTimeStamp
} from 'app/common/helpers/common-helper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  arrowIcon: {
    cursor: 'pointer'
  },
  details: {
    marginLeft: '5%',
    border: '1px solid #d9d9d9',
    padding: '7px',
    width: 'fit-content',
    borderRadius: '5px'
  }
}));
const LegacyDetail = (props) => {
  const classes = useStyles();
  const legacyDetails = useSelector(
    ({ property }) => property.messages.legacyDetails
  );
  const [showDetails, setShowDetails] = useState(false);

  const handleChange = (event) => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <MonarchPageSimple
        content={
          <div className={clsx(classes.root, 'p-12')}>
            <div className="p-16 sm:p-24">
              <FuseAnimate animation="transition.slideUpIn" delay={200}>
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center justify-start">
                      <Avatar>
                        {convertNameToAvatar(legacyDetails.messageFrom)}
                      </Avatar>
                      <div className="flex flex-col mx-8">
                        <span>{legacyDetails.messageFrom}</span>
                        <div>
                          to me{' '}
                          {showDetails ? (
                            <ExpandLessIcon
                              onClick={handleChange}
                              className={classes.arrowIcon}
                            />
                          ) : (
                            <ExpandMoreIcon
                              onClick={handleChange}
                              className={classes.arrowIcon}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {showDetails && (
                    <div className={clsx(classes.details)}>
                      {showDetails && (
                        <div className="flex">
                          <Typography variant="body2" className="flex flex-col">
                            <span>From:</span>
                            <span>To:</span>
                            <span>Date:</span>
                          </Typography>

                          <Typography
                            variant="body2"
                            color="textSecondary"
                            className="px-4 flex flex-col"
                          >
                            <span>{legacyDetails.messageFrom}</span>
                            <span>
                              {legacyDetails.recipients.map(
                                (res) => `${res.messageTo};`
                              )}
                            </span>
                            <span>
                              {convertTimeStamp(
                                legacyDetails.createdDate,
                                true
                              )}
                            </span>
                          </Typography>
                        </div>
                      )}
                    </div>
                  )}
                  <Typography
                    variant="body2"
                    dangerouslySetInnerHTML={{
                      __html: legacyDetails.messageBody
                    }}
                  />

                  <Divider className="my-16" />
                </div>
              </FuseAnimate>
            </div>
          </div>
        }
        innerScroll
      />
    </>
  );
};

export default withRouter(LegacyDetail);
