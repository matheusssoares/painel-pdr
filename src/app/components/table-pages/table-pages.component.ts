import { Component, Input, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { HeadTable } from '../../models/head-table.model';
import { PrimeNgModule } from '../../modules/primeng.module';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-table-pages',
  imports: [SharedModule, PrimeNgModule],
  templateUrl: './table-pages.component.html',
  styleUrl: './table-pages.component.scss'
})
export class TablePagesComponent {
  dialog: any;
  @ViewChild('dt1') dt: Table | undefined;
  @Input() items: any[] = [];
  @Input() rows: number = 10;
  @Input() rowsPerPageOptions: number[] = [10, 25, 50];
  @Input() globalFilterFields: string[] = [];
  @Input() placeholder: string = '';
  @Input() itemsHead: HeadTable[] = [];



  applyFilterGlobal($event: any, stringVal: any) {
    this.dt?.filterGlobal($event.target.value, stringVal);
  }

  details(data: any) {
    console.log(data);
    
  }

  deleteData(data: any, event: any) {
    console.log(data, event);
  }

}
