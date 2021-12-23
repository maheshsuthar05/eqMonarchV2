import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faExpand } from '@fortawesome/free-solid-svg-icons';

const Messages = () => {
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
            Messages
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
              <table className="table-auto w-full text-black text-xs checkbox">
                <thead className="text-left">
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-10">
                  <tr className="border-b-1">
                    <td className="p-4">
                      <Checkbox
                        inputProps={{
                          'aria-label': 'uncontrolled-checkbox'
                        }}
                      />
                    </td>
                    <td className="">Ge</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">Testing Document</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">
                      <Checkbox
                        inputProps={{
                          'aria-label': 'uncontrolled-checkbox'
                        }}
                      />
                    </td>
                    <td className="">Va</td>
                    <td className="p-4">VILLA, M</td>
                    <td className="p-4">Assistant</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">
                      <Checkbox
                        inputProps={{
                          'aria-label': 'uncontrolled-checkbox'
                        }}
                      />
                    </td>
                    <td className="">Gd</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">Business Devmanager</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">
                      <Checkbox
                        inputProps={{
                          'aria-label': 'uncontrolled-checkbox'
                        }}
                      />
                    </td>
                    <td className="">Ma</td>
                    <td className="p-4">Asset Manager</td>
                    <td className="p-4">Merylin A</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">
                      <Checkbox
                        inputProps={{
                          'aria-label': 'uncontrolled-checkbox'
                        }}
                      />
                    </td>
                    <td className="">Ge</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">Testing Document</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">
                      <Checkbox
                        inputProps={{
                          'aria-label': 'uncontrolled-checkbox'
                        }}
                      />
                    </td>
                    <td className="">Va</td>
                    <td className="p-4">VILLA, M</td>
                    <td className="p-4">Assistant</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">
                      <Checkbox
                        inputProps={{
                          'aria-label': 'uncontrolled-checkbox'
                        }}
                      />
                    </td>
                    <td className="">Gd</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">Business Devmanager</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">
                      <Checkbox
                        inputProps={{
                          'aria-label': 'uncontrolled-checkbox'
                        }}
                      />
                    </td>
                    <td className="">Ma</td>
                    <td className="p-4">Asset Manager</td>
                    <td className="p-4">Merylin A</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">
                      <Checkbox
                        inputProps={{
                          'aria-label': 'uncontrolled-checkbox'
                        }}
                      />
                    </td>
                    <td className="">Va</td>
                    <td className="p-4">VILLA, M</td>
                    <td className="p-4">Assistant</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">
                      <Checkbox
                        inputProps={{
                          'aria-label': 'uncontrolled-checkbox'
                        }}
                      />
                    </td>
                    <td className="">Gd</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">Business Devmanager</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">
                      <Checkbox
                        inputProps={{
                          'aria-label': 'uncontrolled-checkbox'
                        }}
                      />
                    </td>
                    <td className="">Ma</td>
                    <td className="p-4">Asset Manager</td>
                    <td className="p-4">Merylin A</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">
                      <Checkbox
                        inputProps={{
                          'aria-label': 'uncontrolled-checkbox'
                        }}
                      />
                    </td>
                    <td className="">Va</td>
                    <td className="p-4">VILLA, M</td>
                    <td className="p-4">Assistant</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">
                      <Checkbox
                        inputProps={{
                          'aria-label': 'uncontrolled-checkbox'
                        }}
                      />
                    </td>
                    <td className="">Gd</td>
                    <td className="p-4">GETZ, D</td>
                    <td className="p-4">Business Devmanager</td>
                  </tr>
                  <tr className="border-b-1">
                    <td className="p-4">
                      <Checkbox
                        inputProps={{
                          'aria-label': 'uncontrolled-checkbox'
                        }}
                      />
                    </td>
                    <td className="">Ma</td>
                    <td className="p-4">Asset Manager</td>
                    <td className="p-4">Merylin A</td>
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

export default Messages;
