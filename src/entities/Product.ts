export interface Stock {
  expiredDate: Date,
  amount: number,
}

export interface Product {
  name: string,
  stock: Stock[],
}
