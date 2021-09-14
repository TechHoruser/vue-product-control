import { GetterTree } from 'vuex';
import { MedicineState, ProcessMedicine } from '@/store/medicine/types';
import { RootState } from '@/store/types';
import { Medicine } from '@/entities/Medicine';

export const enum MedicineGetters{
  GET_PROCESS_ALL = 'all',
  GET_ALL = 'all',
}

const getters: GetterTree<MedicineState, RootState> = {
  [MedicineGetters.GET_PROCESS_ALL](state: MedicineState): ProcessMedicine[] {
    const processMedicines: ProcessMedicine[] = [];
    state.medicines.forEach((medicine) => {
      const processMedicine: ProcessMedicine = {
        ...medicine,
        minExpiredDate: medicine.stock[0].expiredDate,
      };
      medicine.stock.forEach((stock) => {
        if (stock.expiredDate < processMedicine.minExpiredDate) {
          processMedicine.minExpiredDate = stock.expiredDate;
        }
      });
    });
    return processMedicines;
  },
  [MedicineGetters.GET_ALL](state: MedicineState): Medicine[] {
    return state.medicines;
  },
};

export default getters;
