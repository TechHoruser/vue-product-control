import { MutationTree } from 'vuex';
import { LocalStorageMedicines, MedicineState, ProcessMedicines } from '@/store/medicine/types';

export enum MedicineMutations {
  LOADED = 'medicinesLoaded',
}

const mutations: MutationTree<MedicineState> = {
  [MedicineMutations.LOADED](state, payload: ProcessMedicines[]) {
    state.medicines = payload;
    window.localStorage.setItem(LocalStorageMedicines, JSON.stringify(payload));
  },
};

export default mutations;
