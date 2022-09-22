import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ShippingOrder } from './shipping-order.module';
import * as html2pdf from 'html2pdf.js';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-shipping-order',
  templateUrl: './shipping-order.component.html',
  styleUrls: ['./shipping-order.component.css']
})
export class ShippingOrderComponent implements OnInit {

  public order_number: number;
  public creation_date: Date = new Date();
  public truck_number: string;
  public trailer_number: string;
  public loading_address: string;
  public loading_date: Date;
  public unloading_address: string;
  public unloading_date: Date;
  public price: number;

  public orderEdited: number = 0;
  public duplicateOrder: boolean = false;
  public showMeDuplicateOrder: number;


  createOrderForm = new FormGroup({
    order_number: new FormControl(''),
    creation_date: new FormControl(''),
    truck_number: new FormControl(''),
    trailer_number: new FormControl(''),
    loading_address: new FormControl(''),
    loading_date: new FormControl(''),
    unloading_address: new FormControl(''),
    unloading_date: new FormControl(''),
    price: new FormControl(''),
  });

  public databaseLength: ShippingOrder[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    http.get<ShippingOrder[]>(baseUrl + 'api/ShippingOrders').subscribe(result => {
      for (const item in result) {

        if (result[item].orderNumber.toString().includes('.')) {
          this.orderEdited++;
        }
      }
      this.order_number = result.length - this.orderEdited + 1;
    }, error => console.error(error));
  }


  ngOnInit() {
  }

  public createOrder() {
    var shippingOrder: ShippingOrder = <ShippingOrder>{};

    shippingOrder.orderNumber = this.order_number;
    shippingOrder.creationDate = this.dateConvertor(this.creation_date);
    shippingOrder.truckRegNumber = this.truck_number.trim();
    shippingOrder.trailerRegNumber = this.trailer_number.trim();
    shippingOrder.loadingAddress = this.loading_address.trim();
    shippingOrder.loadingDate = this.dateConvertor(this.loading_date);
    shippingOrder.unloadingAddress = this.unloading_address.trim();
    shippingOrder.unloadingDate = this.dateConvertor(this.unloading_date);
    shippingOrder.price = this.price;


    /*    Check if we don't have this order already created*/
    this.http.get<ShippingOrder[]>(this.baseUrl + 'api/ShippingOrders').subscribe(result => {

      for (const item in result) {
        if (
          result[item].truckRegNumber.trim() === this.truck_number.trim() &&
          result[item].loadingAddress.trim() === this.loading_address.trim() &&
          (
            Date.parse(result[item].loadingDate.toString()) == Date.parse(this.loading_date.toString()) ||
            Date.parse(result[item].loadingDate.toString()) + Date.parse('02 Jan 1970 00:00:00 GMT') == Date.parse(this.loading_date.toString()) ||
            Date.parse(result[item].loadingDate.toString()) - Date.parse('02 Jan 1970 00:00:00 GMT') == Date.parse(this.loading_date.toString())
          )

        ) {
          console.log(Date.parse(result[item].loadingDate.toString()) + ' ' + Date.parse(this.loading_date.toString()))
          this.duplicateOrder = true;
          this.showMeDuplicateOrder = result[item].orderNumber;
          alert('This truck has already a shipping order, please check order with number: ' + this.showMeDuplicateOrder);

          break;
        }

      }

      if (!this.duplicateOrder) {
        this.http.post<ShippingOrder>(this.baseUrl + 'api/ShippingOrders', shippingOrder).subscribe(result => {

          this.order_number++;
          this.creation_date = new Date();
          this.truck_number = undefined;
          this.trailer_number = undefined;
          this.loading_address = undefined;
          this.loading_date = undefined;
          this.unloading_address = undefined;
          this.unloading_date = undefined;
          this.price = undefined;

        }, error => console.error(error));


      }

    }, error => console.error(error));

    const options = {
      margin: [5, 0, 5, 0],
      filename: this.order_number + 'R',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        dpi: 192,
        scale: 4,
        letterRendering: true,
        useCORS: true
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    const content: Element = document.getElementById('elementToExport');

    html2pdf()
      .from(content)
      .set(options)
      .save();

  }

  public onExportClick() {
    const options = {
      margin: [15, 0, 15, 0],
      filename: this.order_number + 'R',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        dpi: 192,
        scale: 4,
        letterRendering: true,
        useCORS: true
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    const content: Element = document.getElementById('elementToExport');

    html2pdf()
      .from(content)
      .set(options)
      .save();

  }

  public showHideContent() {
    var x = document.getElementById("inputContainer");

    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  public clearFields() {
    this.creation_date = new Date();
    this.truck_number = undefined;
    this.trailer_number = undefined;
    this.loading_address = undefined;
    this.loading_date = undefined;
    this.unloading_address = undefined;
    this.unloading_date = undefined;
    this.price = undefined;
  }

  public dateConvertor(myDate) {
    return new Date(
      Date.UTC(myDate.getFullYear(), myDate.getMonth(), myDate.getDate())
    );
  }


}

