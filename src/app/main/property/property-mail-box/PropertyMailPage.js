import { hasAccess } from 'app/common/helpers/common-helper';
import MailDetails from 'app/main/mail-box/mail/MailDetails';
import MailToolbar from 'app/main/mail-box/mail/MailToolbar';
import MailCompose from 'app/main/mail-box/MailCompose';
import MailList from 'app/main/mail-box/mails/MailList';
import MailsToolbar from 'app/main/mail-box/mails/MailsToolbar';
import reducer from 'app/main/mail-box/store/reducers';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resourceKeys } from 'app/main/property/resources/ResourceConfig';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';

const PropertyMailPage = (props) => {
  const pageLayout = useRef(null);
  const routeParams = useParams();
  const param = routeParams;
  const contextResources = useSelector(
    ({ common }) => common.IAMResource.contextResources
  );
  const mailAccess = {
    canCreate: hasAccess(
      contextResources,
      resourceKeys.Property_Tab_Messages_Compose
    ),
    canDelete: true
  };
  return (
    <>
      <MonarchPageCarded
        gridSize={3}
        contentTitle={'Mail'}
        contentToolbar={
          <>
            {param.mailId ? (
              <>
                <MailToolbar />
                {mailAccess.canCreate && <MailCompose />}
              </>
            ) : (
              <>
                <div className="flex justify-between w-full">
                  <div className="flex">
                    <MailsToolbar />
                  </div>
                  <div className="flex items-center">
                    {/* {mailAccess.canCreate && <MailCompose />} */}
                    <MailCompose />
                  </div>
                </div>
              </>
            )}
          </>
        }
        leftSidebarContent={<></>}
        content={param.mailId ? <MailDetails /> : <MailList />}
        ref={pageLayout}
      />
    </>
  );
};

export default withReducer('mailApp', reducer)(PropertyMailPage);
