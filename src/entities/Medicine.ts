export interface Stock {
  expiredDate: Date,
  amount: number,
}

export interface Medicine {
  name: string,
  stock: Stock[],
}
