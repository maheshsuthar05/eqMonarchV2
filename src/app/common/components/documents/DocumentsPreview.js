import React from 'react';
import { Form } from '@flowable/forms';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import FuseLoading from '@fuse/core/FuseLoading';

const useStyles = makeStyles((theme) => ({
  previewForm: {
    width: '90%'
  },
  preview: {
    border: '1px dashed #cccccc',
    backgroundColor: '#f8f8f8',
    textAlign: 'center',
    margin: '7px auto'
  }
}));

const DocumentsPreview = ({ previewFileData }) => {
  const classes = useStyles();
  const flowable = useSelector(({ flowable }) => flowable.jsonForm);
  let payload;
  if (
    previewFileData !== undefined &&
    previewFileData !== null &&
    previewFileData.hasOwnProperty('fileMetadata')
  ) {
    payload = {
      previewFile: [
        {
          name: previewFileData.fileMetadata.fileName,
          size: previewFileData.fileMetadata.fileSize,
          downloadUrl: previewFileData.fileS3Url,
          previewUrl: previewFileData.fileS3Url
        }
      ]
    };
  }
  return (
    <div className={classes.previewForm}>
      {flowable['DocumentsPreview']?.processed ? (
        <>
          {Object.keys(previewFileData).length === 0 ? (
            <div className={classes.preview}>
              <Typography
                className="text-16 mx-16"
                variant="h6"
                color="secondary"
              >
                <div className="p-12">
                  Please select a record to show Preview
                </div>
              </Typography>
            </div>
          ) : (
            <Form
              config={flowable['DocumentsPreview'].formDef}
              payload={payload}
            />
          )}
        </>
      ) : (
        <FuseLoading />
      )}
    </div>
  );
};

export default DocumentsPreview;
