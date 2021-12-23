import React from 'react';

const Error500PageConfig = {
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
	routes: [
		{
			path: '/error-500',
			component: React.lazy(() => import('./Error500Page'))
		}
	]
};

export default Error500PageConfig;
