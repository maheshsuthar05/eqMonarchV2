import {
  Icon,
  ListItem,
  ListItemText,
  makeStyles,
  Tooltip
} from '@material-ui/core';
import { openModal, updateModal } from 'app/store/actions';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropertyAddPage from '../property-add/PropertyAddPage';
import clsx from 'clsx';
import {
  getInvestorGroupByInvestorId,
  propertyAddStart
} from 'app/main/property/store/actions';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { searchInvestor } from 'app/main/admin/store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 35,
    [theme.breakpoints.down('lg')]: {
      display: 'flex'
    },
    '&.active': {
      color: `${theme.palette.navigation.horizontal.primary.color.active}!important`,
      pointerEvents: 'none',

      '& .list-item-text-primary': {
        color: 'inherit'
      },
      '& .list-item-icon': {
        color: 'inherit'
      }
    },
    '& .list-item-icon': {},
    '& .list-item-text': {
      [theme.breakpoints.up('lg')]: {
        padding: '0 0 0 8px',
        margin: '2px 0 0 0'
      },
      [theme.breakpoints.down('md')]: {
        padding: '0 0 0 16px'
      }
    },
    color: theme.palette.navigation.horizontal.primary.color.inactive,
    textDecoration: 'none!important',
    [theme.breakpoints.up('md')]: {
      // display: 'inherit !important'
    },
    [theme.breakpoints.down('lg')]: {
      paddingLeft: '20px',
      paddingRight: '20px'
    }
  },
  icon: {
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.4rem'
    },
    [theme.breakpoints.up('lg')]: {
      color: theme.palette.navigation.horizontal.primary.color.inactive,
      fontSize: '1.4rem'
    }
  },
  button: {
    height: '40px',
    padding: '8px 12px 8px 12px',
    minHeight: '40px',
    '&.MuiButton-root': {
      textTransform: 'capitalize'
    }
  },
  IconButton: {
    color: theme.palette.navigation.horizontal.primary.color.inactive
  },
  IconText: {
    [theme.breakpoints.down('md')]: {
      color: 'rgba(0, 0, 0, 0.87)'
    }
  },
  width145: {
    width: '145px' //85px
  }
}));

export default function AddProperty(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );
  const user = useSelector(({ auth }) => auth.user);
  const investorList = useSelector(({ admin }) => admin.investor.investorList);
  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  useEffect(() => {
    dispatch(searchInvestor());
  }, [dispatch]);

  const onFormButtonHandler = () => {
    dispatch(updateModal(false));
    const payloadModified = {
      ...formPayloadRef.current.payload,
      propertyAddresses: [
        {
          ...formPayloadRef.current.payload.propertyAddresses[0],
          stateName:
            formPayloadRef.current.payload.propertyAddresses[0]?.stateName
              ?.stateName,
          stateCode:
            formPayloadRef.current.payload.propertyAddresses[0]?.stateName
              ?.stateCode
        }
      ],
      investorLoanInformations: getInvestorGroupByInvestorId(
        investorList,
        formPayloadRef.current.payload.investorLoanInformations[0].investorCode
      ),
      loan: {
        ...formPayloadRef.current.payload.loan,
        miCoverageExistsIndicator:
        formPayloadRef.current.payload.loan.miCoverageExistsIndicator === '1' ? 1 : 0
      }
    };
    dispatch(
      propertyAddStart(
        user.tenantCode,
        payloadModified,
        formPayloadRef.current.flowablePayload
      )
    );
  };

  const handleOpenDialog = (ev) => {
    ev.preventDefault();
    dispatch(
      openModal({
        title: 'Add Property',
        children: <PropertyAddPage />,
        maxwidth: 'lg',
        buttons: (
          <>
            <MonarchButton
              onClick={onFormButtonHandler}
              color="primary"
              variant="contained"
              size="small"
              disabled
            >
              {'Save'}
            </MonarchButton>
          </>
        )
      })
    );
  };

  return (
    <Tooltip title={`Add Property`} placement={'bottom'}>
      <ListItem
        button
        className={clsx(classes.root)}
        onClick={handleOpenDialog}
      >
        <Icon
          className={clsx(classes.icon, 'list-item-icon flex-shrink-0')}
          color="action"
        >
          add_circle_outline
        </Icon>

        <ListItemText
          className={clsx(classes.width145, classes.IconText, 'list-item-text')}
          primary={'Add Property'}
          classes={{ primary: 'list-item-text-primary' }}
        />
      </ListItem>
    </Tooltip>
  );
}
