import { GetterTree } from 'vuex';
import { MedicineState } from '@/store/medicine/types';
import { RootState } from '@/store/types';
import { Medicine } from '@/entities/Medicine';

const getters: GetterTree<MedicineState, RootState> = {
  all(state: MedicineState): Medicine[] {
    return state.medicines.map((medicine) => {
      let minExpiredDate = medicine.stock[0].expiredDate;
      // eslint-disable-next-line no-restricted-syntax
      for (const stock of medicine.stock) {
        if (stock.expiredDate < minExpiredDate) {
          minExpiredDate = stock.expiredDate;
        }
      }
      return medicine;
    });
  },
};

export default getters;
