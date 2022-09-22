import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public shippingOrders: ShippingOrder[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<ShippingOrder[]>(baseUrl + 'api/ShippingOrders').subscribe(result => {
      this.shippingOrders = result;
    }, error => console.error(error));
  }
}

interface ShippingOrder {
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
