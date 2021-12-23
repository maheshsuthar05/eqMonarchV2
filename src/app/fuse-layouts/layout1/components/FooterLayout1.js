import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
	AppBar: {
	  border: 0,
	  boxShadow: 'none',
	  background: theme.palette.background.default,
	  height:50,
	  color: '#000000'
	},
	toolbarheight: {
	  minHeight: '50px !important'
	}
  }));

function FooterLayout1(props) {
	const footerTheme = useSelector(({ fuse }) => fuse.settings.footerTheme);
	const classes = useStyles(props);

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar id="equator-footer" className={clsx(classes.AppBar, 'relative z-10')}>
				<Toolbar className={clsx(classes.toolbarheight, 'px-16 py-0 flex justify-center')}>
					<Typography>{(new Date().getFullYear())} Equator Financial Solutions. All Rights Reserved.</Typography>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(FooterLayout1);
