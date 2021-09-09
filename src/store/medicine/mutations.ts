import { MutationTree } from 'vuex';
import { Medicine } from '@/entities/Medicine';
import { MedicineState } from '@/store/medicine/types';

const mutations: MutationTree<MedicineState> = {
  medicinesLoaded(state, payload: Medicine[]) {
    state.medicines = payload;
  },
};

export default mutations;
