import { MutationTree } from 'vuex';
import { LocalStorageMedicines, MedicineState, ProcessMedicines } from '@/store/medicine/types';

const mutations: MutationTree<MedicineState> = {
  medicinesLoaded(state, payload: ProcessMedicines[]) {
    state.medicines = payload;
    window.localStorage.setItem(LocalStorageMedicines, JSON.stringify(payload));
  },
};

export default mutations;
