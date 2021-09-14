import { Medicine } from '@/entities/Medicine';

export interface ProcessMedicine extends Medicine {
  minExpiredDate: Date,
}

export interface StockSavedInStorage {
  expiredDate: string,
  amount: number,
}

export interface MedicineSavedInStorage {
  name: string,
  stock: StockSavedInStorage[],
}

export const namespace = 'medicine';

export const LocalStorageMedicines = 'MEDICINE-CONTROL-DATA';

export interface MedicineState {
  medicines: Medicine[];
}
