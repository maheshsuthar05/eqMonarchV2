import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as snapActions from './../store/actions/snapshot.actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment';
import { formatCurrency } from 'app/common/helpers/common-helper';
import * as OfferActions from 'app/main/offer/store/actions';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  textSmall: {
    color: theme.palette.primary.contrastDark
  },
  verticalText: {
    letterSpacing: '2px',
    writingMode: 'vertical-rl'
  },
  textValueColor: {
    color: '#666'
  },
  titleColor: {
    background: theme.palette.background.widgetTitleBg,
    color: theme.palette.primary.widgetTitleColor,
    '&::before': {
      borderRight: theme.palette.flatWidgetBdr
    }
  }
}));

const PropertyFlatWidget = () => {
  const classes = useStyles();
  const routeParams = useParams();
  const dispatch = useDispatch();
  const [daysInREO, setdaysInREO] = useState(0);
  const [listingPrice, setListingPrice] = useState(formatCurrency(0));
  const [valuationAmount, setValuationAmount] = useState(formatCurrency(0));
  const [openTaskCount, setOpenTaskCount] = useState(0);
  const [closeTaskCount, setCloseTaskCount] = useState(0);
  const [offerCounts, setOfferCounts] = useState([]);

  const flwFormRefresh = useSelector(
    ({ flowableFormRefresh }) => flowableFormRefresh.formRefreshFlag
  );
  const counts = useSelector(({ property }) => property.snapshot);

  const KPIData = useSelector(({ property }) => property.get?.property);

  const offerCount = useSelector(({ offer }) => offer.offerList.offerCount);

  useEffect(() => {
    dispatch(OfferActions.getOfferCount());
  }, [dispatch]);

  useEffect(() => {
    setOfferCounts(OfferActions.getOfferCountData(offerCount));
  }, [offerCount]);

  useEffect(() => {
    if (counts.openTask.status) {
      setOpenTaskCount(counts.openTask.count);
    }
    if (counts.completedTask.status) {
      setCloseTaskCount(counts.completedTask.count);
    }
  }, [
    counts.openTask.status,
    setOpenTaskCount,
    counts.completedTask.status,
    setCloseTaskCount,
    counts.offer.status,
    counts.completedTask.count,
    counts.offer.count,
    counts.openTask.count
  ]);

  useEffect(() => {
    if (!_.isEmpty(KPIData)) {
      if (!_.isNull(KPIData?.property?.createdDate)) {
        const diffDays = moment(new Date()).diff(
          KPIData?.property?.createdDate,
          'days'
        );
        setdaysInREO(diffDays);
      }
    }
    if (!_.isNull(KPIData?.listingInformations[0]?.currentListPriceAmount)) {
      setListingPrice(
        formatCurrency(KPIData?.listingInformations[0]?.currentListPriceAmount)
      );
    }
    if (!_.isNull(KPIData?.marketingPlan?.asIsFairMarketValueAmount)) {
      setValuationAmount(
        formatCurrency(KPIData?.marketingPlan?.asIsFairMarketValueAmount)
      );
    }
  }, [KPIData]);

  useEffect(() => {
    dispatch(snapActions.fetchOpenTaskCount(routeParams.caseInstanceId));
  }, [dispatch, routeParams.caseInstanceId, flwFormRefresh]);

  useEffect(() => {
    dispatch(snapActions.fetchCompletedTaskCount(routeParams.caseInstanceId));
  }, [dispatch, routeParams.caseInstanceId, flwFormRefresh]);

  return (
    <div className="flex w-full ml-8">
      <div className="flex w-full pt-4">
        <div className="flex w-full mt-4 flex-wrap">
          <div className="flex w-full">
            <h5 className={clsx('card-Title', classes.titleColor)}>KPI's</h5>
            <div className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-2 w-full flex pl-16">
              <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                <span className="pb-2">Listing Price</span>
                <span className={clsx('font-normal', classes.textValueColor)}>
                  {listingPrice}
                </span>
              </li>
              <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                <span className="pb-2">Valuation</span>
                <span className={clsx('font-normal', classes.textValueColor)}>
                  {valuationAmount}
                </span>
              </li>
              <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                <span className="pb-2">Days in REO</span>
                <span className={clsx('font-normal', classes.textValueColor)}>
                  {daysInREO}
                </span>
              </li>
              <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                <span className="pb-2">Open</span>
                <span className={clsx('font-normal', classes.textValueColor)}>
                  {openTaskCount} <span>Tasks</span>
                </span>
              </li>
              <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                <span className="pb-2">Completed</span>
                <span className={clsx('font-normal', classes.textValueColor)}>
                  {closeTaskCount} <span>Tasks</span>
                </span>
              </li>
            </div>

            <h5 className={clsx('card-Title', classes.titleColor)}>Offers</h5>
            <div className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-2 w-full flex pl-16">
              {!_.isEmpty(offerCounts) &&
                _.map(offerCounts, (res, inx) => {
                  return (
                    <li
                      key={inx}
                      className={clsx('flex flex-col mb-4', classes.textSmall)}
                    >
                      <span className="pb-2">{res.key}</span>
                      <span
                        className={clsx('font-normal', classes.textValueColor)}
                      >
                        {res.count === null ? 0 : res.count}
                      </span>
                    </li>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFlatWidget;
