import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import DocumentsPage from 'app/common/components/documents/DocumentsPage';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import { IconButton, Tooltip } from '@material-ui/core';
import { RiFileUploadLine } from 'react-icons/ri';
import { documentUploadStart, openModal } from 'app/store/actions';
import DocumentsUpload from 'app/common/components/documents/DocumentsUpload';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '16px'
  }
}));

const LenderLibraryPage = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const classes = useStyles();
  const routeParams = useParams();
  const tenantId = routeParams.tenantId;

  const user = useSelector(({ auth }) => auth.user);
  const dataTableRowData = useSelector(
    ({ common }) => common.flowableFormData.dataTableRowData
  );

  const formPayloadRef = useRef({});
  formPayloadRef.current = dataTableRowData;

  const fileCatType = [
    { name: 'Lender documents', value: 'lenderDocuments' },
    { name: 'Business logic', value: 'businessLogic' },
    { name: 'Releases', value: 'eqRelease' },
    { name: 'Training materials', value: 'trainingMaterials' },
    { name: 'Status reports', value: 'statusReports' },
    { name: 'Public lender files', value: 'publicLenderFiles' }
  ];

  const title = 'Upload Lender File';

  const onFormButtonHandler = () => {
    dispatch(
      documentUploadStart(
        user.tenantCode,
        formPayloadRef.current.lenderFileUpload[0].fileData,
        formPayloadRef.current.fileCategoryType,
        tenantId,
        tenantId
      )
    );
  };
  const handleUploadModal = (props) => {
    dispatch(
      openModal({
        children: (
          <DocumentsUpload propertyId={tenantId} fileCatType={fileCatType} />
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
      contentTitle={'Lender Library'}
      contentToolbar={
        <>
          <>
            <Tooltip title="Upload Documents">
              <IconButton
                color="primary"
                aria-label="maximize"
                component="span"
                onClick={handleUploadModal}
                size="small"
              >
                <RiFileUploadLine className={theme.icons.fontSize} />
              </IconButton>
            </Tooltip>
            <div className="show-clear-filter">&nbsp;</div>
          </>
        </>
      }
      content={
        <div className={classes.root}>
          <DocumentsPage
            propertyId={tenantId}
            fileCatType={fileCatType}
            title={title}
          />
        </div>
      }
      leftSidebarContent={<></>}
      ref={pageLayout}
    />
  );
};

export default LenderLibraryPage;
