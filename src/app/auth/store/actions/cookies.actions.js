import { forgerock, host } from 'app/config/api';
import Cookies from 'js-cookie';
import _ from 'lodash';
export const FETCH_COOKIES = '[SESSION] FETCH_COOKIES';

export const _cookies = {
  fetchCookies: () => ({
    type: FETCH_COOKIES
  }),
  setCookies: (args) => {
    if (_.isObject(args)) {
      _.mapKeys(args, (value, key) => {
        Cookies.set(key, value);
      });
    }
  },
  jwtToken:
    'eyJ0eXAiOiJKV1QiLCJraWQiOiJ3VTNpZklJYUxPVUFSZVJCL0ZHNmVNMVAxUU09IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkaWxlZXAucmF2aW5kcmFuIiwiYXVkaXRUcmFja2luZ0lkIjoiOTllZGY4NDItMmUwMC00NDkxLWFhMTYtMWIyYTBmMGRmZTJiLTUwNjg0IiwiaXNzIjoiaHR0cDovL3JmbmctZGV2aW50LWZhbS1oYS5hbHRpZGV2Lm5ldDo0NDMvb3BlbmFtL29hdXRoMi9yZWFsbXMvcm9vdC9yZWFsbXMvZXFtb25hcmNoLWRldiIsInRva2VuTmFtZSI6ImlkX3Rva2VuIiwibm9uY2UiOiI4SlEtQWJ3RTI2Mk03Y2ZtIiwiYXVkIjoiZXFtb25hcmNoLWRldiIsImFjciI6IjAiLCJzX2hhc2giOiJ6RHpuSlpCSjFaVU1La2JYRVRTcGxRIiwiYXpwIjoiZXFtb25hcmNoLWRldiIsImF1dGhfdGltZSI6MTYxNzA5MjQ2NywiZm9yZ2Vyb2NrIjp7InNzb3Rva2VuIjoiZkY2c3dOQ0Vlcm9kOGlfUG5KRkNMVEFWa2pRLipBQUpUU1FBQ01ERUFBbE5MQUJ3MFJqSXdaMU15UTFoR1dpOVlSa2RIVkdzMWFsVmFTVXRtWmpROUFBUjBlWEJsQUFORFZGTUFBbE14QUFBLioiLCJzdWlkIjoiOTllZGY4NDItMmUwMC00NDkxLWFhMTYtMWIyYTBmMGRmZTJiLTUwNjUxIn0sInJlYWxtIjoiL2VxbW9uYXJjaC1kZXYiLCJleHAiOjE2MTcwOTk2NjksInRva2VuVHlwZSI6IkpXVFRva2VuIiwiaWF0IjoxNjE3MDkyNDY5LCJhZ2VudF9yZWFsbSI6Ii9lcW1vbmFyY2gtZGV2In0.pvqLgYWmYF0lICJkLUAlQxSpcOuyeUYU7liFIrmbUDLkh2CX8G3SJYiMxfu-u6zGn0qV1xFOs75fctkcl7N3vsa9x3EhYk7lJ8yKqzcpPbSxqSHuOSWrvZKTlRJykwvjwlWrsbrYjDYlO5JoCjCvErUh7PIyUnKQeNDVeHci5zqSyPAykYNWAewRQ4lfRLgW7YEKBxT0XGR_GbEmwc7c6--lcztak1pRWpd_jtfg38Nd_ZKrLNDbi1W9rk-viAcBDeHxl7KoUmHiAXSHeOvtQao9318Q_P6_zEtKcQ_DpCpZfkXVAAFym2XF5r1axoohx4_vJ6P7QVJaNoQt_2etyw',
  setLoginCookieData: (args) => {
    const displayName = args.properties['am.protected.name'];
    const email = args.properties['am.protected.email'];
    const userType = args.properties['am.protected.userType'];
    const tenantIds = _.split(args.properties['am.protected.tenantId'], '|');

    const defaultTenantCode =
      userType === 'servicer'
        ? tenantIds.length > 0
          ? tenantIds[0]
          : ''
        : 'internal';
    const tenantCode = defaultTenantCode;
    const selectedTenant = defaultTenantCode;
    const firstName = args.properties['am.protected.firstname'];
    const lastName = args.properties['am.protected.lastname'];
    const vendorid = args.properties['am.protected.vendorid'];
    const jwt = host.isDevEnv()
      ? _cookies.jwtToken
      : Cookies.get('am-auth-jwt');

    const cookieDataSet = {
      [forgerock.cookie.jwtToken]: jwt,
      [forgerock.cookie.userEmail]: email,
      [forgerock.cookie.displayName]: displayName,
      [forgerock.cookie.tenantId]: tenantIds,
      [forgerock.cookie.userName]: args.username,
      [forgerock.cookie.userType]: userType,
      [forgerock.cookie.tenantCode]: tenantCode,
      selectedTenant,
      [forgerock.cookie.firstname]: firstName,
      [forgerock.cookie.lastname]: lastName,
      [forgerock.cookie.vendorid]: vendorid
    };

    const loginDataSet = {
      tenantIds,
      defaultTenantCode,
      displayName,
      email,
      userType,
      selectedTenant
    };
    return {
      cookieDataSet,
      loginDataSet
    };
  },
  getCookies: (args) =>
    Cookies.get(args) === undefined ? '' : Cookies.get(args),
  encodeBase64: (payload) => {
    const encodedString = [];
    _.map(payload, (tenantId) => {
      const initialState = {
        tenantID: tenantId,
        encrypted: Buffer.from(`tenantId = ${tenantId}`).toString('base64')
      };
      encodedString.push(initialState);
    });
    return encodedString;
  },
  string: {
    encodeBase64: (payload) => btoa(payload),
    decodeBase64: (payload) => atob(payload)
  }
};
