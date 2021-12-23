import history from '@history';
export const POST_USER_TO_FAM = 'POST_USER_TO_FAM';
export const CHECK_FOR_VERIFIED_USER = 'CHECK_FOR_VERIFIED_USER';
export const VERIFIED_USER_ROUTE = 'VERIFIED_USER_ROUTE';
export const VERIFY_REDIRECTION = 'VERIFIED_REDIRECTION';

export const postUserToFAM = (payload, userType) => ({
  type: POST_USER_TO_FAM,
  payload,
  userType
});

export const verification = (pathname) => ({
  type: CHECK_FOR_VERIFIED_USER,
  pathname
});

export const verifyRedirection = () => {
  history.push('/verification/user');
};
