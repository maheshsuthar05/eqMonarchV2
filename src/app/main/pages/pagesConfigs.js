import Error404PageConfig from './errors/404/Error404PageConfig';
import Error500PageConfig from './errors/500/Error500PageConfig';
import MaintenancePageConfig from './maintenance/MaintenancePageConfig';
import ResourceNotFoundPageConfig from './errors/resource-not-found/ResourceNotFoundPageConfig';
import LockPageConfig from './lock/LockPageConfig';

const pagesConfigs = [
	Error404PageConfig,
	Error500PageConfig,
	MaintenancePageConfig,
	ResourceNotFoundPageConfig,
	LockPageConfig
];

export default pagesConfigs;
