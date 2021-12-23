import { IconButton, makeStyles, Tooltip, useTheme } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import Tour from 'reactour';
import ExploreIcon from '@material-ui/icons/Explore';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import history from '@history';
import clsx from 'clsx';
import _ from '@lodash';
import { exploreTourStart } from 'app/common/store/actions/explore-tour.action';

const ExploreTour = () => {
  const [exploreButton, setExploreButton] = useState(true);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [current] = useState(1);
  const [tour, setTour] = useState([]);
  const dispatch = useDispatch();
  const tourData = useSelector(({ common }) => common.explore.exploreData);
  const exploreFlag = useSelector(({ common }) => common.explore.exploreFlag);
  const useStyles = makeStyles((theme) => ({
    tour: {
      display: exploreButton ? 'block' : 'none',
      color: theme.palette.navigation.horizontal.primary.contrastText
    }
  }));
  const classes = useStyles();

  const disableBody = (target) => disableBodyScroll(target);
  const enableBody = (target) => enableBodyScroll(target);

  const theme = useTheme();
  const historyListen = useHistory();

  const onExplore = () => {
    setIsTourOpen(true);
  };

  const getFirstItem = (thePath) => {
    const segments = thePath.split('/');
    return `/${segments[1]}/${segments[2]}`;
  };

  const fetchData = useCallback(
    (pathname) => {
      const toPath = getFirstItem(pathname);
      const data = _.find(tourData, { route: toPath }, 'steps');
      if (data !== undefined) {
        setExploreButton(true);
        setTour(data);
      } else setExploreButton(false);
    },
    [tourData]
  );

  useEffect(() => {
    dispatch(exploreTourStart());
  }, [dispatch]);

  useEffect(() => {
    if (tourData.length > 0) {
      fetchData(history.location.pathname);
      historyListen.listen((location) => {
        fetchData(location.pathname);
      });
    }
  }, [setExploreButton, fetchData, tourData, historyListen]);

  return (
    <div>
      {isTourOpen && (
        <Tour
          isOpen={isTourOpen}
          steps={tour.steps}
          onRequestClose={() => setIsTourOpen(false)}
          rounded={5}
          onAfterOpen={disableBody}
          onBeforeClose={enableBody}
          accentColor={theme.palette.secondary.main}
          goToStep={current}
          inViewThreshold={1}
          styles={{
            options: {
              arrowColor: '#e3ffeb',
              backgroundColor: '#e3ffeb',
              overlayColor: 'rgba(79, 26, 0, 0.4)',
              primaryColor: '#000',
              textColor: '#004a14',
              width: 900,
              zIndex: 1000
            }
          }}
        />
      )}
      {exploreFlag && (
        <Tooltip title={`Explore`} placement={'bottom'}>
          <IconButton
            className={clsx(classes.tour, 'w-40 h-40 p-0')}
            onClick={onExplore}
            size="small"
          >
            <ExploreIcon className="text-16" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default ExploreTour;
