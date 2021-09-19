import { MutationTree } from 'vuex';
import { LocalStorageProducts, ProductState } from '@/store/product/types';
import { Product } from '@/entities/Product';

export enum ProductMutations {
  LOADED = 'productsLoaded',
}

const mutations: MutationTree<ProductState> = {
  [ProductMutations.LOADED](state, payload: Product[]) {
    state.products = payload;
    window.localStorage.setItem(LocalStorageProducts, JSON.stringify(payload));
  },
};

export default mutations;
