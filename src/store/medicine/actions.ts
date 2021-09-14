import { ActionTree } from 'vuex';
import {
  LocalStorageMedicines,
  MedicineSavedInStorage,
  MedicineState,
  namespace, ProcessMedicine,
} from '@/store/medicine/types';
import { MedicineMutations } from '@/store/medicine/mutations';
import { RootState } from '@/store/types';
import { Medicine } from '@/entities/Medicine';

export enum MedicineActions {
  FETCH_DATA = 'fetchData',
}

const actions: ActionTree<MedicineState, RootState> = {
  [MedicineActions.FETCH_DATA]() {
    const parsedData: Medicine[] = [];
    const savedData: MedicineSavedInStorage[] = JSON.parse(window.localStorage.getItem(LocalStorageMedicines) ?? '[]');
    savedData.forEach((savedMedicine) => {
      const medicine: Medicine = {
        name: savedMedicine.name,
        stock: [],
      };
      savedMedicine.stock.forEach((savedStock) => {
        medicine.stock.push({
          expiredDate: new Date(savedStock.expiredDate),
          amount: savedStock.amount,
        });
      });
    });
    this.commit(
      `${namespace}/${MedicineMutations.LOADED}`,
      parsedData,
    );
  },
};

export default actions;
