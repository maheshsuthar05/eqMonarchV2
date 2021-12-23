import axios from 'axios';
import {exploreTour} from 'app/config/api';

export const exploreTourService = {
  async getFileData() {
    return axios.get(exploreTour.s3Url).then((res) => res.data);
  }
};
