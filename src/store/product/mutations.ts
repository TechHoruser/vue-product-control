import { MutationTree } from 'vuex';
import { DaysForExpirationAlert, LocalStorageProducts, ProductState } from '@/store/product/types';
import { Product } from '@/entities/Product';

export enum ProductMutations {
  LOAD_PRODUCTS = 'productsLoaded',
  LOAD_DAYS_FOR_EXPIRATION_ALERT = 'daysForExpirationAlert',
}

const mutations: MutationTree<ProductState> = {
  [ProductMutations.LOAD_PRODUCTS](state, payload: Product[]) {
    state.products = payload;
    window.localStorage.setItem(LocalStorageProducts, JSON.stringify(payload));
  },
  [ProductMutations.LOAD_DAYS_FOR_EXPIRATION_ALERT](state, payload: number) {
    state.daysForExpirationAlert = payload;
    window.localStorage.setItem(DaysForExpirationAlert, String(payload));
  },
};

export default mutations;
