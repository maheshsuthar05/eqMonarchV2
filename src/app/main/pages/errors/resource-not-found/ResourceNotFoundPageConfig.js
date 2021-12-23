import React from 'react';

const ResourceNotFoundPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/pages/resource-not-found',
			component: React.lazy(() => import('./ResourceNotFoundPage'))
		}
	]
};

export default ResourceNotFoundPageConfig;
