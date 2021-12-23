import React,{ useEffect } from 'react';
import { useHistory } from 'react-router';

const useIsLocation = (props) => {
  const [active, setActive] = React.useState(false);
  const historyLister = useHistory();
  const getFirstItem = (thePath) => {
    const segments = thePath.split('/');
    return `/${segments[1]}/${segments[2]}`;
  };

  useEffect(() => {
    historyLister.listen((location) => {
      const toPath = getFirstItem(location.pathname);
      toPath === props.url ? setActive(true) : setActive(false);
    });
  }, [historyLister, active]);
  return active;
};

export default useIsLocation;
