import { forgerock, host } from 'app/config/api';
import Cookies from 'js-cookie';
import _ from '@lodash';
import jwtDecode from 'jwt-decode';
import * as resourceConfig from 'app/common/iam-resource-provider';
import { _ as flowUnderScore } from '@flowable/forms';
import jwt from 'jsonwebtoken';

export const convertNameToAvatar = (str) => {
  const acronym = str.substring(0, 2);
  return acronym.toUpperCase();
};

export const getCurrentDate = () => {
  const d = new Date();
  const date = d.toISOString().split('T')[0];
  const time = d.toTimeString().split(' ')[0];
  return `${date} ${time}`;
};

export const convertUTCTimeStamp = (timeStamp) => {
  const response = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(timeStamp);
  return response;
};

export const convertToTagArray = (payload, delimiter) => {
  let arr = payload.split(delimiter).sort();
  let response = [];
  let label = {};
  arr.map((item) => {
    if (item.length) {
      label.title = item;
      label.color = 'red';
      response.push(label);
    }
    return false;
  });
  return response;
};

export const convertTimeStamp = (timeStamp) => {
  let options = { year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric' };
  return new Date(timeStamp).toLocaleDateString([], options);
};

export const uniqueIdentifier = () => {
  const date = new Date();

  const identifier = {
    dateTime: `${date.toUTCString()} ${date.getUTCSeconds()}:${date.getUTCMilliseconds()}`,
    user: Cookies.get(forgerock.cookie.userName),
    tenantCode: Cookies.get(forgerock.cookie.tenantCode)
  };

  let stringifyIdentifier = JSON.stringify(identifier);
  let base64Identifier = Buffer.from(stringifyIdentifier).toString('base64');

  return base64Identifier;
};

export const randomUniqueIdentifier = () => {
  const date = new Date();
  return Date.parse(date);
};

// Check user has access to a specific Resource
export const hasAccess = (resources, resourceKey, action = 'GRANT') => {
  let access = false;
  const resource = _.find(resources, { resource: resourceKey });
  if (
    resource !== undefined &&
    resource.hasOwnProperty('actions') &&
    resource.actions.hasOwnProperty(action) &&
    resource.actions[action] === true
  ) {
    access = true;
  }
  return access;
};

export const fileDownloader = (data, fileName, type) => {
  //Data=>data can be any format, Ex:csv,json
  //FileName=>filename should be with extension, Ex:text.csv,text.json
  //Type=>Type can be anything, Ex:text/csv,attachement/csv/attachement/json
  let element = document.createElement('a');
  if (type === 'link') {
    element.href = data;
    element.download = data.substr(data.lastIndexOf('/') + 1);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    return true;
  }
  document.body.appendChild(element);
  element.style = 'display: none';
  let blob = new Blob([data], { type }),
    url = window.URL.createObjectURL(blob);
  element.href = url;
  element.download = fileName;
  element.click();
  window.URL.revokeObjectURL(url);
};

export const truncateString = (
  sourceString,
  truncateLength = 10,
  omission = '...'
) => {
  const result = _.truncate(sourceString, {
    length: truncateLength,
    omission: omission
  });
  return result;
};

export const contextInfo = () => {
  const tenantCode =
    Cookies.get(forgerock.cookie.tenantCode) === undefined
      ? ''
      : Cookies.get(forgerock.cookie.tenantCode);
  const jwtToken =
    Cookies.get(forgerock.cookie.jwtToken) === undefined
      ? ''
      : Cookies.get(forgerock.cookie.jwtToken);
  const realm = jwtToken ? jwtDecode(jwtToken).realm : '';
  const iPlanetDirectoryPro =
    Cookies.get(forgerock.cookie.iPlanetDirectoryPro) === undefined
      ? ''
      : Cookies.get(forgerock.cookie.iPlanetDirectoryPro);
  const CookiesUserType = Cookies.get(forgerock.cookie.userType);
  const userType =
    CookiesUserType === 'undefined' || CookiesUserType === ''
      ? 'servicer'
      : CookiesUserType;
  const selectedTenant = Cookies.get('selectedTenant');
  const username = Cookies.get(forgerock.cookie.userName);
  const email =
    Cookies.get(forgerock.cookie.userEmail) === undefined
      ? ''
      : Cookies.get(forgerock.cookie.userEmail);
  const displayName =
    Cookies.get(forgerock.cookie.displayName) === undefined
      ? ''
      : Cookies.get(forgerock.cookie.displayName);

  const data = {
    tenantCode,
    jwtToken,
    realm,
    iPlanetDirectoryPro,
    userType,
    selectedTenant,
    username,
    email,
    displayName
  };

  return data;
};

export const isPublicPage = (pathName) => {
  const { route, pageName } = routeWithPageName(pathName);
  const routeConfig = resourceConfig[route] ? resourceConfig[route] : [];
  const resource = _.find(routeConfig.conifugartion, {
    pageName: pageName,
    public: true
  });

  return route === '' || resource !== undefined ? true : false;
};

export const routeWithPageName = (pathName) => {
  const data = { route: '', pageName: '' };
  const pageInfo = pathName.length ? pathName.split('/') : [];
  data.route = pageInfo.length >= 2 ? pageInfo[1].replaceAll('-', '') : '';
  data.pageName =
    pageInfo.length >= 3 ? pageInfo[2].replaceAll('-', '') : pageInfo[1];
  return data;
};

export const formatCurrency = (
  value = 0,
  style = 'currency',
  currency = 'USD',
  minimumFractionDigits = 2
) => {
  value = isNaN(value) ? 0 : value;
  const formatter = new Intl.NumberFormat('en-US', {
    style: style,
    currency: currency,
    minimumFractionDigits: minimumFractionDigits
  });
  return formatter.format(value);
};
export const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const convert = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, convert), 2) + ' ' + sizes[convert];
};

