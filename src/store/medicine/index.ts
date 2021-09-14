import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { RootState } from '../types';
import { LocalStorageMedicines, MedicineState } from '@/store/medicine/types';

const state: MedicineState = {
  medicines: JSON.parse(window.localStorage.getItem(LocalStorageMedicines) ?? '[]'),
};

const namespaced = true;

const medicine: Module<MedicineState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default medicine;
