import { mail, forgerock } from 'app/config/api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Interceptor } from 'app/config/interceptors/axios.interceptors';

export const messageApi = {
  
  async message(payload, attachmentDtos) {
    const headers = {
      tenantCode: payload.tenantList[0].tenantID
    };

    const instance = Interceptor.customInstance(headers);

    const data = {
      attachmentDtos:payload.attachmentDtos,
        from: payload.senderId,
        //investorId: payload.investorId,
        fileCategoryType: payload.fileCategoryType,
        //tags: payload.tags,
        propertyLoanId: payload.propertyId,
        tenantId: payload.tenantList[0].tenantID,
        to: payload.to.toString(),
        cc: payload.cc,
        mainContentType: payload.mainContentType,
        mainContent: payload.mainContent,
        category: payload.fileCategoryType,
        highImportance: payload.highImportance === true ? 1 : 0,
        replyToMessageId: '',
        fromPartyRoleType:'',
        threadId:'',
      };

    return await instance.post(mail.api.insert, data).then((res) => res.data);
  },

  async get(routeParams) {
    const data = {
      parentId: routeParams.routeParams.propertyId,
      sortFieldName: 'CREATED_DATE',
      sortOrder: 'DESC',
      from: 0,
      size: 100,
      recipientId:   routeParams.routeParams.folderHandle === 'inbox'
          ?  (routeParams.routeParams.propertyId===undefined ? Cookies.get(forgerock.cookie.userName) : null) :null ,
      senderId:
         routeParams.routeParams.folderHandle === 'sent'
          ? (routeParams.routeParams.propertyId===undefined ? Cookies.get(forgerock.cookie.userName) : null)  :null ,
          
      isread: null
   
    };

    return await axios.post(mail.api.get, data).then((res) => res.data.hits);
  },

  async getById(message) {
    const data = {
      operation: 'FETCH',
      message: {
        messageId: message.routeParams.mailId
      },
      messageAttachments: []
    };

    return await axios.post(mail.api.getById, data).then((res) => res.data);
  },

  async updateById(mailId) {
    const data = {
      operation: 'UPDATE',
      message: {
        messageId: mailId,
        isRead: 1
      }
    };

    return await axios.post(mail.api.update, data).then((res) => res.data);
  },

  async getBySearchText(searchText) {
    const data = {
      searchText: searchText,
      sortFieldName: '',
      sortOrder: 'ASC',
      from: 0,
      size: 25,
      filterQuery: ''
    };

    return await axios.post(mail.api.search, data).then((res) => {
      return res.data.hits;
    });
  },

  async getUnReadCount() {
    const data = {
      sortFieldName: 'CREATED_DATE',
      sortOrder: 'DESC',
      from: 0,
      size: 100,
      recipientId:  
            Cookies.get(forgerock.cookie.userName) ,
           
      isread: 0
    };

    return await axios
      .post(mail.api.getByIsRead, data)
      .then((res) => res.data.hits.length);
  }
};
