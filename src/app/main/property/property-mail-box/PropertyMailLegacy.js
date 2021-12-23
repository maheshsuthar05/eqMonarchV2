import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import FuseLoading from '@fuse/core/FuseLoading';
import MonarchPageSimple from '@monarch/core/MonarchPageSimple';
import {
  getPropertyLegacyDetails,
  getlegacyMessageStart
} from 'app/main/property/store/actions';
import LegacyDetailPage from 'app/main/property/property-mail-box/legacyDetails/LegacyDetailPage';
import Box from '@material-ui/core/Box';
import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';
import {
  convertNameToAvatar,
  convertTimeStamp
} from 'app/common/helpers/common-helper';

const useStyles = makeStyles((theme) => ({
  mailItem: {
    borderBottom: `1px solid  ${theme.palette.divider}`,

    '&.unread': {
      background: 'rgba(97, 218, 251, 0.08)'
    },
    '&.selected': {
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        display: 'block',
        height: '100%',
        width: 3,
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  avatar: {
    backgroundColor: theme.palette.primary[500],
    fontSize: '1.5rem'
  }
}));

const PropertyMailLegacy = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const legacyFlag = useSelector(
    ({ property }) => property.messages.legacyFlag
  );
  const stateAction = useSelector(
    ({ property }) => property.messages.stateAction
  );
  const legacyMessage = useSelector(
    ({ property }) => property.messages.legacyMessage
  );

  useEffect(() => {
    dispatch(getlegacyMessageStart());
  }, [dispatch]);

  const handleDetailPageRoute = (payload) => {
    dispatch(getPropertyLegacyDetails(payload));
  };

  return (
    <div className="pt-12">
      {!stateAction ? (
        <FuseLoading />
      ) : legacyFlag ? (
        <LegacyDetailPage />
      ) : (
        <MonarchPageSimple
          content={
            <div>
              {legacyMessage.messages.map((legacy, inx) => {
                return (
                  <ListItem
                    dense
                    button
                    onClick={() => handleDetailPageRoute(legacy)}
                    className={clsx(classes.mailItem)}
                    key={inx}
                  >
                    <div style={{ width: '100%' }}>
                      <Box display="flex">
                        <Box
                          p={1}
                          display="inline-flex"
                          width="24%"
                          style={{ wordBreak: 'break-word' }}
                        >
                          <div
                            className="flex"
                            style={{ alignItems: 'center' }}
                          >
                            <Avatar className={classes.avatar}>
                              {convertNameToAvatar(legacy.messageFrom)}
                            </Avatar>
                            <Typography variant="subtitle1" className="mx-8">
                              {legacy.messageFrom}
                            </Typography>
                          </div>
                        </Box>
                        <Box p={1} flexGrow={1} width="62%">
                          <Typography variant="subtitle1" className="mx-8">
                            {_.truncate(
                              legacy.messageBody.replace(/<(?:.|\n)*?>/gm, ''),
                              {
                                length: 100
                              }
                            )}
                          </Typography>
                        </Box>
                        <Box p={0} fontSize={12} width="14%">
                          <Box p={0.5}>
                            {convertTimeStamp(legacy.createdDate)}
                          </Box>
                          <Box display="flex">
                            <Box p={0.5}>
                              {/* <MailChip title={props.mail.TENANT_ID} color="#ff7961" /> */}
                            </Box>
                            <Box p={0.5} style={{ wordBreak: 'break-word' }}>
                              {/* <MailChip title={props.mail.LOAN_NUMBER} color="#757ce8" /> */}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </div>
                  </ListItem>
                );
              })}
            </div>
          }
          innerScroll
        />
      )}
    </div>
  );
};

export default withRouter(PropertyMailLegacy);
