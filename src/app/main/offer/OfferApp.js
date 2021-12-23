// import Hidden from '@material-ui/core/Hidden';
// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
// import { makeStyles } from '@material-ui/core/styles';
// import MonarchPageHeaderCarded from '@monarch/core/MonarchPageHeaderCarded';
// import PropertyHeader from 'app/common/components/PropertyHeader';
// import { fuseStyleOverride } from 'app/fuse';
// import React, { useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import OfferListPropertyPage from './offer-list-property/OfferListPropertyPage';

// const useStyles = makeStyles((theme) => ({
//   layoutRoot: {}
// }));

// function OfferApp({ content, route, match }, props) {
//   const routeParams = useParams();
//   const classes = useStyles(props);
//   const pageLayout = useRef(null);
//   const classesOverRide = fuseStyleOverride();
//   const caseInstanceId = routeParams.caseInstanceId;

//   return (
//     <>
//       <MonarchPageHeaderCarded
//         classes={{
//           root: classes.layoutRoot,
//           toolbar: 'p-0',
//           header: classesOverRide.header
//         }}
//         header={
//           <>
//             <Hidden lgUp>
//               <IconButton
//                 color="primary"
//                 onClick={(ev) => pageLayout.current.toggleLeftSidebar()}
//                 aria-label="open left sidebar"
//               >
//                 <Icon>menu</Icon>
//               </IconButton>
//             </Hidden>
//             <div className={classesOverRide.header + ' propertyPageContent'}>
//               <PropertyHeader id={caseInstanceId} />
//             </div>
//           </>
//         }
//         contentToolbar={<></>}
//         content={<>{routeParams.offerId ? <></> : <OfferListPropertyPage />}</>}
//         leftSidebarHeader={<></>}
//         leftSidebarContent={<></>}
//         innerScroll
//         ref={pageLayout}
//       />
//     </>
//   );
// }

// export default OfferApp;
