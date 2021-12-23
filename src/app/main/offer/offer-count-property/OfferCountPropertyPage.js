import FuseAnimate from '@fuse/core/FuseAnimate';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import OfferCountWidgets from 'app/common/components/widgets/OfferCountWidgets';
import * as OfferActions from 'app/main/offer/store/actions';
import reducer from 'app/main/offer/store/reducers';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.paper
  },
  title: {
    color: theme.palette.secondary.dark,
    fontWeight: 'bold !Important'
  },
  boxing: {
    padding: theme.spacing(1)
  },
  badge: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  iconButton: {
    color: 'inherity'
  }
}));

function OfferCountPropertyPage(props) {
  const [loading] = useState(false);
  const [offerCounts, setOfferCounts] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const caseInstanceId = useSelector(
    ({ property }) => property.get?.caseInstanceId
  );
  const offerCount = useSelector(({ offer }) => offer.offerList.offerCount);
  useEffect(() => {
    dispatch(OfferActions.getOfferCount());
  }, [dispatch]);

  useEffect(() => {
    setOfferCounts(OfferActions.getOfferCountData(offerCount));
  }, [offerCount]);

  return (
    <>
      {!loading && (
        <>
          <div className={clsx('flex flex-1 flex-col min-w-0')}>
            <FuseAnimate animation="transition.slideUpIn" delay={600}>
              <Typography className={clsx('p-16 pb-8 text-14', classes.title)}>
                OFFERS
              </Typography>
            </FuseAnimate>
            <div className="flex flex-col sm:flex sm:flex-row">
              {offerCounts.map(
                (offerCount) =>
                  offerCount && (
                    <div
                      className={clsx(
                        'widget flex w-full sm:w-1/4',
                        classes.boxing
                      )}
                      key={offerCount.key}
                    >
                      <OfferCountWidgets
                        offerCount={offerCount}
                        redirectUrl={`/property/details/${caseInstanceId}/offers`}
                      />
                    </div>
                  )
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default withReducer('offer', reducer)(OfferCountPropertyPage);
