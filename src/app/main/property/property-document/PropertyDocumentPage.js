import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import DocumentsPage from 'app/common/components/documents/DocumentsPage';
import DocumentsUpload from 'app/common/components/documents/DocumentsUpload';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import { openModal } from 'app/store/actions';
import { IconButton } from '@material-ui/core';
import { documentUploadStart } from 'app/main/property/store/actions';
import Tooltip from '@material-ui/core/Tooltip';
import { useTheme } from '@material-ui/core/styles';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { RiFileUploadLine } from 'react-icons/ri';

const PropertyDocumentPage = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const pageLayout = useRef(null);
  const propertyId = useSelector(
    (state) => state.property.get.property?.property?.propertyId
  );
  const user = useSelector(({ auth }) => auth.user);
  const dataTableRowData = useSelector(
    ({ common }) => common.flowableFormData.dataTableRowData
  );

  const formPayloadRef = useRef({});
  formPayloadRef.current = dataTableRowData;
  const fileCatType = [
    { name: 'Property File', value: 'property' },
    { name: 'Message File', value: 'Message' },
    { name: 'Order File', value: 'order' },
    { name: 'PropertyImage File', value: 'propertyimage' },
    { name: 'Task File', value: 'task' }
  ];
  const onFormButtonHandler = () => {
    dispatch(
      documentUploadStart(
        user.tenantCode,
        formPayloadRef.current.lenderFileUpload[0].fileData,
        formPayloadRef.current.fileCategoryType,
        propertyId,
        propertyId
      )
    );
  };
  const handleUploadModal = (props) => {
    dispatch(
      openModal({
        children: (
          <DocumentsUpload propertyId={propertyId} fileCatType={fileCatType} />
        ),
        title: 'Upload Property Documents',
        buttons: (
          <>
            <MonarchButton
              onClick={onFormButtonHandler}
              color="primary"
              variant="contained"
              size="small"
              disabled
            >
              {'Upload'}
            </MonarchButton>
          </>
        )
      })
    );
  };
  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Documents'}
      leftSidebarContent={<></>}
      ref={pageLayout}
      contentToolbar={
        <>
        <Tooltip title="Upload Documents">
          <IconButton
            color="primary"
            aria-label="maximize"
            component="span"
            onClick={handleUploadModal}
            size="small"
          >
            <RiFileUploadLine className={theme.icons.fontSize}/>
          </IconButton>
          </Tooltip>
          <div className="show-clear-filter">&nbsp;</div>
        </>
      }
      content={
        !propertyId ? (
          <FuseLoading />
        ) : (
          <DocumentsPage
            propertyId={propertyId}
            fileCatType={fileCatType}
            title="Upload Property Documents"
          />
        )
      }
    />
  );
};

export default PropertyDocumentPage;
