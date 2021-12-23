import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropertyTabsSection from './PropertyTabsSection';

const Tasks =() => {
const useStyles = makeStyles((theme) => ({
    root: {
    },
    heightSec: {
      height: '150px'
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
            Tasks
          </h5>

          <div
            className={clsx(
              'grid lg:grid-cols-1 sm:grid-cols-1 pl-4',
              classes.width95
            )}
          >
            <div className="flex w-full bg-grey-100">
              <div className="w-full text-black text-left">
                <div className="justify-end flex">
                  <PropertyTabsSection></PropertyTabsSection>
                </div>
              </div>
            </div>

            <div
              className={clsx(
                'flex w-full mt-6 overflow-auto',
                classes.heightSec
              )}
            >
              <table className="table-auto w-full text-black text-xs">
                <thead className="text-left text-10 font-semibold">
                  <tr>
                    <th>Task Name</th>
                    <th>Assignee</th>
                    <th>Open Date</th>
                    <th>Due Date</th>
                    <th>Claim Time</th>
                  </tr>
                </thead>
                <tbody className="text-10">
                  <tr className="border-b-1">
                    <td className="p-4">Task 1</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                    <td className="p-4">0.00</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Task 1</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                    <td className="p-4">0.00</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Task 234</td>
                    <td className="p-4">VILLA, M</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                    <td className="p-4">0.00</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Task 456</td>
                    <td className="p-4">VILLA, M</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                    <td className="p-4">0.00</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Task 367</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                    <td className="p-4">0.00</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Task 56</td>
                    <td className="p-4">VILLA, M</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                    <td className="p-4">0.00</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Task 1345</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                    <td className="p-4">0.00</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Task 0987</td>
                    <td className="p-4">VILLA, M</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                    <td className="p-4">0.00</td>
                  </tr>
                  <tr>
                    <td className="p-4">Task 4567</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                    <td className="p-4">0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
