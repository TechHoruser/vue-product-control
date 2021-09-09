import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { medicine } from './medicine/index';
import { RootState } from '@/store/types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {},
  modules: {
    medicine,
  },
};

export default new Vuex.Store(store);
