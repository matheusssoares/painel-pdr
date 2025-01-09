import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { PrimeNgModule } from '../../../modules/primeng.module';
import { SharedModule } from '../../../modules/shared.module';
import { B4aServiceService } from '../../../services/b4a-service.service';

@Component({
  selector: 'app-raffles',
  imports: [SharedModule, PrimeNgModule],
  templateUrl: './raffles.component.html',
  styleUrl: './raffles.component.scss',
})
export class RafflesComponent implements OnInit {
  @ViewChild('dt1') dt: Table | undefined;
  private b4aService = inject(B4aServiceService);
  items: any[] = [];
  globalFilterFields: string[] = ['name', 'price', 'drawDate', 'status'];
  constructor() {}

  ngOnInit(): void {
    this.b4aService.getRaffles().subscribe((res: any) => {
      this.items = res.result.data;
    });
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt?.filterGlobal($event.target.value, stringVal);
  }
}
