import FuseLoading from '@fuse/core/FuseLoading';
import PreviewFile from 'app/common/components/previewFile/PreviewFile';
import reducer from 'app/main/offer/store/reducers';
import withReducer from 'app/store/withReducer';
import React from 'react';
import { useSelector } from 'react-redux';

const OfferWorksheet = (props) => {
  const offerWorkSheetDataLoaded = useSelector(
    ({ offer }) => offer.offerList.offerWorkSheetDataLoaded
  );

  const fileURL = useSelector(({ common }) => common.downloadFile.fileUrl);
  const fileGenerated = useSelector(
    ({ common }) => common.downloadFile.fileGenerated
  );
  const flowable = useSelector(({ offer }) => offer.flowable);
  return (
    <>
      {!offerWorkSheetDataLoaded || !fileGenerated ? (
        <>
          <FuseLoading />
        </>
      ) : (
        <>
          <PreviewFile
            {...props}
            payload={{
              fileURL: fileURL
            }}
            formDefinition={flowable['offer_worksheet_form_def'].formDef}
          />
        </>
      )}
    </>
  );
};

export default withReducer('offer', reducer)(OfferWorksheet);
