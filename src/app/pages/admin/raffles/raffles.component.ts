import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Table } from 'primeng/table';
import { PrimeNgModule } from '../../../modules/primeng.module';
import { SharedModule } from '../../../modules/shared.module';
import { B4aServiceService } from '../../../services/b4a-service.service';
import { FormRafflesComponent } from './form-raffles/form-raffles.component';

@Component({
  selector: 'app-raffles',
  imports: [SharedModule, PrimeNgModule, CommonModule],
  templateUrl: './raffles.component.html',
  styleUrl: './raffles.component.scss',
})
export class RafflesComponent implements OnInit {
  @ViewChild('dt1') dt: Table | undefined;
  private b4aService = inject(B4aServiceService);
  items: any[] = [];
  globalFilterFields: string[] = ['name', 'price', 'drawDate', 'status'];

  constructor(
    private dialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.b4aService.getRaffles().subscribe((res: any) => {
      this.items = res.result.data;
    });
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt?.filterGlobal($event.target.value, stringVal);
  }

  openModal() {
    this.dialogService.open(FormRafflesComponent, {
      autoFocus: true,
      closeOnBackdropClick: true,
      hasScroll: true,
    });
  }
}
