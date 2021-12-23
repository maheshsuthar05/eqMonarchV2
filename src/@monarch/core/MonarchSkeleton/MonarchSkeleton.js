import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import _ from '@lodash';
import { dateToUTCMilliseconds, getCurrentDate } from 'app/common/helpers';

const MonarchSkeleton = (props) => {
  return props.count ? (
    _.range(0, props.count).forEach((c, i, r) => (
      <Skeleton
        key={i}
        variant={props.variant ? props.variant : 'text'}
        width={props.width ? props.width : ''}
        height={props.height ? props.height : ''}
        animation={props.animation ? props.animation : 'pulse'}
        classes={props.classes}
      />
    ))
  ) : (
    <Skeleton
      variant={'text'}
      width={props.width ? props.width : ''}
      height={props.height ? props.height : ''}
      animation={props.animation ? props.animation : 'pulse'}
      classes={props.classes}
    />
  );
};

export default MonarchSkeleton;
