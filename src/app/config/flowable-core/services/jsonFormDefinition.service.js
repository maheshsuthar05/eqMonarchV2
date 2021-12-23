import { flowable } from 'app/config/api';
import axios from 'axios';

export const jsonDefinitionApi = {
  async get(args) {
    return await axios.get(flowable.api.local(args)).then((resp) => resp.data);
  }
};
