import { resourceKeys } from 'app/main/property/resources/ResourceConfig';

const PropertyStartegyNavigationConfig = [
  {
    id: resourceKeys.Property_Details_Tab_Strategy_Summary_Tab,
    title: 'Summary',
    type: 'item',
    url: '/property/details/<%= caseInstanceId %>/strategy/summary',
    visible: false,
    disabled: false
  },
  {
    id: resourceKeys.Property_Details_Tab_Strategy_Actuals_Tab,
    title: 'Actuals',
    type: 'item',
    url: '/property/details/<%= caseInstanceId %>/strategy/actuals',
    visible: false,
    disabled: false
  },
  {
    id: resourceKeys.Property_Details_Tab_Strategy_Conveyance_Tab,
    title: 'Conveyance',
    type: 'item',
    url: '/property/details/<%= caseInstanceId %>/strategy/conveyance',
    visible: false,
    disabled: false
  },
  {
    id: resourceKeys.Property_Details_Tab_Strategy_Cwcot_Tab,
    title: 'CWCOT',
    type: 'item',
    url: '/property/details/<%= caseInstanceId %>/strategy/cwcot',
    visible: false,
    disabled: false
  },
  {
    id: resourceKeys.Property_Details_Tab_Strategy_ReoAsIs_Tab,
    title: 'REO As Is',
    type: 'item',
    url: '/property/details/<%= caseInstanceId %>/strategy/reo-asis',
    visible: false,
    disabled: false
  },
  {
    id: resourceKeys.Property_Details_Tab_Strategy_ReoRepair_Tab,
    title: 'REO Repair',
    type: 'item',
    url: '/property/details/<%= caseInstanceId %>/strategy/reo-repair',
    visible: false,
    disabled: false
  }
];

export default PropertyStartegyNavigationConfig;
