import { makeStyles } from '@material-ui/core/styles';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  content: {
    backgroundColor: theme.palette.background.paper
  },
  heightSec: {
    height: '150px'
  },
}));

const ManageProductPage = (props) => {
  const classes = useStyles();

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Manage Products'}
      leftSidebarContent={<></>}
      contentToolbar={<></>}
      content={
          <>
            <div className={clsx('flex w-full mt-6 overflow-auto', classes.heightSec)}>
            <table className="table-auto w-full text-black text-xs ml-8">
                <thead className="text-left text-10 font-semibold">
                  <tr>
                    <th>Service Group</th>
                    <th>Product</th>
                    <th>Product Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-10">
                  <tr className="border-b-1">
                    <td className="p-4">Task 1</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Task 1</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Task 234</td>
                    <td className="p-4">VILLA, M</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Task 456</td>
                    <td className="p-4">VILLA, M</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Task 367</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Task 56</td>
                    <td className="p-4">VILLA, M</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Task 1345</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Task 0987</td>
                    <td className="p-4">VILLA, M</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                  </tr>
                  <tr>
                    <td className="p-4">Task 4567</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">2102/2020</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
      }
    />
  );
};

export default ManageProductPage;