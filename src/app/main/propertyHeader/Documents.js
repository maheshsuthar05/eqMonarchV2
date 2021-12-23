import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faExpand } from '@fortawesome/free-solid-svg-icons';

const Documents = () => {
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
            Documents
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
                    icon={faFileUpload}
                    className="fa-w-20 pr-8 text-xl align-bottom cursor-pointer mr-16 text-blue-700"
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
                    <th>File Category</th>
                    <th>File Name</th>
                    <th>File Size</th>
                    <th>Created On</th>
                    <th>Updated On</th>
                  </tr>
                </thead>
                <tbody className="text-10">
                  <tr className="border-b-1">
                    <td className="p-4">fsafgjfgsajfg</td>
                    <td className="p-4">some file</td>
                    <td className="p-4">200 kb</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">12/05/2021</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">fsafgjfgsajfg</td>
                    <td className="p-4">some file</td>
                    <td className="p-4">200 kb</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">12/05/2021</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">fsafgjfgsajfg</td>
                    <td className="p-4">some file</td>
                    <td className="p-4">200 kb</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">12/05/2021</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">fsafgjfgsajfg</td>
                    <td className="p-4">some file</td>
                    <td className="p-4">200 kb</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">12/05/2021</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">fsafgjfgsajfg</td>
                    <td className="p-4">some file</td>
                    <td className="p-4">200 kb</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">12/05/2021</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">fsafgjfgsajfg</td>
                    <td className="p-4">some file</td>
                    <td className="p-4">200 kb</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">12/05/2021</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">fsafgjfgsajfg</td>
                    <td className="p-4">some file</td>
                    <td className="p-4">200 kb</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">12/05/2021</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">fsafgjfgsajfg</td>
                    <td className="p-4">some file</td>
                    <td className="p-4">200 kb</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">12/05/2021</td>
                  </tr>
                  <tr>
                    <td className="p-4">fsafgjfgsajfg</td>
                    <td className="p-4">some file</td>
                    <td className="p-4">200 kb</td>
                    <td className="p-4">12/02/2020</td>
                    <td className="p-4">12/05/2021</td>
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
    //     <div class="flex w-full shadow-md flex-wrap p-8 bg-white rounded-md">
    //       <div class="flex w-full bg-grey-100 p-8">
    //         <div className="w-1/2 text-black">
    //           <h5 className="text-xs font-semibold">Documents</h5>
    //         </div>
    //         <div className="w-1/2 text-black text-right">
    //           <div className="justify-end flex">
    //             {/* <div className="pr-8 text-xl cursor-pointer mr-16 text-blue-700"><AiOutlineCloudUpload/></div> */}
    // <FontAwesomeIcon
    //   icon={faFileUpload}
    //   className="fa-w-20 pr-8 text-xl align-bottom cursor-pointer mr-16 text-blue-700"
    // />
    // <FontAwesomeIcon
    //   icon={faExpand}
    //   className="fa-w-20 pr-8 text-xl align-bottom cursor-pointer text-pink-700"
    // />
    //             {/* <span className={clsx('text-blue-500 font-semibold underline cursor-pointer mr-16', classes.textSmall)}>Upload</span>
    //                                         <span className={clsx('text-blue-500 font-semibold underline cursor-pointer', classes.textSmall)}>Full View</span> */}
    //           </div>
    //         </div>
    //       </div>

    //       <div className="flex w-full mt-4 flex-wrap">
    //         <div className="w-full text-black p-4">
    //           <div
    //             className={clsx('flex w-full overflow-auto', classes.heightSec)}
    //           >
    // <table className="table-auto w-full text-black text-xs">
    //   <thead className="text-left text-10 font-semibold">
    //     <tr>
    //       <th>File Category</th>
    //       <th>File Name</th>
    //       <th>File Size</th>
    //       <th>Created On</th>
    //       <th>Updated On</th>
    //     </tr>
    //   </thead>
    //   <tbody className="text-10">
    //     <tr className="border-b-1">
    //       <td className="p-4">fsafgjfgsajfg</td>
    //       <td className="p-4">some file</td>
    //       <td className="p-4">200 kb</td>
    //       <td className="p-4">12/02/2020</td>
    //       <td className="p-4">12/05/2021</td>
    //     </tr>
    //     <tr className="border-b-1">
    //       <td className="p-4">fsafgjfgsajfg</td>
    //       <td className="p-4">some file</td>
    //       <td className="p-4">200 kb</td>
    //       <td className="p-4">12/02/2020</td>
    //       <td className="p-4">12/05/2021</td>
    //     </tr>
    //     <tr className="border-b-1">
    //       <td className="p-4">fsafgjfgsajfg</td>
    //       <td className="p-4">some file</td>
    //       <td className="p-4">200 kb</td>
    //       <td className="p-4">12/02/2020</td>
    //       <td className="p-4">12/05/2021</td>
    //     </tr>
    //     <tr className="border-b-1">
    //       <td className="p-4">fsafgjfgsajfg</td>
    //       <td className="p-4">some file</td>
    //       <td className="p-4">200 kb</td>
    //       <td className="p-4">12/02/2020</td>
    //       <td className="p-4">12/05/2021</td>
    //     </tr>
    //     <tr className="border-b-1">
    //       <td className="p-4">fsafgjfgsajfg</td>
    //       <td className="p-4">some file</td>
    //       <td className="p-4">200 kb</td>
    //       <td className="p-4">12/02/2020</td>
    //       <td className="p-4">12/05/2021</td>
    //     </tr>
    //     <tr className="border-b-1">
    //       <td className="p-4">fsafgjfgsajfg</td>
    //       <td className="p-4">some file</td>
    //       <td className="p-4">200 kb</td>
    //       <td className="p-4">12/02/2020</td>
    //       <td className="p-4">12/05/2021</td>
    //     </tr>
    //     <tr className="border-b-1">
    //       <td className="p-4">fsafgjfgsajfg</td>
    //       <td className="p-4">some file</td>
    //       <td className="p-4">200 kb</td>
    //       <td className="p-4">12/02/2020</td>
    //       <td className="p-4">12/05/2021</td>
    //     </tr>
    //     <tr className="border-b-1">
    //       <td className="p-4">fsafgjfgsajfg</td>
    //       <td className="p-4">some file</td>
    //       <td className="p-4">200 kb</td>
    //       <td className="p-4">12/02/2020</td>
    //       <td className="p-4">12/05/2021</td>
    //     </tr>
    //     <tr>
    //       <td className="p-4">fsafgjfgsajfg</td>
    //       <td className="p-4">some file</td>
    //       <td className="p-4">200 kb</td>
    //       <td className="p-4">12/02/2020</td>
    //       <td className="p-4">12/05/2021</td>
    //     </tr>
    //   </tbody>
    // </table>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default Documents;
