import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';

const EditPopup = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    textSmall: {
      fontSize: '1rem'
    },
    button: {
      backgroundColor: '#ffffff !important',
      color: '#000000',
      fontSize: '10px !important',
      borderRadius: '15px',
      boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
      padding: '4px 12px',
      display: 'flex',
      textTransform: 'capitalize',
      '&:hover': {
        background: '#000000 !important',
        color: '#ffffff'
      }
    }
  }));
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <div className="flex w-full">
          <div className="w-3/5 flex flex-wrap">
            {/* <div className=" flex w-full justify-end">
                        <Button color="primary" variant="outlined" className={clsx('', classes.button)}>Edit</Button>
                    </div> */}

            <div className="shadow-md w-full p-8 mb-20">
              <div className="flex w-full">
                <div className="w-1/2 text-black">
                  <h4 className="text-xs font-semibold">Property</h4>
                </div>
                <div className="w-1/2 text-black text-right">
                  <div className="justify-end flex">
                    <Button
                      color="primary"
                      variant="outlined"
                      className={clsx('', classes.button)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>

              <div class="flex w-full pb-4">
                <div className="grid lg:grid-cols-5 sm:grid-cols-1 w-full flex">
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Loan No</span>
                    <span className="text-blue-500">omsdemo02</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>List DT</span>
                    <span className="text-blue-500">-</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>List Price</span>
                    <span className="text-blue-500">200</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Listing Type</span>
                    <span className="text-blue-500">Completed</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Division</span>
                    <span className="text-blue-500">Unique</span>
                  </li>

                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>List Agree Exp</span>
                    <span className="text-blue-500">06/05/21</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>FMV</span>
                    <span className="text-blue-500">$115.220</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Reserve Price</span>
                    <span className="text-blue-500">$89,000.00</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>FC Value</span>
                    <span className="text-blue-500">$0.00</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Auction Cycle</span>
                    <span className="text-blue-500">10</span>
                  </li>

                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Prior</span>
                    <span className="text-blue-500">C Woodx</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Strategy</span>
                    <span className="text-blue-500">As is</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Asset Manager</span>
                    <span className="text-blue-500">D.Getz</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>MI/Paid</span>
                    <span className="text-blue-500">No - NA</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Litigation</span>
                    <span className="text-blue-500">-</span>
                  </li>
                </div>
              </div>
            </div>

            <div className="shadow-md w-full p-8">
              <div class="flex w-full pb-4">
                <div className="w-1/2 text-black">
                  <h4 className="text-xs font-semibold">Association</h4>
                </div>
                <div className="w-1/2 text-black text-right">
                  <div className="justify-end flex">
                    <Button
                      color="primary"
                      variant="outlined"
                      className={clsx('', classes.button)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>

              <div class="flex w-full">
                <div className="grid lg:grid-cols-5 sm:grid-cols-1 w-full flex">
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Address</span>
                    <span className="text-blue-500">
                      6404 international Parkway,dallas,AK,75093
                    </span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Country</span>
                    <span className="text-blue-500">-</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Status</span>
                    <span className="text-blue-500">Available</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Occupancy</span>
                    <span className="text-blue-500">Vacant</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Auction Status</span>
                    <span className="text-blue-500">Auction Ended</span>
                  </li>

                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Agent</span>
                    <span className="text-blue-500">J.Lawrence</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Agent Grade</span>
                    <span className="text-blue-500">-</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Title</span>
                    <span className="text-blue-500">Review (4)</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Inv Name (ID)</span>
                    <span className="text-blue-500">
                      REO Usda Rural Housing
                    </span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Investor Group</span>
                    <span className="text-blue-500">US Bank</span>
                  </li>

                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span># of Views</span>
                    <span className="text-blue-500">150</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span># of Watches</span>
                    <span className="text-blue-500">0</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Clone DT</span>
                    <span className="text-blue-500">None</span>
                  </li>
                  <li
                    className={clsx('flex flex-col mb-12', classes.textSmall)}
                  >
                    <span>Red Exp DT</span>
                    <span className="text-blue-500">12/12/2020</span>
                  </li>
                </div>
              </div>
            </div>
          </div>

          <div className="w-2/5 ml-20">
            <div className="shadow-md w-full p-8">
              <div class="flex w-full flex-wrap mb-10">
                <div className="w-1/2 text-black">
                  <h4 className="text-xs font-semibold">Property Image</h4>
                </div>
                {/* <div className="w-1/2 text-black text-right">
                                <div className="justify-end flex">
                                    <Button color="primary" variant="outlined" className={clsx('', classes.button)}>Edit</Button>
                                </div>
                            </div> */}
              </div>

              <div className="flex w-full flex-wrap justify-center">
                <img
                  src="/assets/images/demo-content/property.jpg"
                  alt=""
                  width="430"
                />
              </div>
            </div>
            <div className="text-black p-4">
              <div className="justify-center flex">
                <Button
                  color="primary"
                  variant="outlined"
                  className={clsx('my-10', classes.button)}
                >
                  Image Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPopup;
