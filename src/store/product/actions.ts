import { ActionTree } from 'vuex';
import {
  LocalStorageProducts,
  ProductSavedInStorage,
  ProductState,
  namespace, ProcessProduct, DaysForExpirationAlert, DefaultDaysForExpirationAlert,
} from '@/store/product/types';
import { ProductMutations } from '@/store/product/mutations';
import { RootState } from '@/store/types';
import { Product } from '@/entities/Product';

export enum ProductActions {
  FETCH_DATA = 'fetchData',
}

const actions: ActionTree<ProductState, RootState> = {
  [ProductActions.FETCH_DATA]() {
    const parsedData: Product[] = [];
    const savedData: ProductSavedInStorage[] = JSON.parse(window.localStorage.getItem(LocalStorageProducts) ?? '[]');
    savedData.forEach((savedProduct) => {
      const product: Product = {
        name: savedProduct.name,
        stock: [],
      };
      savedProduct.stock.forEach((savedStock) => {
        product.stock.push({
          expiredDate: new Date(savedStock.expiredDate),
          amount: savedStock.amount,
        });
      });
      parsedData.push(product);
    });
    this.commit(
      `${namespace}/${ProductMutations.LOAD_PRODUCTS}`,
      parsedData,
    );
    this.commit(
      `${namespace}/${ProductMutations.LOAD_DAYS_FOR_EXPIRATION_ALERT}`,
      Number(window.localStorage.getItem(DaysForExpirationAlert) ?? DefaultDaysForExpirationAlert),
    );
  },
};

export default actions;
