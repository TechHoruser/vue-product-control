import { GetterTree } from 'vuex';
import { ProductState, ProcessProduct } from '@/store/product/types';
import { RootState } from '@/store/types';
import { Product } from '@/entities/Product';

export const enum ProductGetters{
  GET_PROCESS_ALL = 'processAll',
  GET_ALL = 'all',
}

const getters: GetterTree<ProductState, RootState> = {
  [ProductGetters.GET_PROCESS_ALL](state: ProductState): ProcessProduct[] {
    const processProducts: ProcessProduct[] = [];
    state.products.forEach((product) => {
      const processProduct: ProcessProduct = {
        name: product.name,
        minExpiredDate: product.stock[0].expiredDate,
        stock: [],
      };
      product.stock.forEach((stock) => {
        processProduct.stock.push({ ...stock });
        if (stock.expiredDate.getTime() < processProduct.minExpiredDate.getTime()) {
          processProduct.minExpiredDate = stock.expiredDate;
        }
      });
      processProducts.push(processProduct);
    });
    return processProducts;
  },
  [ProductGetters.GET_ALL](state: ProductState): Product[] {
    const processProducts: Product[] = [];
    state.products.forEach((product) => {
      const processProduct: Product = {
        name: product.name,
        stock: [],
      };
      product.stock.forEach((stock) => {
        processProduct.stock.push({ ...stock });
      });
      processProducts.push(processProduct);
    });
    return processProducts;
  },
};

export default getters;
