import { ActionTree } from 'vuex';
import { MedicineState } from '@/store/medicine/types';
import { RootState } from '@/store/types';

const LocalStorageKey = 'APPLICATION-CONTROL-MEDICINES';

export enum MedicineActions {
  FETCH_DATA = 'fetchData',
}

const actions: ActionTree<MedicineState, RootState> = {
  [MedicineActions.FETCH_DATA]() {
    window.localStorage.getItem(LocalStorageKey);
  },
};

export default actions;
