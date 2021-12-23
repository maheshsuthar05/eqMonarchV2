import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded/MonarchPageCarded';
import KpiOffer from '../propertyHeader/KpiOffer';
import Tasks from '../propertyHeader/Tasks';
import Messages from '../propertyHeader/Messages';
import Timeline from '../propertyHeader/Timeline';
import Roles from './Roles';
import Documents from './Documents';

const MiddleContent = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    }
  }));
  const classes = useStyles();
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <>
      <MonarchPageCarded
        // classes={{
        //   toolbar: 'p-0',
        //   content: classes.content
        // }}
        // contentToolbar={<MonarchTitle title="Offer Search" />}
        leftSidebarContent={<></>}
        content={
          <>
            <div className={classes.root}>
              <div className="flex flex-wrap">
                <KpiOffer></KpiOffer>
              </div>
              <div className="flex w-full pb-4 gap-8 mb-10">
                <div className="w-1/2 text-black">
                  <Tasks></Tasks>
                  <Messages></Messages>
                </div>
                <div className="w-1/2 text-black">
                  <Roles></Roles>
                  <Documents></Documents>
                </div>
              </div>
              <div className="flex mt-10 flex-wrap">
                <Timeline></Timeline>
              </div>
            </div>
          </>
        }
        //   innerScroll
        //   ref={pageLayout}
      />
    </>
  );
};

export default MiddleContent;
