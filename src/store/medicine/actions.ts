import { ActionTree } from 'vuex';
import { MedicineState } from '@/store/medicine/types';
import { RootState } from '@/store/types';

const LocalStorageKey = 'APPLICATION-CONTROL-MEDICINES';

const actions: ActionTree<MedicineState, RootState> = {
  fetchData({ commit }): any {
    window.localStorage.getItem(LocalStorageKey);
  },
};

export default actions;
