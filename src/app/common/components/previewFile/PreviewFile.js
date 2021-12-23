import { Form } from '@flowable/forms';
import React, { useRef } from 'react';

const PreviewFile = (props) => {
  const { payload, formDefinition } = props;
  const pageLayout = useRef(null);

  return (
    <>
      <Form config={formDefinition} payload={payload} ref={pageLayout} />
    </>
  );
};

export default PreviewFile;
