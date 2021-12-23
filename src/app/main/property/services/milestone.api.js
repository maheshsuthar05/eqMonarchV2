import { PropertyMilestoneApiConfig } from 'app/config/api';
import axios from 'axios';

export const milestoneApi = {
  async getPropertyMilestone(
    tenantCode,
    propertyId,
    loanNumber,
    caseInstanceId
  ) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode
      }
    };
    const url = PropertyMilestoneApiConfig.api.get_property_milestone(
      propertyId,
      loanNumber
    );
    return await axios.get(url, config).then((res) => res.data);
  }
};
