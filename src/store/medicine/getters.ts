import { GetterTree } from 'vuex';
import { MedicineState, ProcessMedicine } from '@/store/medicine/types';
import { RootState } from '@/store/types';
import { Medicine } from '@/entities/Medicine';

export const enum MedicineGetters{
  GET_PROCESS_ALL = 'processAll',
  GET_ALL = 'all',
}

const getters: GetterTree<MedicineState, RootState> = {
  [MedicineGetters.GET_PROCESS_ALL](state: MedicineState): ProcessMedicine[] {
    const processMedicines: ProcessMedicine[] = [];
    state.medicines.forEach((medicine) => {
      const processMedicine: ProcessMedicine = {
        name: medicine.name,
        minExpiredDate: medicine.stock[0].expiredDate,
        stock: [],
      };
      medicine.stock.forEach((stock) => {
        processMedicine.stock.push({ ...stock });
        if (stock.expiredDate.getTime() < processMedicine.minExpiredDate.getTime()) {
          processMedicine.minExpiredDate = stock.expiredDate;
        }
      });
      processMedicines.push(processMedicine);
    });
    return processMedicines;
  },
  [MedicineGetters.GET_ALL](state: MedicineState): Medicine[] {
    const processMedicines: Medicine[] = [];
    state.medicines.forEach((medicine) => {
      const processMedicine: Medicine = {
        name: medicine.name,
        stock: [],
      };
      medicine.stock.forEach((stock) => {
        processMedicine.stock.push({ ...stock });
      });
      processMedicines.push(processMedicine);
    });
    return processMedicines;
  },
};

export default getters;
