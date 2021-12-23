import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Chart } from 'react-google-charts';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';

import withReducer from 'app/store/withReducer';
import reducer from 'app/main/agent/store/reducers';
import Widget1 from 'app/main/agent/widgets/Widget1';
import Widget2 from 'app/main/agent/widgets/Widget2';
import Widget3 from 'app/main/agent/widgets/Widget3';
import Widget4 from 'app/main/agent/widgets/Widget4';
import Widget6 from 'app/main/agent/widgets/Widget6';
import Widget7 from 'app/main/agent/widgets/Widget7';
import WidgetData from 'app/main/agent/widgets/WidgetData';

const MiddleContent2 =() => {
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    widthBox: {
        width: '170px'
    },
    text11: {
        fontSize: '1.1rem'
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
        }, 
    },
    heightSec: {
        height: '150px'
    },
    mailHeight: {
        height: '365px'
    }
}));
const classes = useStyles();
return (
    <>
        <div className={classes.root}>
            <div className="flex mt-10 flex-wrap">

            {/* <div className="widget flex w-full flex-wrap  p-12">
                <Widget7 widget={WidgetData.widgets[6]} />
            </div> */}

            <div class="flex w-full pb-4 gap-8 mb-10">
                <div className="w-1/2 text-black">
                    <div class="flex w-full shadow-md p-8 flex-wrap bg-white rounded-md mb-10">
                    <div class="flex w-full bg-grey-100 p-8">
                        <div className="w-1/2 text-black">
                            <h5 className="text-xs font-semibold">Messages</h5>
                        </div>
                        <div className="w-1/2 text-black text-right">
                            <div className="justify-end flex">
                                <span className={clsx('text-blue-500 font-semibold underline cursor-pointer mr-16', classes.textSmall)}>Compose</span>
                                <span className={clsx('text-blue-500 font-semibold underline cursor-pointer', classes.textSmall)}>Full View</span>
                            </div>
                        </div>
                    </div>

                            <div className="flex w-full mt-4 flex-wrap">
                                <div className="w-full text-black p-4">
                                    <div className={clsx('flex w-full overflow-auto', classes.mailHeight)}>
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
                                                    <td className="p-4"><Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
                                                    <td className="">Ge</td>
                                                    <td className="p-4">GETZ, D</td>
                                                    <td className="p-4">Testing Document</td>
                                                </tr>
                                                <tr className="border-b-1">
                                                    <td className="p-4"><Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
                                                    <td className="">Va</td>
                                                    <td className="p-4">VILLA, M</td>
                                                    <td className="p-4">Assistant</td>
                                                </tr>
                                                <tr className="border-b-1">
                                                    <td className="p-4"><Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
                                                    <td className="">Gd</td>
                                                    <td className="p-4">GETZ, D</td>
                                                    <td className="p-4">Business Devmanager</td>
                                                </tr>
                                                <tr className="border-b-1">
                                                    <td className="p-4"><Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
                                                    <td className="">Ma</td>
                                                    <td className="p-4">Asset Manager</td>
                                                    <td className="p-4">Merylin A</td>
                                                </tr>
                                                <tr className="border-b-1">
                                                    <td className="p-4"><Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
                                                    <td className="">Ge</td>
                                                    <td className="p-4">GETZ, D</td>
                                                    <td className="p-4">Testing Document</td>
                                                </tr>
                                                <tr className="border-b-1">
                                                    <td className="p-4"><Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
                                                    <td className="">Va</td>
                                                    <td className="p-4">VILLA, M</td>
                                                    <td className="p-4">Assistant</td>
                                                </tr>
                                                <tr className="border-b-1">
                                                    <td className="p-4"><Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
                                                    <td className="">Gd</td>
                                                    <td className="p-4">GETZ, D</td>
                                                    <td className="p-4">Business Devmanager</td>
                                                </tr>
                                                <tr className="border-b-1">
                                                    <td className="p-4"><Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
                                                    <td className="">Ma</td>
                                                    <td className="p-4">Asset Manager</td>
                                                    <td className="p-4">Merylin A</td>
                                                </tr>
                                                <tr className="border-b-1">
                                                    <td className="p-4"><Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
                                                    <td className="">Va</td>
                                                    <td className="p-4">VILLA, M</td>
                                                    <td className="p-4">Assistant</td>
                                                </tr>
                                                <tr className="border-b-1">
                                                    <td className="p-4"><Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
                                                    <td className="">Gd</td>
                                                    <td className="p-4">GETZ, D</td>
                                                    <td className="p-4">Business Devmanager</td>
                                                </tr>
                                                <tr className="border-b-1">
                                                    <td className="p-4"><Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
                                                    <td className="">Ma</td>
                                                    <td className="p-4">Asset Manager</td>
                                                    <td className="p-4">Merylin A</td>
                                                </tr>
                                                <tr className="border-b-1">
                                                    <td className="p-4"><Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
                                                    <td className="">Va</td>
                                                    <td className="p-4">VILLA, M</td>
                                                    <td className="p-4">Assistant</td>
                                                </tr>
                                                <tr className="border-b-1">
                                                    <td className="p-4"><Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
                                                    <td className="">Gd</td>
                                                    <td className="p-4">GETZ, D</td>
                                                    <td className="p-4">Business Devmanager</td>
                                                </tr>
                                                <tr className="border-b-1">
                                                    <td className="p-4"><Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
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
                </div>

                <div className="w-1/2 text-black">
                    <div class="flex w-full shadow-md p-8 flex-wrap bg-white rounded-md mb-10">
                        <div class="flex w-full bg-grey-100 p-8">
                            <div className="w-1/2 text-black">
                                <h5 className="text-xs font-semibold">Roles</h5>
                            </div>
                            <div className="w-1/2 text-black text-right">
                                <div className="justify-end flex">
                                    <span className={clsx('text-blue-500 font-semibold underline cursor-pointer mr-16', classes.textSmall)}>Save</span>
                                    <span className={clsx('text-blue-500 font-semibold underline cursor-pointer', classes.textSmall)}>Cancel</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex w-full mt-4 flex-wrap">
                                <div className="w-full text-black p-4">
                                    <div className={clsx('flex w-full overflow-auto', classes.heightSec)}>
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

                    <div class="flex w-full shadow-md p-8 flex-wrap bg-white rounded-md mb-10">
                    <div class="flex w-full bg-grey-100 p-8">
                            <div className="w-1/2 text-black">
                                <h5 className="text-xs font-semibold">Snapshot</h5>
                            </div>
                        </div>

                        <div className={clsx('flex w-full mt-4 flex-wrap overflow-auto', classes.heightSec)}>
                                <div className="w-full text-black p-4 border-b-1">
                                    <div class="flex w-full">
                                        <h5 className="text-xs font-semibold pb-8">KPI's</h5>
                                    </div>
                                    <div class="flex w-full">
                                        <div className="grid lg:grid-cols-4 sm:grid-cols-1 w-full flex">
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Listing Price</span> 
                                                <span className="text-blue-500 text-2xl">$0.00</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Valuation</span> 
                                                <span className="text-black text-2xl">$0.00</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Days in REO</span> 
                                                <span className="text-green-600 text-2xl">12</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Open</span> 
                                                <span className="text-red-600 text-2xl">0 <span className="text-xs">Tasks</span></span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Completed</span> 
                                                <span className="text-yellow-800 text-2xl">0 <span className="text-xs">Tasks</span></span>
                                            </li>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full text-black p-4 border-b-1">
                                    <div class="flex w-full">
                                        <h5 className="text-xs font-semibold pb-8">Preservation Activities</h5>
                                    </div>
                                    <div class="flex w-full">
                                        <div className="grid lg:grid-cols-2 sm:grid-cols-1 w-full flex">
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Inspection</span> 
                                                <span className="text-blue-500 leading-5">Start Date - 6/1/2020</span>
                                                <span className="text-blue-500 leading-5">Settlement - 6/30/2020</span>
                                                <span className="text-blue-500 leading-5">Confirmation - 7/4/2020</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Appraisal</span> 
                                                <span className="text-blue-500 leading-5">Start Date - 6/1/2020</span>
                                                <span className="text-blue-500 leading-5">Settlement - 6/30/2020</span>
                                                <span className="text-blue-500 leading-5">Confirmation - 7/4/2020</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Title</span> 
                                                <span className="text-blue-500 leading-5">Start Date - 6/1/2020</span>
                                                <span className="text-blue-500 leading-5">Settlement - 6/30/2020</span>
                                                <span className="text-blue-500 leading-5">Confirmation - 7/4/2020</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Occupancy</span> 
                                                <span className="text-blue-500 leading-5">Start Date - 6/1/2020</span>
                                                <span className="text-blue-500 leading-5">Settlement - 6/30/2020</span>
                                                <span className="text-blue-500 leading-5">Confirmation - 7/4/2020</span>
                                            </li>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full text-black p-4">
                                    <div class="flex w-full">
                                        <h5 className="text-xs font-semibold pb-8">REO</h5>
                                    </div>
                                    <div class="flex w-full">
                                        <div className="grid lg:grid-cols-2 sm:grid-cols-1 w-full flex">
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Date</span> 
                                                <span className="text-blue-500 leading-5">Start Date - 6/1/2020</span>
                                                <span className="text-blue-500 leading-5">Settlement - 6/30/2020</span>
                                                <span className="text-blue-500 leading-5">Confirmation - 7/4/2020</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Marketing</span> 
                                                <span className="text-blue-500 leading-5">List Status - Not Listed</span>
                                                <span className="text-blue-500 leading-5">List Date - 6/30/2020</span>
                                                <span className="text-blue-500 leading-5">List Price - $155.00</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Closing</span> 
                                                <span className="text-blue-500 leading-5">Status - Not Closed</span>
                                                <span className="text-blue-500 leading-5">Est Closing Date - 6/30/2020</span>
                                                <span className="text-blue-500 leading-5">Reason - N/A</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Disposition</span> 
                                                <span className="text-blue-500 leading-5">Sale Price - $165.00</span>
                                                <span className="text-blue-500 leading-5">Net Proceeds - $165.00</span>
                                                <span className="text-blue-500 leading-5">Sale Date - 11/1/2020</span>
                                            </li>
                                        </div>
                                    </div>
                                </div>

                            </div>
                    </div>
                </div>

                <div className="w-1/2 text-black">
                    <div class="flex w-full shadow-md p-8 flex-wrap bg-white rounded-md mb-10">
                        <div class="flex w-full bg-grey-100 p-8">
                            <div className="w-1/2 text-black">
                                <h5 className="text-xs font-semibold">Documents</h5>
                            </div>
                            <div className="w-1/2 text-black text-right">
                                <div className="justify-end flex">
                                    <span className={clsx('text-blue-500 font-semibold underline cursor-pointer mr-16', classes.textSmall)}>Upload</span>
                                    <span className={clsx('text-blue-500 font-semibold underline cursor-pointer', classes.textSmall)}>Full View</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full mt-4 flex-wrap">
                                <div className="w-full text-black p-4">
                                    <div className={clsx('flex w-full overflow-auto', classes.heightSec)}>
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

                    <div class="flex w-full shadow-md p-8 flex-wrap bg-white rounded-md mb-5">
                        <div class="flex w-full bg-grey-100 p-8">
                            <div className="w-1/2 text-black">
                                <h5 className="text-xs font-semibold">Summary</h5>
                            </div>
                            {/* <div className="w-1/2 text-black text-right">
                                <div className="justify-end flex">
                                    <span className={clsx('text-blue-500 font-semibold underline cursor-pointer mr-16', classes.textSmall)}>Upload</span>
                                    <span className={clsx('text-blue-500 font-semibold underline cursor-pointer', classes.textSmall)}>Full View</span>
                                </div>
                            </div> */}
                        </div>

                        <div className={clsx('flex w-full mt-4 flex-wrap overflow-auto', classes.heightSec)}>
                                <div className="w-full text-black p-4 border-b-1">
                                    <div class="flex w-full">
                                        <h5 className="text-xs font-semibold pb-8">Strategy</h5>
                                    </div>
                                    <div class="flex w-full">
                                        <div className="grid lg:grid-cols-4 sm:grid-cols-1 w-full flex">
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>CWCOT</span> 
                                                <span className="text-blue-500">$0</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Conveyance</span> 
                                                <span className="text-blue-500">$0</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>REOAsIs</span> 
                                                <span className="text-blue-500">$0</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>REORepair</span> 
                                                <span className="text-blue-500">$0</span>
                                            </li>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full text-black p-4 border-b-1">
                                    <div class="flex w-full">
                                        <h5 className="text-xs font-semibold pb-8">Time Projections</h5>
                                    </div>
                                    <div class="flex w-full">
                                        <div className="grid lg:grid-cols-2 sm:grid-cols-1 w-full flex">
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>CWCOT</span> 
                                                <span className="text-blue-500 leading-5"># Months - 2.74</span>
                                                <span className="text-blue-500 leading-5">Start 09/04/2020</span>
                                                <span className="text-blue-500 leading-5">End 20/10/2020</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Conveyance</span> 
                                                <span className="text-blue-500 leading-5"># Months - 3.97</span>
                                                <span className="text-blue-500 leading-5">Start 09/04/2020</span>
                                                <span className="text-blue-500 leading-5">End 20/10/2020</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>REOAsIs</span> 
                                                <span className="text-blue-500 leading-5"># Months - 7.35</span>
                                                <span className="text-blue-500 leading-5">Start 09/04/2020</span>
                                                <span className="text-blue-500 leading-5">End 20/10/2020</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>REORepair</span> 
                                                <span className="text-blue-500 leading-5"># Months - 9.90</span>
                                                <span className="text-blue-500 leading-5">Start 09/04/2020</span>
                                                <span className="text-blue-500 leading-5">End 20/10/2020</span>
                                            </li>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full text-black p-4 border-b-1">
                                    <div class="flex w-full">
                                        <h5 className="text-xs font-semibold pb-8">Savings</h5>
                                    </div>
                                    <div class="flex w-full">
                                        <div className="grid lg:grid-cols-4 sm:grid-cols-1 w-full flex">
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>CWCOT</span> 
                                                <span className="text-blue-500">$12.00</span>
                                                <span className="text-blue-500 leading-5">Gain Loss</span>
                                                <span className="text-blue-500 leading-5">Savings</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Conveyance</span> 
                                                <span className="text-blue-500">$16.00</span>
                                                <span className="text-blue-500 leading-5">Gain Loss</span>
                                                <span className="text-blue-500 leading-5">Savings</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>REOAsIs</span> 
                                                <span className="text-blue-500">$24.00</span>
                                                <span className="text-blue-500 leading-5">Gain Loss</span>
                                                <span className="text-blue-500 leading-5">Savings</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>REORepair</span> 
                                                <span className="text-blue-500">$32.00</span>
                                                <span className="text-blue-500 leading-5">Gain Loss</span>
                                                <span className="text-blue-500 leading-5">Savings</span>
                                            </li>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full text-black p-4">
                                    <div class="flex w-full">
                                        <h5 className="text-xs font-semibold pb-8">REO</h5>
                                    </div>
                                    <div class="flex w-full">
                                        <div className="grid lg:grid-cols-4 sm:grid-cols-1 w-full flex">
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Date</span> 
                                                <span className="text-blue-500 leading-5">Start Date : 6/1/2020</span>
                                                <span className="text-blue-500 leading-5">Settlement : 6/30/2020</span>
                                                <span className="text-blue-500 leading-5">Confirmation : 7/4/2020</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Marketing</span> 
                                                <span className="text-blue-500 leading-5">List Status : 6/1/2020</span>
                                                <span className="text-blue-500 leading-5">List Date : 6/30/2020</span>
                                                <span className="text-blue-500 leading-5">List Price : 7/4/2020</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Closing</span> 
                                                <span className="text-blue-500 leading-5">Status : 6/1/2020</span>
                                                <span className="text-blue-500 leading-5">Close Date : 6/30/2020</span>
                                                <span className="text-blue-500 leading-5">Reason : 7/4/2020</span>
                                            </li>
                                            <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                                                <span>Disposition</span> 
                                                <span className="text-blue-500 leading-5">Sale Price : 6/1/2020</span>
                                                <span className="text-blue-500 leading-5">Sale Date : 6/30/2020</span>
                                                <span className="text-blue-500 leading-5">Sale Inspection : 7/4/2020</span>
                                            </li>
                                        </div>
                                    </div>
                                </div>
                            </div>

                    </div>
                </div>
            </div>

            <div className="flex flex-wrap">
                <div className="grid lg:grid-cols-1 sm:grid-cols-1 flex space-x-8 w-full">
                    <div className="bg-white rounded-md shadow-md p-8 w-full flex"> 
                    <h3 className="mb-10 font-semibold">Timeline</h3>
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
                            ['', 1000, 2.05, 'Others', 15000],
                        ]}
                        options={{
                            title:'',
                            hAxis: { title: '' },
                            vAxis: { title: '' },
                            bubble: { textStyle: { fontSize: 11 } },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                        />
                    </div>
                    
                </div>
            </div>

                {/* <h3 className="mb-10 font-semibold">Preservation Activities</h3> */}
                {/* <div className="grid lg:grid-cols-4 sm:grid-cols-1 flex space-x-8 w-full">
                    <div className="bg-white rounded-md shadow-md p-8"> 
                        <p className={clsx('pb-10 font-semibold', classes.text11)}>Inspection</p>
                        <div className="w-full grid lg:grid-cols-2 flex">
                            <ul className={clsx('list-none', classes.widthBox, classes.text11)}>
                                <li className="pb-4">Start Date : <span class="pl-8">6/1/2020</span></li>
                                <li className="pb-4">Settlement : <span class="pl-8">6/30/2020</span></li>
                                <li className="pb-4">Confirmation : <span class="pl-8">7/4/2020</span></li>
                            </ul>
                            <div class="progress">
                                <span class="title timer" data-from="0" data-to="100" data-speed="1800">100</span>
                                <div class="overlay"></div>
                                <div class="left"></div>
                                <div class="right"></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-md shadow-md p-8">
                        <p className={clsx('pb-10 font-semibold', classes.text11)}>Appraisal</p>
                        <div className="w-full grid lg:grid-cols-2 flex">
                            <ul className={clsx('list-none', classes.widthBox, classes.text11)}>
                                <li className="pb-4">Start Date : <span class="pl-8">6/1/2020</span></li>
                                <li className="pb-4">Settlement : <span class="pl-8">6/30/2020</span></li>
                                <li className="pb-4">Confirmation : <span class="pl-8">7/4/2020</span></li>
                            </ul>
                            <div class="progress">
                                <span class="title timer" data-from="0" data-to="100" data-speed="1200">100</span>
                                <div class="overlay"></div>
                                <div class="left colorGreen"></div>
                                <div class="right colorGreen"></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-md shadow-md p-8">
                        <p className={clsx('pb-10 font-semibold', classes.text11)}>Title</p> 
                        <div className="w-full grid lg:grid-cols-2 flex">
                            <ul className={clsx('list-none', classes.widthBox, classes.text11)}>
                                <li className="pb-4">Start Date : <span class="pl-8">6/1/2020</span></li>
                                <li className="pb-4">Settlement : <span class="pl-8">6/30/2020</span></li>
                                <li className="pb-4">Confirmation : <span class="pl-8">7/4/2020</span></li>
                            </ul>
                            <div class="progress">
                                <span class="title timer" data-from="0" data-to="100" data-speed="1000">100</span>
                                <div class="overlay"></div>
                                <div class="left colorOrange"></div>
                                <div class="right colorOrange"></div>
                            </div>
                        </div>  
                    </div>
                    <div className="bg-white rounded-md shadow-md p-8">
                        <p className={clsx('pb-10 font-semibold', classes.text11)}>Occupancy</p> 
                        <div className="w-full grid lg:grid-cols-2 flex">
                            <ul className={clsx('list-none', classes.widthBox, classes.text11)}>
                                <li className="pb-4">Start Date : <span class="pl-8">6/1/2020</span></li>
                                <li className="pb-4">Settlement : <span class="pl-8">6/30/2020</span></li>
                                <li className="pb-4">Confirmation : <span class="pl-8">7/4/2020</span></li>
                            </ul>
                            <div class="progress">
                                <span class="title timer" data-from="0" data-to="100" data-speed="1500">100</span>
                                <div class="overlay"></div>
                                <div class="left colorPurple"></div>
                                <div class="right colorPurple"></div>
                            </div>
                        </div> 
                    </div>
                </div> */}
            </div>

            {/* <div className="flex mt-10 flex-wrap">
                <h3 className="mb-10 font-semibold">REO</h3>
                <div className="bg-white rounded-md shadow-md flex w-full">
                    <div className="space-x-8 p-8 w-1/4 border-r-1 border-gray-300"> 
                        <p className={clsx('pb-10 font-semibold', classes.text11)}>Date</p>
                            <ul className={clsx('list-none', classes.text11)}>
                                <li className="pb-4">Start Date : <span class="pl-8">6/1/2020</span></li>
                                <li className="pb-4">Settlement : <span class="pl-8">6/30/2020</span></li>
                                <li className="pb-4">Confirmation : <span class="pl-8">7/4/2020</span></li>
                            </ul>
                    </div>
                    <div className="space-x-8 p-8 w-1/4 border-r-1 border-gray-300">
                        <p className={clsx('pb-10 font-semibold', classes.text11)}>Marketing</p>
                            <ul className={clsx('list-none', classes.text11)}>
                                <li className="pb-4">List Status : <span class="pl-8">6/1/2020</span></li>
                                <li className="pb-4">List Date : <span class="pl-8">6/30/2020</span></li>
                                <li className="pb-4">List Price : <span class="pl-8">7/4/2020</span></li>
                                <li className="pb-4">Initial List Date : <span class="pl-8">7/4/2020</span></li>
                                <li className="pb-4">List Expiray Date : <span class="pl-8">7/4/2020</span></li>
                            </ul>
                    </div>
                    <div className="space-x-8 p-8 w-1/4 border-r-1 border-gray-300"> 
                        <p className={clsx('pb-10 font-semibold', classes.text11)}>Closing</p>
                            <ul className={clsx('list-none', classes.text11)}>
                                <li className="pb-4">Status : <span class="pl-8">6/1/2020</span></li>
                                <li className="pb-4">Est Closing Date : <span class="pl-8">6/30/2020</span></li>
                                <li className="pb-4">Amended Close Date : <span class="pl-8">7/4/2020</span></li>
                                <li className="pb-4">Original Close Date : <span class="pl-8">7/4/2020</span></li>
                                <li className="pb-4">Closing Date Reason : <span class="pl-8">7/4/2020</span></li>
                            </ul>
                    </div>
                    <div className="space-x-8 p-8 w-1/4 border-r-1 border-gray-300">
                        <p className={clsx('pb-10 font-semibold', classes.text11)}>Disposition</p>
                            <ul className={clsx('list-none', classes.text11)}>
                                <li className="pb-4">Sale Price : <span class="pl-8">6/1/2020</span></li>
                                <li className="pb-4">Net Proceeds : <span class="pl-8">6/30/2020</span></li>
                                <li className="pb-4">Sale Date : <span class="pl-8">7/4/2020</span></li>
                                <li className="pb-4">Contract Executed Date : <span class="pl-8">7/4/2020</span></li>
                                <li className="pb-4">Sale Inspection : <span class="pl-8">7/4/2020</span></li>
                            </ul>
                    </div>
                </div>
            </div> */}

        </div>
    </>
)
}

export default MiddleContent2;