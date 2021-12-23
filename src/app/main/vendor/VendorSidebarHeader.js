import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';

const accounts = {
  creapond: 'johndoe@creapond.com',
  withinpixels: 'johndoe@withinpixels.com'
};

function VendorSidebarHeader() {
  const [selectedAccount, setSelectedCount] = useState('creapond');

  function handleAccountChange(ev) {
    setSelectedCount(ev.target.value);
  }

  return (
    <div className="flex flex-col justify-center h-full p-24">
      <div className="flex items-center flex-1">
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <span className="text-24 mx-16">VENDOR NAME or Image</span>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default VendorSidebarHeader;
