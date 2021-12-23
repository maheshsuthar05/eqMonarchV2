import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import React, { useEffect } from 'react';
import { getDataStudioURl } from 'app/common/helpers';
import _ from '@lodash';
import FuseLoading from '@fuse/core/FuseLoading';

const DataStudioWidgets = (props) => {
  const pageLayout = React.useRef(null);
  const [iframeUrl, setIframeUrl] = React.useState(null);

  useEffect(() => {
    setIframeUrl(getDataStudioURl(props.resource));
    return () => {
      setIframeUrl(null);
    };
  }, [props.resource]);

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={props.title}
      contentToolbar={<></>}
      content={
        !_.isNull(iframeUrl) ? (
          <iframe
            title={props.title}
            src={iframeUrl}
            frameBorder={0}
            width={'100%'}
            height={'100%'}
            allowtransparency="true"
          />
        ) : (
          <FuseLoading />
        )
      }
      leftSidebarContent={'Task Managment'}
      ref={pageLayout}
    />
  );
};

export default DataStudioWidgets;
