import * as Actions from '../actionTypes';

export const getMailComposeForm = (source = '') => ({
    type: Actions.GET_MAIL_COMPOSE_FORM,
    source: source
  });

export const fetchMailComposeFormSuccess = data => ({
    type: Actions.FETCH_MAIL_COMPOSE_FORM,
    formDefinition: { data }
});

export const postMessageData = (data, attachment) => ({
    type: Actions.POST_MAIL_COMPOSE_DATA,
    data: data
})

export const getpostMessageData = () => ({
    type: Actions.GET_MAIL_COMPOSE_DATA
});