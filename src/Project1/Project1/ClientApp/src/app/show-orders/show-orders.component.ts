import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ShippingOrder } from '../shipping-order/shipping-order.module';
import * as html2pdf from 'html2pdf.js';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})

export class ShowOrdersComponent implements AfterViewInit {

  public orderNumberExportPdf: number;
  public creationDateExportPdf: Date;
  public truckNumberExportPdf: string;
  public trailerNumberExportPdf: string;
  public loadingAddressExportPdf: string;
  public loadingDateExportPdf: Date;
  public unloadingAddressExportPdf: string;
  public unloadingDateExportPdf: Date;
  public priceExportPdf: number;


  public orderNumberEdit: number;
  public creationDateEdit: Date;
  public truckNumberEdit: string;
  public trailerNumberEdit: string;
  public loadingAddressEdit: string;
  public loadingDateEdit: Date;
  public unloadingAddressEdit: string;
  public unloadingDateEdit: Date;
  public priceEdit: number;

  public alredyEditedOrderNumber: number;


  editOrderForm = new FormGroup({
    orderNumberEdit: new FormControl(''),
    creationDateEdit: new FormControl(''),
    truckNumberEdit: new FormControl(''),
    trailerNumberEdit: new FormControl(''),
    loadingAddressEdit: new FormControl(''),
    loadingDateEdit: new FormControl(''),
    unloadingAddressEdit: new FormControl(''),
    unloadingDateEdit: new FormControl(''),
    priceEdit: new FormControl(''),
  });


  displayedColumns = ['orderNumber', 'creationDate', 'truckRegNumber', 'trailerRegNumber', 'loadingAddress', 'loadingDate', 'unloadingAddress', 'unloadingDate', 'price', 'prepareToPdf', 'editOrder'];
  dataSource: MatTableDataSource<ShippingOrder>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.http.get<ShippingOrder[]>(this.baseUrl + 'api/ShippingOrders').subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.sort.sort(({ id: 'orderNumber', start: 'asc' }) as MatSortable);
      this.dataSource.sort = this.sort;
    }, error => console.error(error));
  }

  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //----------------------------------------------

  public onExportClick() {
    let checkEditedOrder = this.orderNumberExportPdf.toString().includes('.') ? (this.orderNumberExportPdf.toFixed() + 'E') : (this.orderNumberExportPdf.toFixed() + 'R');

    const options = {
      margin: [5, 0, 5, 0],
      filename: checkEditedOrder,
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

  public closePopUp() {
    document.getElementById('containerForExportPdf').style.display = 'none';
  }

  public openPopUp(order: ShippingOrder) {
    this.orderNumberExportPdf = order.orderNumber;
    this.creationDateExportPdf = order.creationDate;
    this.truckNumberExportPdf = order.truckRegNumber;
    this.trailerNumberExportPdf = order.trailerRegNumber;
    this.loadingAddressExportPdf = order.loadingAddress;
    this.loadingDateExportPdf = order.loadingDate;
    this.unloadingAddressExportPdf = order.unloadingAddress;
    this.unloadingDateExportPdf = order.unloadingDate;
    this.priceExportPdf = order.price;


    document.getElementById('containerForExportPdf').style.display = 'block';
  }

  public closePopUpEdit() {
    document.getElementById('containerForEdit').style.display = 'none';
  }

  public openPopUpEdit(order: ShippingOrder) {
    this.orderNumberEdit = order.orderNumber + 0.1;
    this.creationDateEdit = order.creationDate;
    this.truckNumberEdit = order.truckRegNumber;
    this.trailerNumberEdit = order.trailerRegNumber;
    this.loadingAddressEdit = order.loadingAddress;
    this.loadingDateEdit = order.loadingDate;
    this.unloadingAddressEdit = order.unloadingAddress;
    this.unloadingDateEdit = order.unloadingDate;
    this.priceEdit = order.price;


    document.getElementById('containerForEdit').style.display = 'block';
  }


  public createOrderByEditing() {
    var editedShippingOrder: ShippingOrder = <ShippingOrder>{};


    editedShippingOrder.orderNumber = this.orderNumberEdit;
    editedShippingOrder.creationDate = this.creationDateEdit;
    editedShippingOrder.truckRegNumber = this.truckNumberEdit;
    editedShippingOrder.trailerRegNumber = this.trailerNumberEdit;
    editedShippingOrder.loadingAddress = this.loadingAddressEdit;
    editedShippingOrder.loadingDate = this.loadingDateEdit;
    editedShippingOrder.unloadingAddress = this.unloadingAddressEdit;
    editedShippingOrder.unloadingDate = this.unloadingDateEdit;
    editedShippingOrder.price = this.priceEdit;


    this.http.post<ShippingOrder>(this.baseUrl + 'api/ShippingOrders', editedShippingOrder).subscribe(result => {
    }, error => console.error(error));

    document.getElementById('containerForEdit').style.display = 'none';
  }



}



