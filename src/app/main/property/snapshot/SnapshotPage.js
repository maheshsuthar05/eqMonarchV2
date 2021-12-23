import React, { useEffect, useState } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useParams } from 'react-router-dom';
import ValuationWidgets from 'app/common/components/widgets/ValuationWidgets';
import WidgetsData from 'app/common/components/widgets/WidgetsData';
import TaskWidgets from 'app/common/components/widgets/TaskWidgets';
import PropertyMilestonePage from '../property-milestone/PropertyMilestonePage';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useDispatch, useSelector } from 'react-redux';
import * as snapActions from './../store/actions/snapshot.actions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ListWidgets from 'app/common/components/widgets/ListWidgets';
import moment from 'moment';
import { formatCurrency } from 'app/common/helpers/common-helper';
import { hasAccess } from 'app/common/helpers/common-helper';
import { resourceKeys } from 'app/main/property/resources/ResourceConfig';
import OfferCountPropertyPage from 'app/main/offer/offer-count-property/OfferCountPropertyPage';

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

const Shapshot = () => {
  const routeParams = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [daysInREO, setdaysInREO] = useState(0);
  const [listingPrice, setListingPrice] = useState(formatCurrency(0));
  const [valuationAmount, setValuationAmount] = useState(formatCurrency(0));

  const [openTaskCount, setOpenTaskCount] = useState(0);
  const [closeTaskCount, setCloseTaskCount] = useState(0);
  const [setOfferCount] = useState(0);

  const counts = useSelector(({ property }) => property.snapshot);

  const createdDate = useSelector(
    ({ property }) => property.get.property?.property?.createdDate
  );
  const contextResources = useSelector(
    ({ common }) => common.IAMResource.contextResources
  );

  const listPriceAmount = useSelector(
    ({ property }) =>
      property.get.property?.property?.listingInformation
        ?.currentlistPriceAmount
  );

  const asIsFairMarketValueAmount = useSelector(
    ({ property }) =>
      property.get.property?.property?.marketingPlan?.asIsFairMarketValueAmount
  );

  useEffect(() => {
    if (counts.TeamOpenTask.status) {
      setOpenTaskCount(counts.openTask.count);
    }
    if (counts.completedTask.status) {
      setCloseTaskCount(counts.completedTask.count);
    }
    if (counts.offer.status) {
      setOfferCount(counts.offer.count);
    }
  }, [
    counts.TeamOpenTask.status,
    setOpenTaskCount,
    counts.completedTask.status,
    setCloseTaskCount,
    counts.offer.status,
    setOfferCount,
    counts.completedTask.count,
    counts.offer.count,
    counts.openTask.count
  ]);

  useEffect(() => {
    if (createdDate) {
      const diffDays = moment(new Date()).diff(createdDate, 'days');
      if (!isNaN(diffDays)) {
        setdaysInREO(diffDays);
      }
    }
    if (listPriceAmount) {
      if (!isNaN(listPriceAmount)) {
        setListingPrice(formatCurrency(listPriceAmount));
      }
    }
    if (asIsFairMarketValueAmount) {
      if (!isNaN(asIsFairMarketValueAmount)) {
        setValuationAmount(formatCurrency(asIsFairMarketValueAmount));
      }
    }
  }, [createdDate, listPriceAmount, asIsFairMarketValueAmount]);

  useEffect(() => {
    dispatch(snapActions.fetchOpenTaskCount(routeParams.caseInstanceId));
  }, [dispatch, routeParams.caseInstanceId]);

  useEffect(() => {
    dispatch(snapActions.fetchCompletedTaskCount(routeParams.caseInstanceId));
  }, [dispatch, routeParams.caseInstanceId]);

  if (
    !hasAccess(
      contextResources,
      resourceKeys.Property_Details_Tab_Snapshot_Page
    )
  ) {
    return null;
  }

  return (
    <div className={clsx('w-full p-12', classes.root)}>
      <FuseAnimateGroup
        enter={{
          animation: 'transition.slideUpBigIn'
        }}
      >
        {/* TASK */}
        <div className={clsx('flex flex-1 flex-col min-w-0', classes.root)}>
          <FuseAnimate animation="transition.slideUpIn" delay={600}>
            <Typography className={clsx('p-16 pb-8 text-12', classes.title)}>
              KPI's
            </Typography>
          </FuseAnimate>
          <div className="flex flex-col sm:flex sm:flex-row">
            <div
              className={clsx('widget flex w-full sm:w-1/4', classes.boxing)}
            >
              <ValuationWidgets
                data={WidgetsData.widgets.listingPrice}
                amount={listingPrice}
              />
            </div>
            <div
              className={clsx('widget flex w-full sm:w-1/4', classes.boxing)}
            >
              <ValuationWidgets
                data={WidgetsData.widgets.valuation}
                amount={valuationAmount}
              />
            </div>
            <div
              className={clsx('widget flex w-full sm:w-1/4', classes.boxing)}
            >
              <TaskWidgets
                widget={WidgetsData.widgets.daysInReo}
                counts={daysInREO}
              />
            </div>
            <div
              className={clsx('widget flex w-full sm:w-1/4', classes.boxing)}
            >
              <TaskWidgets
                widget={WidgetsData.widgets.openTask}
                counts={openTaskCount}
                redirectUrl={`/property/details/${routeParams.caseInstanceId}/TaskManagement/Open`}
              />
            </div>
            <div
              className={clsx('widget flex w-full sm:w-1/4', classes.boxing)}
            >
              <TaskWidgets
                widget={WidgetsData.widgets.closeTask}
                counts={closeTaskCount}
                redirectUrl={`/property/details/${routeParams.caseInstanceId}/TaskManagement/Close`}
              />
            </div>
          </div>
        </div>
        {/* Offers */}
        {hasAccess(
          contextResources,
          resourceKeys.Property_Details_Tab_Snapshot_Offer_Count
        ) && <OfferCountPropertyPage />}

        {/* PRESERVATION ACTIVITIES */}
        <div className={clsx('flex flex-1 flex-col min-w-0')}>
          <FuseAnimate animation="transition.slideUpIn" delay={600}>
            <Typography className={clsx('p-16 pb-8 text-12', classes.title)}>
              PRESERVATION ACTIVITIES
            </Typography>
          </FuseAnimate>
          <div className="flex flex-col sm:flex sm:flex-row">
            <div
              className={clsx('widget flex w-full sm:w-1/4', classes.boxing)}
            >
              <ListWidgets widget={WidgetsData.widgets.inspection} />
            </div>
            <div
              className={clsx('widget flex w-full sm:w-1/4', classes.boxing)}
            >
              <ListWidgets widget={WidgetsData.widgets.appraisal} />
            </div>
            <div
              className={clsx('widget flex w-full sm:w-1/4', classes.boxing)}
            >
              <ListWidgets widget={WidgetsData.widgets.Title} />
            </div>
            <div
              className={clsx('widget flex w-full sm:w-1/4', classes.boxing)}
            >
              <ListWidgets widget={WidgetsData.widgets.Occupancy} />
            </div>
          </div>
        </div>

        {/* REO */}
        <div className={clsx('flex flex-1 flex-col min-w-0')}>
          <FuseAnimate animation="transition.slideUpIn" delay={600}>
            <Typography className={clsx('p-16 pb-8 text-12', classes.title)}>
              REO
            </Typography>
          </FuseAnimate>
          <div className="flex flex-col sm:flex sm:flex-row">
            <div
              className={clsx('widget flex w-full sm:w-1/4', classes.boxing)}
            >
              <ListWidgets widget={WidgetsData.widgets.reo} />
            </div>
            <div
              className={clsx('widget flex w-full sm:w-1/4', classes.boxing)}
            >
              <ListWidgets widget={WidgetsData.widgets.marketing} />
            </div>
            <div
              className={clsx('widget flex w-full sm:w-1/4', classes.boxing)}
            >
              <ListWidgets widget={WidgetsData.widgets.closing} />
            </div>
            <div
              className={clsx('widget flex w-full sm:w-1/4', classes.boxing)}
            >
              <ListWidgets widget={WidgetsData.widgets.disposition} />
            </div>
          </div>
        </div>

        {/* FINANCIAL */}
        <div className="flex flex-1 flex-col min-w-0">
          <FuseAnimate animation="transition.slideUpIn" delay={600}>
            <Typography className={clsx('p-16 pb-8 text-12', classes.title)}>
              TIMELINE
            </Typography>
          </FuseAnimate>
          <div className="flex flex-col sm:flex sm:flex-row">

            <div className={clsx('widget flex w-full', classes.boxing)}>
              <PropertyMilestonePage />
            </div>
          </div>
        </div>
  
      </FuseAnimateGroup>
    </div>
  );
};

export default Shapshot;
