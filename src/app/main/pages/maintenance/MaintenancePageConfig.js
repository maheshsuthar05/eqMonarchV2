import React from 'react';

const MaintenancePageConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	theme: {
		main: 'defaultDark',
		navbar: 'mainThemeDark',
		toolbar: 'mainThemeLight',
		footer: 'mainThemeDark'
	},
	routes: [
		{
			path: '/maintenance',
			component: React.lazy(() => import('./MaintenancePage'))
		}
	]
};

export default MaintenancePageConfig;
