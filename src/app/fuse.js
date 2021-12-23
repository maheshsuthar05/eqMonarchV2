import { makeStyles } from '@material-ui/core/styles';

export const fuseStyleOverride = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textTransform: 'none'
  },
  layoutRoot: {
    padding: '2px 30px 2px 30px',
    background: `linear-gradient(to bottom, ${theme.palette.background.paper} 322px, #E2E2E2 1%)`
  },
  header: {
    minHeight: '270px',
    width: '100%',
    backgroundColor: '#fff',
    background: `linear-gradient(to right, ${theme.palette.background.paper} 0%, ${theme.palette.background.paper} 100%)`
  },
  tenantLayoutRoot: {
    padding: '2px 30px 2px 30px',
    background: `linear-gradient(to bottom, ${theme.palette.background.paper} 250px, #E2E2E2 1%)`
  },
  tenantHeader: {
    minHeight: '200px',
    width: '100%',
    backgroundColor: '#fff',
    background: `linear-gradient(to right, ${theme.palette.background.paper} 0%, ${theme.palette.background.paper} 100%)`
  },
  content: {
    padding: '10px 19px 10px 19px',
    backgroundColor: theme.palette.background.paper,
    borderTop: 'none',
    borderRight: '1px solid #E2E2E2',
    borderLeft: '1px solid #E2E2E2',
    borderBottom: 'none'
  },
  toolbar: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px 10px 0px 0px',
    borderTop: '1px solid #E2E2E2',
    borderRight: '1px solid #E2E2E2',
    borderLeft: '1px solid #E2E2E2',
    borderBottom: '1px solid #E2E2E2',
    minHeight: 'unset',
    height: 'unset'
  }
}));
