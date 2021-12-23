import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseLoading from '@fuse/core/FuseLoading';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { truncateString } from 'app/common/helpers/common-helper';
import * as Actions from 'app/main/offer/store/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function OfferSummaryContacts(props) {
  const dispatch = useDispatch();
  const { showHeading, offerId, offerDetails } = props;

  const offerContacts = useSelector(
    ({ offer }) => offer.offerDetails.offerContacts
  );

  const offerContatsLoaded = useSelector(
    ({ offer }) => offer.offerDetails.offerContatsLoaded
  );

  useEffect(() => {
    dispatch(Actions.fetchOfferContactsStart(offerId, offerDetails));
  }, [dispatch, offerId, offerDetails]);

  return (
    <>
      <FuseAnimateGroup
        enter={{
          animation: 'transition.slideUpBigIn'
        }}
        key={'offer_summary_contact_useAnimateGroup'}
      >
        <Card
          className="w-full mb-16"
          elevation={0}
          key={'offer_summary_contact_Card'}
        >
          {showHeading && (
            <AppBar
              position="static"
              elevation={0}
              key={'offer_summary_contact_heading'}
            >
              <Toolbar className="px-8" key={'offer_summary_contact_Toolbar'}>
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12"
                >
                  Contacts
                </Typography>
              </Toolbar>
            </AppBar>
          )}
          <CardContent
            className="flex flex-wrap p-0"
            key={'offer_summary_contact_CardContent'}
          >
            {!offerContatsLoaded ? (
              <FuseLoading />
            ) : (
              offerContacts &&
              (offerContacts.length > 0 ? (
                <>
                  {offerContacts.map((contact) => {
                    return (
                      <div className="mb-16" key={`${contact?.ContactType}`}>
                        <Tooltip
                          title={`${contact?.Name}`}
                          aria-label="add"
                          placement="bottom-start"
                        >
                          <span>
                            <>
                              <Typography className="font-bold mb-4 text-15">
                                {contact?.ContactType} :{' '}
                                {truncateString(contact?.Name, 15)}
                              </Typography>
                            </>
                          </span>
                        </Tooltip>
                        <div className="ml-8">
                          <Typography className="text-start text-16 font-400">
                            Company Name : {contact?.CompanyName}
                          </Typography>
                          <Typography
                            className="text-start text-14 font-500"
                            color="textSecondary"
                          >
                            Address : {contact?.Address1} <br />
                            City : {contact?.City}
                          </Typography>
                          <Typography
                            className="text-start text-13 font-600 mt-4"
                            color="textSecondary"
                          >
                            Phone : {contact?.Phone} <br />
                            Fax : {contact?.Fax} <br />
                            Email :{' '}
                            <Tooltip
                              title={`${contact?.Email}`}
                              aria-label="add"
                              placement="bottom-start"
                            >
                              <span>
                                <>{truncateString(contact?.Email, 22)}</>
                              </span>
                            </Tooltip>
                          </Typography>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="flex flex-1 items-center justify-center">
                    <Typography color="textSecondary" className="text-24 my-24">
                      Offer Contacts Not found!
                    </Typography>
                  </div>
                </>
              ))
            )}
          </CardContent>
        </Card>
      </FuseAnimateGroup>
    </>
  );
}

export default OfferSummaryContacts;
