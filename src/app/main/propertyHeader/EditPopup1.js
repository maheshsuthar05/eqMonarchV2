import React from 'react'
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const EditPopup1 =() => {
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
        }, 
    },
    selectDropdown: {
        border: '1px solid #c4c4c4',
        borderRadius: '4px'
    }
}));
const classes = useStyles();
const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
return (
    <>
        <div className={classes.root}>
            <div className="flex w-full">
                <div className="flex flex-wrap">
                    {/* <div className=" flex w-full justify-end">
                        <Button color="primary" variant="outlined" className={clsx('', classes.button)}>Edit</Button>
                    </div> */}
                    
                        <div className="shadow-md w-full p-8 mb-20">
                            <div class="flex w-full">
                                <div className="w-1/2 text-black">
                                    <h4 className="text-xs font-semibold">Property</h4>
                                </div>
                                <div className="w-1/2 text-black text-right">
                                    <div className="justify-end flex">
                                        {/* <span className={clsx('text-blue-500 text-11 font-semibold underline cursor-pointer')}>Save</span> */}
                                        <Button color="primary" variant="outlined" className={clsx('', classes.button)}>Save</Button>
                                    </div>
                                </div>
                            </div>

                            <div class="flex w-full pb-4">
                                <div className="grid lg:grid-cols-5 sm:grid-cols-1 w-full flex">
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Loan No</span> 
                                        <TextField id="outlined-basic" label="" value="omsdemo02" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>List DT</span> 
                                        <TextField id="outlined-basic" label="" value="-" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>List Price</span> 
                                        <TextField id="outlined-basic" label="" value="200" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Listing Type</span> 
                                        <TextField id="outlined-basic" label="" value="Completed" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Division</span> 
                                        <Select className={clsx('', classes.selectDropdown)}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            onChange={handleChange}
                                            >
                                            <MenuItem value={age}>Choose a Division</MenuItem>
                                            <MenuItem value={10}>CLMS</MenuItem>
                                            <MenuItem value={20}>HBUS</MenuItem>
                                            <MenuItem value={30}>HSS</MenuItem>
                                        </Select>
                                    </li>

                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>List Agree Exp</span> 
                                        <TextField id="outlined-basic" label="" value="11/21/20" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>FMV</span> 
                                        <TextField id="outlined-basic" label="" value="$530,000" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Reserve Price</span> 
                                        <TextField id="outlined-basic" label="" value="$325,000.00" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>FC Value</span> 
                                        <TextField id="outlined-basic" label="" value="$0.00" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Auction Cycle</span> 
                                        <TextField id="outlined-basic" label="" value="28" variant="outlined"/>
                                    </li>

                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Prior</span> 
                                        <TextField id="outlined-basic" label="" value="C Woodx" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Strategy</span> 
                                        <TextField id="outlined-basic" label="" value="As is" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Asset Manager</span> 
                                        <TextField id="outlined-basic" label="" value="D.Getz" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>MI/Paid</span> 
                                        <TextField id="outlined-basic" label="" value="No - NA" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Litigation</span> 
                                        <TextField id="outlined-basic" label="" value="-" variant="outlined"/>
                                    </li>
                                </div>
                            </div>

                        </div>

                        <div className="shadow-md w-full p-8">
                            <div class="flex w-full pb-4">
                                <div className="w-1/2 text-black">
                                    <h4 className="text-xs font-semibold">Mortgage Insurance</h4>
                                </div>
                                <div className="w-1/2 text-black text-right">
                                    <div className="justify-end flex">
                                        {/* <span className={clsx('text-blue-500 text-11 font-semibold underline cursor-pointer')}>Save</span> */}
                                        <Button color="primary" variant="outlined" className={clsx('', classes.button)}>Save</Button>
                                    </div>
                                </div>
                            </div>

                            <div class="flex w-full">
                                <div className="grid lg:grid-cols-5 sm:grid-cols-1 w-full flex">
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Is there MI?</span> 
                                        <Select className={clsx('', classes.selectDropdown)}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            onChange={handleChange}
                                            >
                                            <MenuItem value={10}>Yes</MenuItem>
                                            <MenuItem value={20}>No</MenuItem>
                                        </Select>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>MI Company</span> 
                                        <TextField id="outlined-basic" label="" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>MI Policy Number</span> 
                                        <TextField id="outlined-basic" label="" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Code</span> 
                                        <TextField id="outlined-basic" label="" value="code" disabled variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Pool number</span> 
                                        <TextField id="outlined-basic" label="" value="Pool number" disabled variant="outlined"/>
                                    </li>

                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Policy Number</span> 
                                        <TextField id="outlined-basic" label="" value="Policy number" disabled variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Paid</span> 
                                        <Select className={clsx('', classes.selectDropdown)}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            onChange={handleChange}
                                            >
                                            <MenuItem value={10}>Paid</MenuItem>
                                        </Select>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Claim filed date</span> 
                                        <TextField id="outlined-basic" label="" value="Claim filed date" disabled variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Claim amount</span> 
                                        <TextField id="outlined-basic" label="" value="Claim amount" disabled variant="outlined"/>
                                    </li>
                                </div>
                            </div>
                        </div>

                        <div className="shadow-md w-full p-8">
                            <div class="flex w-full pb-4">
                                <div className="w-1/2 text-black">
                                    <h4 className="text-xs font-semibold">Foreclosure</h4>
                                </div>
                                <div className="w-1/2 text-black text-right">
                                    <div className="justify-end flex">
                                        {/* <span className={clsx('text-blue-500 text-11 font-semibold underline cursor-pointer')}>Save</span> */}
                                        <Button color="primary" variant="outlined" className={clsx('', classes.button)}>Save</Button>
                                    </div>
                                </div>
                            </div>

                            <div class="flex w-full">
                                <div className="grid lg:grid-cols-5 sm:grid-cols-1 w-full flex">
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Title taken date</span> 
                                        <TextField id="outlined-basic" label="" value="05/01/2021" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>DIL</span> 
                                        <Select className={clsx('', classes.selectDropdown)}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            onChange={handleChange}
                                            >
                                            <MenuItem value={10}>Yes</MenuItem>
                                            <MenuItem value={20}>No</MenuItem>
                                            <MenuItem value={30}>HSS</MenuItem>
                                        </Select>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>JD/FCL</span> 
                                        <Select className={clsx('', classes.selectDropdown)}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            onChange={handleChange}
                                            >
                                            <MenuItem value={10}>Select</MenuItem>
                                            <MenuItem value={20}></MenuItem>
                                            <MenuItem value={30}></MenuItem>
                                        </Select>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>FC sale date</span> 
                                        <TextField id="outlined-basic" label="" value="05/01/2021" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>FC sale value</span> 
                                        <TextField id="outlined-basic" label="" value="12322" variant="outlined"/>
                                    </li>

                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>FC sale valuation date</span> 
                                        <TextField id="outlined-basic" label="" value="05/01/2021" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Foreclosure Attorney Firm</span> 
                                        <TextField id="outlined-basic" label="" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Foreclosure Attorney Name</span> 
                                        <TextField id="outlined-basic" label="" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Foreclosure Attorney Address</span> 
                                        <TextField id="outlined-basic" label="" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Foreclosure Attorney Phone</span> 
                                        <TextField id="outlined-basic" label="" variant="outlined"/>
                                    </li>

                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Foreclosure Attorney Email</span> 
                                        <TextField id="outlined-basic" label="" variant="outlined"/>
                                    </li>
                                    <li className={clsx('flex flex-col mb-12', classes.textSmall)}>
                                        <span>Investor Id</span> 
                                        <TextField id="outlined-basic" label="" value="123" variant="outlined"/>
                                    </li>
                                </div>
                            </div>
                        </div>

                </div>

            </div>
        </div>
    </>
)
}

export default EditPopup1;