import { Button, IconButton, makeStyles, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Joyride, {
  CallBackProps,
  STATUS,
  Step,
  StoreHelpers
} from 'react-joyride';
import ExploreIcon from '@material-ui/icons/Explore';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useHistory } from 'react-router';
import history from '@history';
import clsx from 'clsx';
import _ from '@lodash';

const tourData = [
  {
    route: '/home/dashboard',
    steps: [
      {
        content: <h2>Let's begin our journey!</h2>,
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        placement: 'center',
        target: 'body',
        title: ''
      },
      {
        target: '[data-tour="Navigation_Marketplace"]',
        content: `Ok, let's start with the name of the Tour that is about to begin.`,
        placement: 'right',
        title: 'Get Started'
      },
      {
        target: '[data-tour="Navigation_Servicer_Workspace"]',
        content: 'Servicer_WorkSpace',
        placement: 'right',
        title: 'Servicer_WorkSpace'
      },
      {
        target: '[data-tour="Navigation_Compliance"]',
        content: 'Compliance',
        placement: 'right',
        title: 'Compliance'
      },
      {
        target: '[data-tour="Navigation_Configuration"]',
        content: 'Configuration',
        placement: 'right',
        title: 'Configuration'
      },
      {
        target: '[data-tour="Navigation_Platform"]',
        content: 'Navigation_Platform',
        placement: 'top',
        title: 'Navigation_Platform'
      },
      {
        target: '[data-tour="Navigation_Servicer_Workspace_PropertyView"]',
        content: 'property search',
        title: 'property search'
      },
      {
        target: '[data-tour="Navigation_Servicer_Workspace_AddProperty"]',
        content: 'Add property',
        title: 'Add property'
      },
      {
        target: '[data-tour="Navigation_Compliance_RolesandPermissionAudit"]',
        content: 'Roles and permissions Audit',
        title: 'Roles and permissions Audit'
      }
    ]
  },
  {
    route: '/property/details',
    steps: [
      {
        target: '[data-tour="HeaderEditButton"]',
        content: 'Edit Property Header Button',
        placement: 'left',
        title: 'Edit Property Header Button'
      },
      {
        target: '[data-tour="HeaderExpandButton"]',
        content: 'Expand Property Header Button',
        title: 'Expand Property Header Button'
      },
      {
        // target: '[data-tour="Property_Details_Tab_Milestone"]',
        content: 'Snap Shot',
        title: 'Snap Shot',
        target: '.Property_Details_Tab_Milestone1'
      },
      {
        target: '[data-tour="Property_Details_Tab_Details"]',
        content: 'Property Details',
        title: 'Property Details'
      },
      {
        target: '[data-tour="Property_Details_Tab_Opentasks"]',
        content: 'Open Tasks',
        title: 'Open Tasks'
      },
      {
        target: '[data-tour="Property_Details_Tab_CompletedTask"]',
        content: 'Completed Task',
        title: 'Completed Task'
      },
      {
        target: '[data-tour="Property_Details_Tab_Rules"]',
        content: 'Rules Tab',
        title: 'Rules Tab'
      },
      {
        target: '[data-tour="Property_Details_Tab_Documents"]',
        content: 'Documents Tab',
        title: 'Documents Tab'
      },
      {
        target: '[data-tour="Property_Details_Tab_Roles"]',
        content: 'Roles Tab',
        title: 'Roles Tab'
      },
      {
        target: '[data-tour="Property_Details_Tab_Messages"]',
        content: 'Messages Tab',
        title: 'Messages Tab'
      },
      {
        target: '[data-tour="Property_Details_Tab_Strategy"]',
        content: 'Strategy Tab',
        title: 'Strategy Tab'
      }
    ]
  }
];

const ExploreTour2 = () => {
  const [exploreButton, setExploreButton] = useState(true);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [current, setCurrent] = useState(1);
  const [tour, setTour] = useState([]);

  const useStyles = makeStyles((theme) => ({
    tour: {
      display: exploreButton ? 'block' : 'none'
    }
  }));

  const classes = useStyles();

  const theme = useTheme();
  const historyListen = useHistory();

  const onExplore = () => {
    setIsTourOpen(true);
  };

  const getFirstItem = (thePath) => {
    const segments = thePath.split('/');
    return `/${segments[1]}/${segments[2]}`;
  };

  useEffect(() => {
    setExploreButton(false);
    setIsTourOpen(false);
    fetchData(history.location.pathname);
    historyListen.listen((location) => {
      fetchData(location.pathname);
    });
  }, [history, setExploreButton, fetchData]);

  const fetchData = (pathname) => {
    const toPath = getFirstItem(pathname);
    const data = _.find(tourData, { route: toPath }, 'steps');
    if (data !== undefined) {
      setExploreButton(true);
      setTour(data);
    } else {
      setExploreButton(false);
      setIsTourOpen(false);
    }
  };

  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setIsTourOpen(false);
    }
  };

  function isElementVisible(element) {
    if (
      element.offsetWidth ||
      element.offsetHeight ||
      element.getClientRects().length
    )
      return true;
    else return false;
  }

  function checkVisibility() {
    const visibleObject = document.querySelector(
      '[data-tour="HeaderEditButton"]'
    );
  }

  return (
    <>
      {isTourOpen && (
        <Joyride
          callback={handleJoyrideCallback}
          steps={tour.steps}
          run={isTourOpen}
          scrollToFirstStep={true}
          showProgress={true}
          showSkipButton={true}
          continuous={true}
          spotlightClicks={false}
          styles={{
            options: {
              zIndex: 10000
            }
          }}
        />
      )}
      <IconButton
        className={clsx(classes.tour, 'w-40 h-40 p-0')}
        onClick={onExplore}
      >
        <ExploreIcon />
      </IconButton>
    </>
  );
};

export default ExploreTour2;
