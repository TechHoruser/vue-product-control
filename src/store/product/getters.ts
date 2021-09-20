import { GetterTree } from 'vuex';
import { ProductState, ProcessProduct } from '@/store/product/types';
import { RootState } from '@/store/types';
import { Product } from '@/entities/Product';

export const enum ProductGetters{
  GET_ALL_PROCESSED_PRODUCTS = 'getAllProcessedProducts',
  GET_ALL_PRODUCTS = 'getAllProducts',
  GET_DAYS_FOR_EXPIRATION_ALERT = 'getDaysForExpirationAlert',
}

const getters: GetterTree<ProductState, RootState> = {
  [ProductGetters.GET_ALL_PROCESSED_PRODUCTS](state: ProductState): ProcessProduct[] {
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
  [ProductGetters.GET_ALL_PRODUCTS](state: ProductState): Product[] {
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
  [ProductGetters.GET_DAYS_FOR_EXPIRATION_ALERT](state: ProductState): number {
    return state.daysForExpirationAlert;
  },
};

export default getters;
