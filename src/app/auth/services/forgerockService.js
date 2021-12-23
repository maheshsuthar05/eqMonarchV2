import axois from 'app/common/services/http/http-forgerock-service';
import { forgerock } from 'app/config/api';
import { Interceptor } from 'app/config/interceptors/axios.interceptors';

// FAM Login
const loginUser = async (username, password) => {
  const headers = {
    'X-OpenAM-Username': username,
    'X-OpenAM-Password': password
  };
  return await axois
    .post(forgerock.api.login, '', { headers: headers })
    .then((response) => response);
};

// FAM User Profile
const userProfile = async () => {
  const headers = {};
  return await axois
    .post(forgerock.api.profile, '', { headers: headers })
    .then((response) => response.data);
};

const logoutUser = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept-API-Version': 'resource=3.1, protocol=1.0'
  };
  const instance = Interceptor.customInstance(headers);
  return await instance
    .post(forgerock.api.logout, '', { headers: headers })
    .then((response) => response);
};

export default {
  loginUser,
  userProfile,
  logoutUser
};
