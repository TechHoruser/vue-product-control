import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import product from './product/index';
import { RootState } from '@/store/types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {},
  modules: {
    product,
  },
};

export default new Vuex.Store(store);
