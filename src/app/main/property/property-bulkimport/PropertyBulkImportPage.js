import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Form } from '@flowable/forms';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import FuseLoading from '@fuse/core/FuseLoading';
import { openModal } from 'app/store/actions';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded/MonarchPageCarded';
import MonarchTitle from '@monarch/core/MonarchTitle/MonarchTitle';
import PropertyBulkImportTemplate from './PropertyBulkImportTemplate';
import PropertyBulkImportTemplateDetails from './PropertyBulkImportTemplateDetails';
import { getErrorFileDetails } from 'app/main/property/store/actions';
import { bulkOperations } from 'app/config/api';
import { flowableCustomFetch } from 'app/common/helpers/common-helper';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {},
  content: {
    padding: '12px',
    backgroundColor: theme.palette.background.paper
  },
  details: {
    '& .batch_list_error_button>button': {
      height: '24px',
      width: 'fit-content',
      paddingTop: '4px',
      textTransform: 'capitalize'
    }
  }
}));

function PropertyBulkImportPage() {
  const classes = useStyles();
  const pageLayout = useRef(null);
  const flowable = useSelector(({ flowable }) => flowable.jsonForm);
  const dispatch = useDispatch();
  const tableRefresh = useSelector(
    ({ property }) => property.bulkimport.tableRefresh
  );
  useEffect(() => {
    // dispatch({ type: 'FLOWABLE_DEFINITION_BY_JSON_CLEAR' });
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'property-bulkimport',
      fileNames: ['Upload_Template_List', 'Upload_Template', 'Template_Details']
    });
  }, [dispatch]);

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Link.click':
        if (config.id === 'bulkImport') {
          dispatch(
            openModal({
              children: <PropertyBulkImportTemplate />,
              title: 'Bulk Import'
            })
          );
        }
        break;
      case 'Button.click':
        if (config.extraSettings.text === 'Detail') {
          const { BATCH_ID, EXCEPTION_COUNT } = config.value;
          dispatch(getErrorFileDetails(BATCH_ID));
          dispatch(
            openModal({
              children: (
                <PropertyBulkImportTemplateDetails
                  batchId={BATCH_ID}
                  batchError={EXCEPTION_COUNT}
                />
              ),
              title: 'Batch Details',
              maxwidth: 'lg'
            })
          );
        }

        break;
      default:
        break;
    }

    return true;
  };

  return (
    <MonarchPageCarded
      classes={{
        toolbar: 'p-0',
        content: classes.content
      }}
      contentToolbar={<MonarchTitle title="Bulk Operations" />}
      leftSidebarContent={<></>}
      content={
        <div className="p-0">
          {!flowable.isFormProcessed ? (
            <FuseLoading />
          ) : (
            <Form
              debug={false}
              className={clsx(classes.details, 'listing-page')}
              onEvent={onEventHandler}
              fetch={flowableCustomFetch(
                bulkOperations.api.batchList,
                null,
                'GET'
              )}
              config={flowable.formDefinition[0].json}
              additionalData={{ tableRefresh }}
            />
          )}
        </div>
      }
      innerScroll
      ref={pageLayout}
    />
  );
}

export default withRouter(PropertyBulkImportPage);
