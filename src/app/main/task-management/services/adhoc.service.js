import { flowable } from 'app/config/api';
import axios from 'axios';

export const AdhocApi = {
  async get(args) {
    return axios
      .get(
        flowable.api.planItemInstances.get(
          args.caseInstanceId,
          args.state,
          args.planItemDefinitionType
        )
      )
      .then((resp) => resp.data);
  },
  async put(args) {
    const payload = {
      action: 'start',
    };
    return axios
      .put(flowable.api.planItemInstances.put(args.id), payload)
      .then((resp) => resp);
  }
};
