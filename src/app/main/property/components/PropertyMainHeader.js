import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faHome } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import _ from '@lodash';
import { openModal } from 'app/store/actions';
import { fetchPropertyStart } from 'app/main/property/store/actions';
import MonarchImageCarousel from '@monarch/core/MonarchImageCarousel/MonarchImageCarousel';
import { Form } from '@flowable/forms';
import PropertyFlatWidget from './PropertyFlatWidget';
import FuseLoading from '@fuse/core/FuseLoading';
import { MdCompare } from 'react-icons/md';
import Tooltip from '@material-ui/core/Tooltip';
import { useTheme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ChangelogPropertyDetails from 'app/common/change-log/ChangelogPropertyDetails';
import { Skeleton } from '@material-ui/lab';
import { fetchFormByProcess } from 'app/config/flowable-core/store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiIconButton-colorPrimary': {
      '&:hover': {
        background: 'none !important'
      }
    }
  },
  textColor: {
    color: theme.palette.primary.valueTextColor,
    verticalAlign: 'middle'
  },
  labelColor: {
    color: theme.palette.primary.labelTextColor
  },
  PropertyHeaderBdr: {
    borderBottom: theme.palette.PropertyHeaderBdr
  },
  titleTxt: {
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    textAlign: 'center',
    padding: '5px 20px',
    fontSize: '1rem',
    fontWeight: '400',
    background: theme.palette.background.widgetTitleBg,
    color: theme.palette.primary.widgetTitleColor
  },
  iconColor: {
    color: theme.palette.background.iconcolor
  },
  imgContainer: {
    position: 'relative',
    height: '200px',
    display: 'inherit',
    marginBottom: '15px'
  },
  changelogIcon: {
    width: '38%',
    display: 'flex !important',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      width: '23%'
    }
  },
  skeleton: {
    background: 'lightGray'
  }
}));

