export const FETCH_FAM_DATA = '[FAM] FETCH_FAM_DATA';

export const fam = {
  getById: (id) => ({ type: FETCH_FAM_DATA, id })
};
