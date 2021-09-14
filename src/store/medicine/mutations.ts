import { MutationTree } from 'vuex';
import { LocalStorageMedicines, MedicineState } from '@/store/medicine/types';
import { Medicine } from '@/entities/Medicine';

export enum MedicineMutations {
  LOADED = 'medicinesLoaded',
}

const mutations: MutationTree<MedicineState> = {
  [MedicineMutations.LOADED](state, payload: Medicine[]) {
    state.medicines = payload;
    window.localStorage.setItem(LocalStorageMedicines, JSON.stringify(payload));
  },
};

export default mutations;
