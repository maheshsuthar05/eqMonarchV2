import Typography from '@material-ui/core/Typography';
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultSettings } from 'app/store/actions/fuse/settings.actions';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.primary.labelTextColor
  }
}));

function SchemePreview({ theme, className, id, onSelect }) {
  const _theme = useTheme();
  const primaryColor = theme.palette.primary[500]
    ? theme.palette.primary[500]
    : theme.palette.primary.main;
  const primaryColorContrast = _theme.palette.getContrastText(primaryColor);
  const secondaryColor = theme.palette.secondary[500]
    ? theme.palette.secondary[500]
    : theme.palette.secondary.main;
  const secondaryColorContrast = _theme.palette.getContrastText(secondaryColor);
  const backgroundColor = theme.palette.background.default;
  const backgroundColorContrast = _theme.palette.getContrastText(
    theme.palette.background.default
  );
  const paperColor = theme.palette.background.paper;
  const paperColorContrast = _theme.palette.getContrastText(
    theme.palette.background.paper
  );

  return (
    <div className={clsx(className, 'mb-8')}>
      <button
        className={clsx(
          'w-full text-left rounded-6 relative font-500 shadow-1 hover:shadow-4 cursor-pointer overflow-hidden'
        )}
        style={{
          backgroundColor,
          color: backgroundColorContrast
        }}
        onClick={() => onSelect(id)}
        type="button"
      >
        <div
          className="w-full h-56 px-8 pt-8 relative"
          style={{
            backgroundColor: primaryColor,
            color: primaryColorContrast
          }}
        >
          <span className="text-12 opacity-75">Header (Primary)</span>

          <div
            className="flex items-center justify-center w-20 h-20 rounded-full absolute bottom-0 right-0 -mb-10 shadow-1 text-10 mr-4"
            style={{
              backgroundColor: secondaryColor,
              color: secondaryColorContrast
            }}
          >
            <span className="opacity-75">S</span>
          </div>
        </div>
        <div className="pl-8 pr-28 -mt-24 w-full">
          <div
            className="w-full h-96 rounded-4 relative shadow-1 p-8"
            style={{
              backgroundColor: paperColor,
              color: paperColorContrast
            }}
          >
            <span className="text-12 opacity-75">Paper</span>
          </div>
        </div>

        <div className="px-8 py-8 w-full">
          <span className="text-12 opacity-75">Background</span>
        </div>
      </button>
      <Typography className="font-bold w-full text-center mt-12">
        {id}
      </Typography>
    </div>
  );
}

function FuseThemeSchemes(props) {
  const dispatch = useDispatch();
  const themes = useSelector(({ fuse }) => fuse.settings.themes);
  const settings = useSelector(({ fuse }) => fuse.settings.current);

  const classes = useStyles(props);

  function handleSchemeSelect(themeId) {
    const newSettings = {
      ...settings,
      theme: {
        main: themeId,
        navbar: themeId,
        toolbar: themeId,
        footer: themeId
      }
    };
    dispatch(setDefaultSettings(newSettings));
  }

  return (
    <div className={classes.root}>
      <Grid container>
        {Object.entries(themes)
          .filter(
            ([key, val]) =>
              !(key === 'mainThemeDark' || key === 'mainThemeLight')
          )
          .map(([key, val]) => (
            <Grid
              key={key}
              className={clsx(classes.paper, 'lg:w-1/5 sm:w-1/2 md:w-1/2')}
            >
              <SchemePreview
                id={key}
                theme={val}
                onSelect={handleSchemeSelect}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default React.memo(FuseThemeSchemes);
