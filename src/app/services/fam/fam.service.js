import { core } from 'app/config/api';
import axios from 'axios';

export const famService = {
  async get(id) {
    return axios.get(core.api.fam.actions(id)).then((res) => res.data);
  },
  async put(arg) {
    return await axios
      .put(core.api.fam.actions(arg.userId), arg)
      .then((def) => def.data);
  },
  async register(arg) {
    return await axios
      .put(core.api.fam.registration, arg)
      .then((def) => def.data);
  }
};
