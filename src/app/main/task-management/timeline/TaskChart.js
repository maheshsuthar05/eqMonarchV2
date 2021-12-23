import MonarchPageSimple from '@monarch/core/MonarchPageSimple';
import MonarchTitle from '@monarch/core/MonarchTitle/MonarchTitle';
import React from 'react';
import Chart from 'react-google-charts';

const TaskChart = () => {
  return (
    <Chart
      width={'100%'}
      height={'100%'}
      chartType="BarChart"
      loader={<div>Loading Chart</div>}
      data={[
        ['Name', 'Age'],
        ['Michael', 12],
        ['Elisa', 20],
        ['Robert', 7],
        ['John', 54],
        ['Jessica', 22],
        ['Aaron', 3],
        ['Margareth', 42],
        ['Miranda', 33]
      ]}
      rootProps={{ 'data-testid': '6' }}
      chartPackages={['corechart', 'controls']}
      render={({ renderControl, renderChart }) => {
        return (
          <div style={{ display: 'flex' }}>
            <div style={{ width: '40%' }}>{renderControl(() => true)}</div>
            <div style={{ width: '60%' }}>{renderChart()}</div>
          </div>
        );
      }}
      controls={[
        {
          controlType: 'StringFilter',
          options: {
            filterColumnIndex: 0,
            matchType: 'any', // 'prefix' | 'exact',
            ui: {
              label: 'Search by name'
            }
          }
        },
        {
          controlType: 'NumberRangeFilter',
          controlID: 'age-filter',
          options: {
            filterColumnIndex: 1,
            ui: {
              labelStacking: 'vertical',
              label: 'Age Selection:',
              allowTyping: false,
              allowMultiple: false
            }
          }
        }
      ]}
    />
    // <div className="flex">
    //   <div className="flex-1">
    //     <MonarchPageSimple
    //       contentToolbar={<MonarchTitle title="Redemption" />}
    //       content={
    //         <Chart
    //           width={'100%'}
    //           height={'100%'}
    //           chartType="BarChart"
    //           loader={<div>Loading Chart</div>}
    //           data={[
    //             ['Name', 'Age'],
    //             ['Michael', 12],
    //             ['Elisa', 20],
    //             ['Robert', 7],
    //             ['John', 54],
    //             ['Jessica', 22],
    //             ['Aaron', 3],
    //             ['Margareth', 42],
    //             ['Miranda', 33]
    //           ]}
    //           rootProps={{ 'data-testid': '6' }}
    //           chartPackages={['corechart', 'controls']}
    //           render={({ renderControl, renderChart }) => {
    //             return (
    //               <div style={{ display: 'flex' }}>
    //                 <div style={{ width: '40%' }}>
    //                   {renderControl(() => true)}
    //                 </div>
    //                 <div style={{ width: '60%' }}>{renderChart()}</div>
    //               </div>
    //             );
    //           }}
    //           controls={[
    //             {
    //               controlType: 'StringFilter',
    //               options: {
    //                 filterColumnIndex: 0,
    //                 matchType: 'any', // 'prefix' | 'exact',
    //                 ui: {
    //                   label: 'Search by name'
    //                 }
    //               }
    //             },
    //             {
    //               controlType: 'NumberRangeFilter',
    //               controlID: 'age-filter',
    //               options: {
    //                 filterColumnIndex: 1,
    //                 ui: {
    //                   labelStacking: 'vertical',
    //                   label: 'Age Selection:',
    //                   allowTyping: false,
    //                   allowMultiple: false
    //                 }
    //               }
    //             }
    //           ]}
    //         />
    //       }
    //     />
    //   </div>
    //   <div className="flex-1">
    //     <MonarchTitle title="Confirmation" />
    //     <Chart
    //       width={'100%'}
    //       height={'100%'}
    //       chartType="BarChart"
    //       loader={<div>Loading Chart</div>}
    //       data={[
    //         ['Name', 'Age'],
    //         ['Michael', 12],
    //         ['Elisa', 20],
    //         ['Robert', 7],
    //         ['John', 54],
    //         ['Jessica', 22],
    //         ['Aaron', 3],
    //         ['Margareth', 42],
    //         ['Miranda', 33]
    //       ]}
    //       rootProps={{ 'data-testid': '6' }}
    //       chartPackages={['corechart', 'controls']}
    //       render={({ renderControl, renderChart }) => {
    //         return (
    //           <div style={{ display: 'flex' }}>
    //             <div style={{ width: '40%' }}>{renderControl(() => true)}</div>
    //             <div style={{ width: '60%' }}>{renderChart()}</div>
    //           </div>
    //         );
    //       }}
    //       controls={[
    //         {
    //           controlType: 'StringFilter',
    //           options: {
    //             filterColumnIndex: 0,
    //             matchType: 'any', // 'prefix' | 'exact',
    //             ui: {
    //               label: 'Search by name'
    //             }
    //           }
    //         },
    //         {
    //           controlType: 'NumberRangeFilter',
    //           controlID: 'age-filter',
    //           options: {
    //             filterColumnIndex: 1,
    //             ui: {
    //               labelStacking: 'vertical',
    //               label: 'Age Selection:',
    //               allowTyping: false,
    //               allowMultiple: false
    //             }
    //           }
    //         }
    //       ]}
    //     />
    //   </div>
    // </div>
  );
};

export default TaskChart;