export const formatTimeStamp = (timeStamp) => {
  let options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(timeStamp).toLocaleDateString([], options);
};

export const arrayToStringConversion = (data, key) => {
  if (
    !_.isEmpty(
      _.filter(
        _.map(data, (res) => res[key]),
        (res) => res === 'AssetManager'
      )
    )
  ) {
    return null;
  } else {
    return _.map(data, (res) => res[key]);
  }
};

export const returnStringByFromArrayByKey = (data, key) => {
  _.pullAt(data, _.findIndex(data, { id: 'PolicyEvaluation' }));

  return _.toString(_.map(_.flatMap(data, key), appendUserToGroup));
};

const appendUserToGroup = (n) => {
  return contextInfo().userType === 'servicer'
    ? n
    : `${contextInfo().username}-${n}`;
};

export const getFileFromBlob = (responseBlob, download = false) => {
  if (responseBlob.data instanceof Blob) {
    const contentDisposition = responseBlob.headers['content-disposition'];
    const contentType = responseBlob.headers['content-type'];
    const fileName = contentDisposition.split('=')[1];
    const blob = new Blob([responseBlob.data], { type: contentType });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${fileName}`;
    if (download) {
      link.click();
      return true;
    } else {
      return link.href;
    }
  } else {
    return false;
  }
};

export const flowableCustomFetch = (url, payload, method = 'POST') => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('tenantCode', Cookies.get(forgerock.cookie.tenantCode));
  let customFetch = (input, init): Promise<any> => {
    return flowUnderScore.futch(url, {
      headers: headers,
      method,
      body: JSON.stringify(payload)
    });
  };

  return customFetch;
};

export const getBlobDataAsFileUpload = (responseBlob) => {
  const fileInformation = {
    isValid: false,
    blobData: '',
    fileData: '',
    fileName: '',
    contentType: '',
    url: ''
  };
  if (responseBlob.data instanceof Blob) {
    const contentDisposition = responseBlob.headers['content-disposition'];
    fileInformation.contentType = responseBlob.headers['content-type'];
    fileInformation.fileName = contentDisposition.split('=')[1];
    fileInformation.blobData = new Blob([responseBlob.data], {
      type: fileInformation.contentType
    });
    fileInformation.url = window.URL.createObjectURL(fileInformation.blobData);
    fileInformation.fileData = new File(
      [new Blob([responseBlob.data])],
      fileInformation.fileName,
      {
        type: fileInformation.contentType
      }
    );
    fileInformation.isValid = true;
  }
  return fileInformation;
};

export const dateToUTCMilliseconds = (utcDate) => {
  return utcDate ? Date.parse(new Date(utcDate).toUTCString()) : null;
};

export const getDataStudioURl = (resource) => {
  const URL = host.isDevEnv()
    ? 'http://10.5.1.22/eq-ui/datastudio'
    : `${window.location.origin}${process.env.REACT_APP_DATASTUDIO_METABASE_URL}`;

  const payload = {
    resource: resource,
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60 // 10 minute expiration
  };
  const token = jwt.sign(
    payload,
    process.env.REACT_APP_DATASTUDIO_METABASE_SECRET_KEY
  );

  const iframeUrl = `${URL}/embed/${
    _.keys(resource)[0]
  }/${token}#bordered=false&titled=false`;
  return iframeUrl;
};
