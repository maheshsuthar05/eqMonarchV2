import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Chart } from 'react-google-charts';

const Timeline =() => {
const useStyles = makeStyles((theme) => ({
    root: {
    },
    heightSec: {
      height: '350px'
    },
    verticalText: {
      letterSpacing: '2px',
      writingMode: 'vertical-rl'
    },
    width95: {
      width: '95%'
    }
  }));
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div class="flex w-full shadow-md p-8 flex-wrap bg-white rounded-md mb-10">
          <h5
            className={clsx(
              'text-xs font-semibold p-6 bg-gray-100 text-black',
              classes.verticalText
            )}
          >
            Timeline
          </h5>

          <div
            className={clsx(
              'grid lg:grid-cols-1 sm:grid-cols-1 pl-4',
              classes.width95
            )}
          >
            <div
              className={clsx(
                'flex w-full mt-6 overflow-auto',
                classes.heightSec
              )}
            >
              <Chart
                width={'1000px'}
                height={'300px'}
                chartType="BubbleChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['ID', 'Open', 'Close', 'Pending', 'Overdue'],
                  ['', 1800, 1.67, 'Others', 15000],
                  ['', 1600, 1.36, 'CWCOT', 4000],
                  ['', 1400, 1.84, 'CWCOT', 4000],
                  ['', 1300, 2.78, 'REO', 10000],
                  ['', 1700, 2, 'CWCOT', 4000],
                  ['', 1200, 1.7, 'REO', 10000],
                  ['', 1000, 4.77, 'REO', 10000],
                  ['', 2000, 2.96, 'REO', 10000],
                  ['', 1000, 1.54, 'CWCOT', 4000],
                  ['', 1000, 2.05, 'Others', 15000]
                ]}
                options={{
                  title: '',
                  hAxis: { title: '' },
                  vAxis: { title: '' },
                  bubble: { textStyle: { fontSize: 11 } }
                }}
                rootProps={{ 'data-testid': '1' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
    // <>
    //     <div className={classes.root}>
    //     <div className="grid lg:grid-cols-1 sm:grid-cols-1 flex space-x-8 w-full">
    //                 <div className="bg-white rounded-md shadow-md p-8">
    //                 <h3 className="mb-10 text-xs font-semibold">Timeline</h3>
    //                 <Chart
    //                     width={'1000px'}
    //                     height={'300px'}
    //                     chartType="BubbleChart"
    //                     loader={<div>Loading Chart</div>}
    //                     data={[
    //                         ['ID', 'Open', 'Close', 'Pending', 'Overdue'],
    //                         ['', 1800, 1.67, 'Others', 15000],
    //                         ['', 1600, 1.36, 'CWCOT', 4000],
    //                         ['', 1400, 1.84, 'CWCOT', 4000],
    //                         ['', 1300, 2.78, 'REO', 10000],
    //                         ['', 1700, 2, 'CWCOT', 4000],
    //                         ['', 1200, 1.7, 'REO', 10000],
    //                         ['', 1000, 4.77, 'REO', 10000],
    //                         ['', 2000, 2.96, 'REO', 10000],
    //                         ['', 1000, 1.54, 'CWCOT', 4000],
    //                         ['', 1000, 2.05, 'Others', 15000],
    //                     ]}
    //                     options={{
    //                         title:'',
    //                         hAxis: { title: '' },
    //                         vAxis: { title: '' },
    //                         bubble: { textStyle: { fontSize: 11 } },
    //                     }}
    //                     rootProps={{ 'data-testid': '1' }}
    //                     />
    //                 </div>

    //             </div>
    //     </div>
    // </>
  );
};

export default Timeline;
