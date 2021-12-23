import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faExpand } from '@fortawesome/free-solid-svg-icons';

const Roles = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
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
            Roles
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
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="fa-w-20 pr-8 text-xl align-bottom mr-16 cursor-pointer text-blue-700"
                  />
                  <FontAwesomeIcon
                    icon={faExpand}
                    className="fa-w-20 pr-8 text-xl align-bottom cursor-pointer text-pink-700"
                  />
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
                    <th>Assigned Roles</th>
                    <th>Assigned Users</th>
                  </tr>
                </thead>
                <tbody className="text-10">
                  <tr className="border-b-1">
                    <td className="p-4">Asset Manager</td>
                    <td className="p-4">GETZ, D</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Assistant</td>
                    <td className="p-4">GETZ, D</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Business Devmanager</td>
                    <td className="p-4">VILLA, M</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Asset Manager</td>
                    <td className="p-4">GETZ, D</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">Assistant</td>
                    <td className="p-4">GETZ, D</td>
                  </tr>
                  <tr>
                    <td className="p-4">Business Devmanager</td>
                    <td className="p-4">VILLA, M</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
    // <>
    //   <div className={classes.root}>
    //     <div class="flex w-full shadow-md p-8 flex-wrap bg-white rounded-md mb-10">
    //       <h5 className="text-xs font-semibold pb-4">Roles</h5>
    //       <div class="flex w-full bg-grey-100 p-8">
    //         <div className="w-1/2 text-black">
    //           {/* <h5 className="text-xs font-semibold">Roles</h5> */}
    //         </div>
    //         <div className="w-1/2 text-black text-right">
    //           <div className="justify-end flex">
    // <FontAwesomeIcon
    //   icon={faSave}
    //   className="fa-w-20 pr-8 text-xl align-bottom mr-16 cursor-pointer text-blue-700"
    // />
    // <FontAwesomeIcon
    //   icon={faWindowClose}
    //   className="fa-w-20 pr-8 text-xl align-bottom cursor-pointer text-pink-700"
    // />
    //             {/* <div className="text-xl cursor-pointer text-pink-700"><BsFillXCircleFill/></div> */}
    //             {/* <span className={clsx('text-blue-500 font-semibold underline cursor-pointer mr-16', classes.textSmall)}>Save</span> */}
    //             {/* <span className={clsx('text-blue-500 font-semibold underline cursor-pointer', classes.textSmall)}>Cancel</span> */}
    //           </div>
    //         </div>
    //       </div>

    //       <div className="flex w-full mt-4 flex-wrap">
    //         <div className="w-full text-black p-4">
    //           <div
    //             className={clsx('flex w-full overflow-auto', classes.heightSec)}
    //           >
    //             <table className="table-auto w-full text-black text-xs">
    //               <thead className="text-left text-10 font-semibold">
    //                 <tr>
    //                   <th>Assigned Roles</th>
    //                   <th>Assigned Users</th>
    //                 </tr>
    //               </thead>
    //               <tbody className="text-10">
    //                 <tr className="border-b-1">
    //                   <td className="p-4">Asset Manager</td>
    //                   <td className="p-4">GETZ, D</td>
    //                 </tr>
    //                 <tr className="border-b-1">
    //                   <td className="p-4">Assistant</td>
    //                   <td className="p-4">GETZ, D</td>
    //                 </tr>
    //                 <tr className="border-b-1">
    //                   <td className="p-4">Business Devmanager</td>
    //                   <td className="p-4">VILLA, M</td>
    //                 </tr>
    //                 <tr className="border-b-1">
    //                   <td className="p-4">Asset Manager</td>
    //                   <td className="p-4">GETZ, D</td>
    //                 </tr>
    //                 <tr className="border-b-1">
    //                   <td className="p-4">Assistant</td>
    //                   <td className="p-4">GETZ, D</td>
    //                 </tr>
    //                 <tr>
    //                   <td className="p-4">Business Devmanager</td>
    //                   <td className="p-4">VILLA, M</td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default Roles;
