import { GetterTree } from 'vuex';
import { MedicineState } from '@/store/medicine/types';
import { RootState } from '@/store/types';
import { Medicine } from '@/entities/Medicine';

const getters: GetterTree<MedicineState, RootState> = {
  all(state: MedicineState): Medicine[] {
    return state.medicines;
  },
};

export default getters;
