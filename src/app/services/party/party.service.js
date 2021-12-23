import { party } from 'app/config/api';
import axios from 'axios';

export const partyService = {
  async getPartyAndRoleByUserId(userId, tenantCode) {
    return await axios
      .get(party.api.party.getPartyIdByUserId(userId, tenantCode))
      .then((res) => res.data);
  },
  async getRolesByPartyId(partyId) {
    return await axios
      .get(party.api.role.getUserGroupByPartyId(partyId))
      .then((res) => res.data);
  },
  async getAllPartiesWithUserIds() {
    return await axios
      .get(party.api.getAllPartiesWithUserIds)
      .then((res) => res.data);
  }
};
