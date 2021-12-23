import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import React from 'react';
import withReducer from 'app/store/withReducer';
import reducer from './../store/reducers';
import Widget1 from './../widgets/Widget1';
import Widget2 from './../widgets/Widget2';
import Widget3 from './../widgets/Widget3';
import Widget4 from './../widgets/Widget4';
import Widget6 from './../widgets/Widget6';
import Widget7 from './../widgets/Widget7';
import WidgetData from './../widgets/WidgetData';

function DashboardPage(props) {
  return (
    <div className="p-12">
      <FuseAnimateGroup
        className="flex flex-wrap"
        enter={{
          animation: 'transition.slideUpBigIn'
        }}
      >
        <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
          <Widget1 widget={WidgetData.widgets[0]} />
        </div>
        <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
          <Widget2 widget={WidgetData.widgets[1]} />
        </div>
        <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
          <Widget3 widget={WidgetData.widgets[2]} />
        </div>
        <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
          <Widget4 widget={WidgetData.widgets[3]} />
        </div>
        <div className="widget flex w-full sm:w-1/2 p-12">
          <Widget6 widget={WidgetData.widgets[5]} />
        </div>
        <div className="widget flex w-full sm:w-1/2 p-12">
          <Widget7 widget={WidgetData.widgets[6]} />
        </div>
      </FuseAnimateGroup>
    </div>
  );
}

export default withReducer('agentDashboardApp', reducer)(DashboardPage);
