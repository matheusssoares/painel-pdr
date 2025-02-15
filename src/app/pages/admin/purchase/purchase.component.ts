import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { PrimeNgModule } from '../../../modules/primeng.module';
import { SharedModule } from '../../../modules/shared.module';
import { B4aServiceService } from '../../../services/b4a-service.service';

@Component({
  selector: 'app-purchase',
  imports: [SharedModule, PrimeNgModule, NgxLoadingModule, CommonModule],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss',
})
export class PurchaseComponent implements OnInit {
  private b4aService = inject(B4aServiceService);
  items: any[] = [];
  loading = false;
  subscriptions: Subscription[] = [];
  @ViewChild('dt1') dt: Table | undefined;

  constructor() {
    console.log('PurchaseComponent instanciado');
  }

  ngOnInit(): void {
    const sub = this.b4aService.getPurchases().subscribe((res: any) => {
      if (res.result.success) {
        console.log(res);
        this.items = res.result.data;
        this.loading = false;
      }
    });

    this.subscriptions.push(sub);
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt?.filterGlobal($event.target.value, stringVal);
  }
}
