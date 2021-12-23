import { legacyTask } from 'app/config/api';
import axios from 'axios';

export const mailBox = {
  async legacyMessage() {
    return axios
      .get(legacyTask.api.taskCloseList)
      .then((res) => res.data);
  },
}