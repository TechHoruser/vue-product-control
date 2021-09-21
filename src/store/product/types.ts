import { Product, Stock } from '@/entities/Product';

export interface ProcessStock extends Stock {
  alert: number,
}

export interface ProcessProduct extends Product {
  stock: ProcessStock[],
  minExpiredDate: Date,
  alerts: number[],
}

export interface StockSavedInStorage {
  expiredDate: string,
  amount: number,
}

export interface ProductSavedInStorage {
  name: string,
  stock: StockSavedInStorage[],
}

export const namespace = 'product';

export const LocalStorageProducts = 'PRODUCTS-DATA';
export const DaysForExpirationAlert = 'DAYS-FOR-EXPIRATION-ALERT';

export const DefaultDaysForExpirationAlert = 7;

export interface ProductState {
  products: Product[];
  daysForExpirationAlert: number,
}
