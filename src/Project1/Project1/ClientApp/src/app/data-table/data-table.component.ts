import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataTableDataSource, ShippingOrder } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  //@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  //@ViewChild(MatSort, {static: false}) sort: MatSort;
  //@ViewChild(MatTable, {static: false}) table: MatTable<ShippingOrder>;
  //dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['orderNumber', 'creationDate', 'truckRegNumber', 'trailerRegNumber', 'loadingAddress', 'loadingDate', 'unloadingAddress', 'unloadingDate', 'price'];
  dataSource = new MatTableDataSource<ShippingOrder>([]);


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<ShippingOrder[]>(baseUrl + 'api/ShippingOrders').subscribe(result => {
      this.dataSource = new MatTableDataSource<ShippingOrder>(result);
    }, error => console.error(error));
  }
  ngOnInit() { }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
    //this.table.dataSource = this.dataSource;
  }
}
