import { aggregator } from 'app/config/api';
import axios from 'axios';

export const AggregatorService = {
  async post(req) {
    return await axios.post(aggregator.api.action, req).then((res) => res.data);
  }
};
