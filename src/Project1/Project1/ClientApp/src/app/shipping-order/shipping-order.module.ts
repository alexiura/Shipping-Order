export interface ShippingOrder {
  orderNumber: number;
  creationDate: Date;
  truckRegNumber: string;
  trailerRegNumber: string;
  loadingAddress: string;
  loadingDate: Date;
  unloadingAddress: string;
  unloadingDate: Date;
  price: number;
}