const PropertyMainHeader = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();
  const theme = useTheme();
  const header = useSelector(({ flowable }) => flowable.formDefinition);
  const flowable = useSelector(({ property }) => property.flowable);
  const flwFormRefresh = useSelector(
    ({ flowableFormRefresh }) => flowableFormRefresh.formRefreshFlag
  );
  const property = useSelector(({ property }) => property?.get?.property);
  const uploadInProgressFromDoc = useSelector(
    ({ property }) => property.document.uploadInProgress
  );
  const deleteFlagFromDoc = useSelector(
    ({ common }) => common.documents.deleteFlag
  );

  const propertyStateAction = useSelector(
    ({ property }) => property?.get?.stateAction
  );
  const propertyImages = useSelector(
    ({ property }) => property?.document?.fileDatas
  );

  const user = useSelector(({ auth }) => auth.user);

  const taskRefresh = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.assignedTask.refresh
  );

  const [image, setImage] = React.useState({
    images: ['/assets/images/demo-content/property-default.jpg'],
    payloadImage: [],
    hasPropertyImages: false
  });

  const fn = {
    additionalData: () => ({
      additionalData: {
        propertyId: property?.property?.propertyId,
        investorId: property?.investorLoanInformations[0]?.investorCode
      }
    }),
    handleOpenDialogChangeLog: (props) => {
      dispatch(
        openModal({
          children: <ChangelogPropertyDetails />,
          maxwidth: 'lg'
        })
      );
    },
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Payload.afterChange':
          if (api.formValid()) {
            dispatch({
              type: 'GET_FILES_S3_START',
              fileCatType: 'propertyimage',
              propertyId: property?.property?.propertyId
            });
          }
          break;
        default:
          break;
      }
      return true;
    },
    uploadClickHandler: () => {
      dispatch(
        openModal({
          children: !flowable['property_image_upload']?.processed ? (
            <FuseLoading />
          ) : (
            <Form
              className="propertyHeader"
              config={flowable['property_image_upload']?.formDef}
              additionalData={fn.additionalData()}
              onEvent={fn.onEventHandler}
              payload={{ propertyImages: image.payloadImage }}
            />
          ),
          title: 'Upload Property Image',
          maxwidth: 'md'
        })
      );
    }
  };

  useEffect(() => {
    if (
      header['PropertyHeaderInformation']?.processed === undefined ||
      !header['PropertyHeaderInformation']?.processed
    ) {
      dispatch(
        fetchFormByProcess(
          user.selectedTenant,
          'propertyHeader',
          'PropertyHeaderInformation'
        )
      );
    }
  }, [dispatch, header, user.selectedTenant]);

  useEffect(() => {
    if (propertyImages?._embedded?.eqFiles.length > 0) {
      const images = _.map(
        propertyImages._embedded.eqFiles,
        (item) => item.fileS3Url
      );
      const payloadImage = _.map(propertyImages._embedded.eqFiles, (item) => ({
        name: item.fileName,
        size: item.fileMetadata.fileSize,
        downloadUrl: item.fileS3Url,
        fileS3Url: item.fileS3Url
      }));

      setImage({
        images,
        payloadImage,
        hasPropertyImages: true
      });
    } else {
      setImage({
        images: ['/assets/images/demo-content/property-default.jpg'],
        hasPropertyImages: false
      });
    }
  }, [propertyImages]);

  useEffect(() => {
    if (routeParams.caseInstanceId) {
      dispatch(fetchPropertyStart(user.tenantCode, routeParams.caseInstanceId));
    }
  }, [
    routeParams.caseInstanceId,
    dispatch,
    user.tenantCode,
    flwFormRefresh,
    taskRefresh
  ]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'property',
      fileNames: ['property_image_upload'],
      formAction: 'PROPERTY_FLOWABLE_FORMDEF'
    });
  }, [dispatch]);

  useEffect(() => {
    if (!_.isNull(property)) {
      dispatch({
        type: 'GET_FILES_S3_START',
        fileCatType: 'propertyimage',
        propertyId: property?.property?.propertyId
      });
    }
  }, [dispatch, property, uploadInProgressFromDoc, deleteFlagFromDoc]);

  return (
    <div className={classes.root}>
      <div className="flex flex-wrap">
        <div className="w-full bg-white rounded-md p-8 pl-0">
          {/* {
            !header['PropertyHeaderInformation']?.processed || ( */}
          <>
            <div
              className={clsx(
                'md:flex flex flex-wrap mb-10',
                classes.lightBlue
              )}
            >
              <div
                className={clsx(
                  'w-full md:w-1/5 sm:w-1/3 mr-12',
                  classes.textDarkBlue
                )}
              >
                <h5 className={clsx('text-left truncate', classes.titleTxt)}>
                  {!propertyStateAction ? (
                    <Skeleton variant="text" />
                  ) : (
                    `${property?.propertyAddresses[0]?.addressLineText}, ${property?.propertyAddresses[0]?.cityName}, ${property?.propertyAddresses[0]?.stateCode}, ${property?.propertyAddresses[0]?.postalCode}`
                  )}
                </h5>
              </div>
              <div className={clsx('w-2/5 pt-2 truncate mview', classes.textDarkBlue)}>
                {!propertyStateAction ? (
                  <Skeleton
                    className={classes.skeleton}
                    variant="text"
                    width={250}
                    animation="pulse"
                  />
                ) : (
                  <>
                    <span className="pr-8">
                      <FontAwesomeIcon
                        icon={faBed}
                        className={clsx(
                          'pr-8 text-16 align-middle',
                          classes.iconColor
                        )}
                      />
                      <span
                        className={clsx('align-middle', classes.labelColor)}
                      >
                        Bed
                      </span>
                    </span>
                    <span className={clsx('pr-8', classes.textColor)}>
                      {property?.property?.propertyBedroomCount
                        ? property?.property?.propertyBedroomCount
                        : 0}
                    </span>
                    <span className="pr-8">
                      <FontAwesomeIcon
                        icon={faBath}
                        className={clsx(
                          'pr-8 text-16 align-middle',
                          classes.iconColor
                        )}
                      />
                      <span
                        className={clsx('align-middle', classes.labelColor)}
                      >
                        Bath
                      </span>
                    </span>
                    <span className={clsx('pr-8', classes.textColor)}>
                      {property?.property?.propertyBathroomCount
                        ? property?.property?.propertyBathroomCount
                        : 0}
                    </span>
                    <span className="pr-8">
                      <FontAwesomeIcon
                        icon={faHome}
                        className={clsx(
                          'pr-8 text-16 align-middle',
                          classes.iconColor
                        )}
                      />
                      <span
                        className={clsx('align-middle', classes.labelColor)}
                      >
                        Sqft
                      </span>
                    </span>
                    <span className={clsx('pr-8', classes.textColor)}>
                      {property?.property?.grossLivingAreaSquareFeetNumber
                        ? property?.property?.grossLivingAreaSquareFeetNumber
                        : 0}
                    </span>
                  </>
                )}
              </div>
              <div
                className={clsx(
                  'text-right mview changelogIcon',
                  classes.changelogIcon
                )}
              >
                <Tooltip title="Change Log">
                  <IconButton
                    color="primary"
                    aria-label="maximize"
                    component="span"
                    onClick={(ev) => fn.handleOpenDialogChangeLog(ev)}
                    size="small"
                  >
                    <MdCompare className={theme.icons.fontSize} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            <div
              className={clsx(
                'imgDisplay mt-4 ml-8',
                classes.PropertyHeaderBdr
              )}
            >
              <div
                className={clsx('w-3/12 imagePosition', classes.imgContainer)}
              >
                <div className="flex w-full relative">
                  {!propertyStateAction ? (
                    <Skeleton
                      className={classes.skeleton}
                      variant="rect"
                      width={360}
                      height={200}
                    />
                  ) : (
                    <MonarchImageCarousel
                      images={image.images}
                      expanded={true}
                      onUploadClick={fn.uploadClickHandler}
                      hasImages={image.hasPropertyImages}
                    />
                  )}
                </div>
              </div>
              <div className="w-full propertyHeader">
                {!propertyStateAction ||
                !header['PropertyHeaderInformation']?.processed ? (
                  <>
                    <Skeleton
                      className={classes.skeleton}
                      width="100%"
                      style={{ margin: 5 }}
                    />
                    <Skeleton
                      className={classes.skeleton}
                      width="100%"
                      style={{ margin: 5 }}
                    />
                    <Skeleton
                      className={classes.skeleton}
                      width="100%"
                      style={{ margin: 5 }}
                    />
                    <Skeleton
                      className={classes.skeleton}
                      width="100%"
                      style={{ margin: 5 }}
                    />
                    <Skeleton
                      className={classes.skeleton}
                      width="100%"
                      style={{ margin: 5 }}
                    />
                    <Skeleton
                      className={classes.skeleton}
                      width="100%"
                      style={{ margin: 5 }}
                    />
                    <Skeleton
                      className={classes.skeleton}
                      width="100%"
                      style={{ margin: 5 }}
                    />
                    <Skeleton
                      className={classes.skeleton}
                      width="100%"
                      style={{ margin: 5 }}
                    />
                  </>
                ) : (
                  <Form
                    config={header['PropertyHeaderInformation']?.formDef}
                    payload={property}
                  />
                )}
              </div>
            </div>
            <PropertyFlatWidget key="PropertyFlatWidget" />
          </>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PropertyMainHeader);
