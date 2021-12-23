import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // margin: '1rem',
    '& .MuiPaper-rounded': {
      boxShadow: 'none'
    }
  },
  textSmall: {
    fontSize: '1rem'
  },
  selectDropdown: {
    border: '1px solid #c4c4c4',
    borderRadius: '0px',
    height: '20px'
  },
  textGrey: {
    color: '#666666'
  },
  titleTxt: {
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    textAlign: 'center',
    padding: '5px 20px',
    fontSize: '1rem',
    fontWeight: '400',
    background: theme.palette.background.widgetTitleBg,
    color: theme.palette.primary.widgetTitleColor
  },
}));

export default function VendorPageNew({ history }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div className="w-full md:flex">
          <div className="lg:w-4/12 sm:w-full w-full text-black bg-white rounded-md shadow-md p-8 mr-8 mb-4 pl-0">
            <div class="flex w-full">
              <h5 className={clsx('text-left truncate', classes.titleTxt)}>
                LOGS LEGAL GROUP, LLP - MN
              </h5>
            </div>
            <div class="flex w-full pl-12 pt-4">
              <div className="w-3/6">
                <li className={clsx('flex flex-col mb-8', classes.textSmall)}>
                  <span>1652 Guildhouse StreetX</span>
                  <span>Suite 200</span>
                  <span>Burnsville, MN 55437</span>
                </li>
              </div>
            </div>
          </div>

          <div className="lg:w-8/12 sm:w-full w-full text-black bg-white rounded-md shadow-md p-8 mb-4 pl-0">
            <div class="flex w-full">
              <h5 className={clsx('text-left truncate', classes.titleTxt)}>
                Contact Information
              </h5>
            </div>
            <div class="sm:flex w-full pl-12 pt-4">
              <div className="lg:w-4/12 md:w-1/2 w-full">
                <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                  <span>Name</span>
                  <span className={classes.textGrey}>RACHEL MACH</span>
                </li>
              </div>

              <div className="lg:w-4/12 md:w-1/2 w-full">
                <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                    <span>Phone</span>
                    <span className={classes.textGrey}>429-199-9090</span>
                  </li>
              </div>

              <div className="lg:w-4/12 md:w-1/2 w-full">
                <li className={clsx('flex flex-col mb-4', classes.textSmall)}>
                  <span>Email</span>
                  <span className={classes.textGrey}>mnlitigation@logs.com</span>
                </li>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
