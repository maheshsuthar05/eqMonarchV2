import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faHome } from '@fortawesome/free-solid-svg-icons';
import {IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { openModal } from 'app/store/actions/fuse';
import { useDispatch } from 'react-redux';
import EditPopup from '../propertyHeader/EditPopup.js';
import { Chart } from 'react-google-charts';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';

const Header2 =() => {
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    textSmall: {
        fontSize: '1rem'
    },
    round: {
        borderRadius: '10px',
        padding: '0 5px 0 5px',
        marginLeft: '5px',
        color: '#ffffff'
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
        }, 
    },
}));
const classes = useStyles();
const dispatch = useDispatch();
function handleClick(){
    dispatch(
        openModal({
          children: <EditPopup />,
          title: 'Property Details',
          maxwidth: 'lg'
        })
      );
}
return (
    <>
        <div className={classes.root}>
        <div class="w-full lg:flex lg:flex-nowrap flex-wrap gap-4 ">
            <div className="bg-white rounded-md shadow-md p-8 lg:w-2/5 w-full">
                    <div className="w-full text-black">
                        <h3 className="font-semibold">6404 international Parkway,dallas,AK,75093</h3>
                    </div>
                    <div className="w-full text-black text-left">
                            <span className="text-xs pr-8">
                                <FontAwesomeIcon icon={faBed} className="pr-8 text-xl align-bottom"/>Bed
                            </span>
                            <span className="text-xs pr-8"> 
                                <FontAwesomeIcon icon={faBath} className="pr-8 text-xl align-bottom"/>Bath
                            </span>
                            <span className="text-xs pr-8">
                                <FontAwesomeIcon icon={faHome} className="pr-8 text-xl align-bottom"/>Sqft
                            </span>
                    </div>
                    <div className="w-full text-black text-right">
                        <div>
                            <span className="pr-8 text-xs">Loan No: omsdemo02</span>
                            <span className="pr-8 text-blue-600 text-xs">REO</span>
                            <IconButton className="p-0"
                                onClick={handleClick}
                                color="primary"
                                data-tour="HeaderEditButton"
                                >
                                <MoreVertIcon />
                            </IconButton>
                        </div>
                    </div>
            </div>

            <div className="bg-white rounded-md shadow-md p-8 lg:w-1/5 w-full text-black">
                <div class="flex w-full">
                    <div className="w-1/2 text-black">
                        <p className="text-xs font-semibold">Offers</p>
                    </div>
                    <div className="w-1/2 text-black text-right">
                        <div className="justify-end flex">
                            <p className={clsx('font-semibold text-blue-700 underline cursor-pointer', classes.textSmall)}>Full View</p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex pt-8">
                    <li className={clsx('flex flex-row mb-4', classes.textSmall)}>New <span className={clsx('bg-red-600', classes.round)}>5</span> </li>
                    <li className={clsx('flex flex-row mb-4 ml-12', classes.textSmall)}>Negotiate <span className={clsx('bg-green-600', classes.round)}>2</span> </li>
                    <li className={clsx('flex flex-row mb-4 ml-12', classes.textSmall)}>Rejected <span className={clsx('bg-blue-600', classes.round)}>200</span> </li>
                </div> 
                <div className="w-1/2 flex pt-4">
                    <li className={clsx('flex flex-row mb-4', classes.textSmall)}>Held <span className={clsx('bg-purple-600', classes.round)}>5</span> </li>
                    <li className={clsx('flex flex-row mb-4 ml-12', classes.textSmall)}>Accepted <span className={clsx('bg-yellow-900', classes.round)}>1</span> </li>
                </div>
            </div>

            <div className="bg-white rounded-md shadow-md p-8 lg:w-1/5 w-full text-black">
                <div class="flex w-full">
                    <div className="w-1/2 text-black">
                        <p className="text-xs font-semibold">Tasks</p>
                    </div>
                    <div className="w-1/2 text-black text-right">
                        <div className="justify-end flex">
                            <p className={clsx('font-semibold text-blue-700 underline cursor-pointer', classes.textSmall)}>Full View</p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex pt-8">
                    <li className={clsx('flex flex-row mb-4', classes.textSmall)}>Pending <span className={clsx('bg-red-600', classes.round)}>5</span> </li>
                    <li className={clsx('flex flex-row mb-4 ml-12', classes.textSmall)}>Closed <span className={clsx('bg-green-600', classes.round)}>2</span> </li>
                    <li className={clsx('flex flex-row mb-4 ml-12', classes.textSmall)}>Progress <span className={clsx('bg-blue-600', classes.round)}>2</span> </li>
                </div> 
                <div className="w-full flex pt-4">
                    <li className={clsx('flex w-full flex-row mb-4 font-semibold justify-center', classes.textSmall)}>Total <span className={clsx('bg-black', classes.round)}>250</span> </li>
                </div>      
            </div>

            <div className="bg-white rounded-md shadow-md p-8 lg:w-1/5 w-full text-black">
                <div class="flex w-full">
                    <div className="w-1/2 text-black">
                        <p className="text-xs font-semibold">Expenses</p>
                    </div>
                    <div className="w-1/2 text-black text-right">
                        <div className="justify-end flex">
                            <p className={clsx('font-semibold text-blue-700 underline cursor-pointer', classes.textSmall)}>Full View</p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex pt-8">
                    <li className={clsx('flex flex-row mb-4', classes.textSmall)}>Payee <span className={clsx('bg-red-600', classes.round)}>$1004</span> </li>
                    <li className={clsx('flex flex-row mb-4 ml-12', classes.textSmall)}>Approved <span className={clsx('bg-green-600', classes.round)}>$1004</span> </li>
                </div>
                <div className="w-full flex pt-4">
                    <li className={clsx('flex flex-row mb-4', classes.textSmall)}>Paid <span className={clsx('bg-blue-600', classes.round)}>0</span> </li>
                </div>
            </div>
        </div>

        </div>
    </>
    
)
}

export default Header2;