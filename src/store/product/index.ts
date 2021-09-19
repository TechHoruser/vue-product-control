import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { RootState } from '../types';
import { LocalStorageProducts, ProductState } from '@/store/product/types';

const state: ProductState = {
  products: JSON.parse(window.localStorage.getItem(LocalStorageProducts) ?? '[]'),
};

const namespaced = true;

const product: Module<ProductState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default product;
