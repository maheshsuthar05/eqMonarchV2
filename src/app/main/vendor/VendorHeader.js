import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function VendorHeader(props) {
  const dispatch = useDispatch();
  //   const searchText = useSelector(({ todoApp }) => todoApp.todos.searchText);

  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

  return (
    <ThemeProvider theme={mainTheme}>
      <div className="flex flex-1">
          <Hidden lgUp>
						<IconButton
							onClick={ev => props.pageLayout.current.toggleLeftSidebar()}
              aria-label="open left sidebar"
              color="inherit"
						>
							<Icon>menu</Icon>
						</IconButton>
					</Hidden>
      </div>
    </ThemeProvider>
  );
}

export default VendorHeader;
