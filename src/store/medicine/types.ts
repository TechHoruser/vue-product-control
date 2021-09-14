import { Medicine } from '@/entities/Medicine';

export interface ProcessMedicines extends Medicine{
  minExpiredDate: Date,
}

export const LocalStorageMedicines = 'MEDICINE-CONTROL-DATA';

export interface MedicineState {
  medicines: ProcessMedicines[];
}
