import * as Actions from '../actionTypes';

export const getPropertyLegacyDetails = (details) => ({
  type: Actions.PROPERTY_GET_LEGACY_DETAILS,
  details
});

export const getBackPropertyLegacyDetails = () => ({
  type: Actions.PROPERTY_GET_BACK_LEGACY_DETAILS
});

export const getlegacyMessageStart = () => ({
  type: Actions.PROPERTY_GET_LEGACY_MESSAGES_START
});
