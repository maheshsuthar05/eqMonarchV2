import MonarchTitle from '@monarch/core/MonarchTitle/MonarchTitle';
import React from 'react';
import { useSelector } from 'react-redux';

function ServiceHeader(props) {
  const page = useSelector(({ integration }) => integration.services.page);

  return (
    <MonarchTitle
      title={page ? `Integrations (${page.totalElements})` : `Integrations (0)`}
    />
  );
}

export default ServiceHeader;
