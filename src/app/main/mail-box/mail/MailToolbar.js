import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

const pathToRegexp = require('path-to-regexp');

function MailToolbar(props) {
  const mail = useSelector(({ mailApp }) => mailApp.mail);
  const theme = useTheme();

  const toPath = pathToRegexp.compile(props.match.path);

  const routeParams = useParams();
  const matchParams = { ...routeParams };
  delete matchParams.mailId;
  delete matchParams.loanId;
  const deselectUrl = toPath(matchParams);

  const param = props.location.state ? props.location.state : routeParams;

  const _deselectUrl = () => {
    props.location.state
      ? props.history.push({
          path: `${props.location.pathname}`,
          state: { ...param, mailId: undefined }
        })
      : props.history.push(deselectUrl);
  };

  if (!mail) {
    return null;
  }

  return (
    <div className="flex flex-1 items-center justify-between overflow-hidden sm:px-16">
      <IconButton onClick={_deselectUrl}>
        <Icon>
          {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
        </Icon>
      </IconButton>
    </div>
  );
}

export default withRouter(MailToolbar);
