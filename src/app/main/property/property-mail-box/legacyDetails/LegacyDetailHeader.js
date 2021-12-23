import { Icon, IconButton, useTheme } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { getBackPropertyLegacyDetails } from 'app/main/property/store/actions';

const LegacyDetailHeader = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const legacyDetails = useSelector(
    ({ property }) => property.messages.legacyDetails
  );
  const getBackToLegacyList = () => {
    dispatch(getBackPropertyLegacyDetails());
  };
  return (
    <div className="flex justify-between w-full">
      <div className="flex">
        <IconButton onClick={getBackToLegacyList}>
          <Icon>
            {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
          </Icon>
        </IconButton>
        <div className="flex-none self-center">
          <span className="page-title pl-12 pt-12">
            {legacyDetails.messageSubject}
          </span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LegacyDetailHeader);
