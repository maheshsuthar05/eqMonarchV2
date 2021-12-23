import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload} from '@fortawesome/free-solid-svg-icons';

const KpiOffer =() => {
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    textSmall: {
        fontSize: '1rem'
    },
    verticalText: {
        letterSpacing: '2px',
        writingMode: 'vertical-rl'
    },
}));
const classes = useStyles();

return (
    <>
        <div className={classes.root}>
        <div className="flex w-full">
                    <div className="flex w-full shadow-md p-8 flex-wrap bg-white rounded-md mb-10">
                            <div className="flex w-full mt-4 flex-wrap pl-8">
                                    <div class="flex w-full">
                                        <h5 className={clsx('text-xs font-semibold p-6 bg-blue-700 text-white', classes.verticalText)}>KPI's</h5>
                                        <div className="grid lg:grid-cols-5 sm:grid-cols-1 w-full flex pl-16">
                                                <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                    <span>Listing Price</span> 
                                                    <span className="text-blue-500 text-2xl pt-6">$0.00</span>
                                                </li>
                                                <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                    <span>Valuation</span> 
                                                    <span className="text-black text-2xl pt-6">$0.00</span>
                                                </li>
                                                <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                    <span>Days in REO</span> 
                                                    <span className="text-green-600 text-2xl pt-6">12</span>
                                                </li>
                                                <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                    <span>Open</span> 
                                                    <span className="text-red-600 text-2xl pt-6">0 <span className="text-xs">Tasks</span></span>
                                                </li>
                                                <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                    <span>Completed</span> 
                                                    <span className="text-yellow-800 text-2xl pt-6">0 <span className="text-xs">Tasks</span></span>
                                                </li>
                                            </div>

                                            <h5 className={clsx('text-xs font-semibold p-6 bg-yellow-900 text-white', classes.verticalText)}>Offers</h5>
                                            <div className="grid lg:grid-cols-5 sm:grid-cols-1 w-full flex pl-16">
                                                <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                    <span>New</span> 
                                                    <span className="text-blue-500 text-2xl pt-6">0</span>
                                                </li>
                                                <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                    <span>Accepted</span> 
                                                    <span className="text-black text-2xl pt-6">5</span>
                                                </li>
                                                <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                    <span>Negotiating</span> 
                                                    <span className="text-green-600 text-2xl pt-6">4</span>
                                                </li>
                                                <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                    <span>Held</span> 
                                                    <span className="text-red-600 text-2xl pt-6">10</span>
                                                </li>
                                                <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                    <span>Rejected</span> 
                                                    <span className="text-yellow-800 text-2xl pt-6">2</span>
                                                </li>
                                            </div>
                                    </div>
                            </div>
                        </div>
                </div>

                <div className="flex w-full">
                    <div className="flex w-full shadow-md p-8 flex-wrap bg-white rounded-md mb-10">
                            <div class="flex w-full bg-grey-100 p-8">
                                    <div className="w-1/2 text-black">
                                        <h5 className="text-xs font-semibold">Property Details</h5>
                                    </div>
                                    <div className="w-1/2 text-black text-right">
                                        <div className="justify-end flex">
                                            <FontAwesomeIcon icon={faFileUpload} className="fa-w-20 pr-8 text-xl align-bottom cursor-pointer mr-16 text-blue-700"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex w-full mt-4 flex-wrap">
                                    <div className="w-full text-black p-4">
                                       esfffsff 
                                    </div>
                                </div>
                    </div>
                </div>
        </div>
    </>
)
}

export default KpiOffer;