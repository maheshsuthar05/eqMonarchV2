import React from 'react';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import Logo from 'app/fuse-layouts/shared-components/Logo';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import AdvanceSearch from 'app/main/advance-search/AdvanceSearch';
import AddProperty from 'app/main/property/components/AddProperty';
import navigationResourceKeys from 'app/fuse-configs/navigationResourceConfig';
import { hasAccess } from 'app/common/helpers/common-helper';
import { useSelector } from 'react-redux';

function NavbarLayout2() {
  const contextResources = useSelector(
    ({ common }) => common.IAMResource.contextResources
  );

  return (
    <div className="flex flex-auto justify-between items-center w-full h-full container p-0">
      <div className="flex flex-shrink-0 items-center px-8">
        <Logo />
        <FuseScrollbars className="flex h-full items-center">
          <Navigation className="w-full" layout="horizontal" />
          <AdvanceSearch />
          {hasAccess(
            contextResources,
            navigationResourceKeys.Navigation_Servicer_Workspace_Add_Property
          ) && <AddProperty />}
        </FuseScrollbars>
      </div>
      <div className="flex h-full items-center">
        <FuseShortcuts />
        <UserMenu />
      </div>
    </div>
  );
}

export default React.memo(NavbarLayout2);
