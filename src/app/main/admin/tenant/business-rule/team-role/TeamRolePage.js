import React, { useState } from 'react';
import MaterialTable from 'material-table';
import TeamRoleCreationModal from './TeamRoleCreationModal';
import { Paper } from '@material-ui/core';

const TeamRolePage = ({ match, history, location }) => {
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: 'Role',
      field: 'role',
      editable: 'onAdd',
      lookup: {
        'Asset Management': 'Asset Management',
        'BUSINESS DEV MANAGER': 'BUSINESS DEV MANAGER',
        'CFR COORDINATOR': 'CFR COORDINATOR',
        'CLOSING COORDINATOR': 'CLOSING COORDINATOR',
        'DOCUMENT PROCESSOR': 'DOCUMENT PROCESSOR',
        'EVICTION COORDINATOR': 'EVICTION COORDINATOR',
        'LITIGATION COORDINATOR': 'LITIGATION COORDINATOR',
        'OPERATIONS MANAGER': 'OPERATIONS MANAGER',
        'REDEMPTION COORDINATOR': 'REDEMPTION COORDINATOR',
        'TITLE CURATIVE': 'TITLE CURATIVE'
      }
    },
    {
      title: 'Team Lead',
      field: 'leader'
    }
  ];

  return (
    <>
      <MaterialTable
        title=""
        icons={{
          Search: () => null
        }}
        columns={columns}
        data={[
          {
            role: 'Asset Management',
            leader: 'Evans Alexander'
          },
          {
            role: 'BUSINESS DEV MANAGER',
            leader: 'Ma Hai'
          }
        ]}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />
        }}
        options={{
          filtering: true,
          actionsColumnIndex: -1,
          searchFieldVariant: 'outlined',
          searchFieldStyle: {
            width: '125%',
            height: '38px',
            marginLeft: '-30%'
          }
        }}
        actions={[
          {
            icon: 'add_box',
            tooltip: 'Add New Team Creation',
            isFreeAction: true,
            onClick: (event, rowData) => {
              setOpen(true);
            }
          }
        ]}
      />
      <TeamRoleCreationModal open={open} setOpen={setOpen} />
    </>
  );
};

export default TeamRolePage;
