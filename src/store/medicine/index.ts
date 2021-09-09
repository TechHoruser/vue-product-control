import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { RootState } from '../types';
import { MedicineState } from '@/store/medicine/types';

export const state: MedicineState = { medicines: [] };

const namespaced = true;

export const medicine: Module<MedicineState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
