import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { PrimeNgModule } from '../../../modules/primeng.module';
import { SharedModule } from '../../../modules/shared.module';
import { B4aServiceService } from '../../../services/b4a-service.service';

@Component({
  selector: 'app-reports',
  imports: [SharedModule, PrimeNgModule, NgxLoadingModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
  loading = false;
  private b4aService = inject(B4aServiceService);
  items: any[] = [];
  data: any;

  options: any;

  platformId = inject(PLATFORM_ID);
  carregouGrafico = false;

  constructor(private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.b4aService.getRaffles().subscribe((res: any) => {
      this.items = res.result.data;
    });

    
  }

  selectCampaign(item: any) {
    console.log(item);

    this.loading = true;
    let qtdeBilhetes = +item.fileTickets.split('.')[0].replace(/[^0-9]/g, '');
    this.b4aService.getReports(item.objectId).subscribe((res: any) => {
      this.loading = false;
      if (res.result.length) {
        const qtdeBilhetesVendidos = res.result.reduce((prev: any, current: any) => prev + current.quantity, 0);
        this.startReport(qtdeBilhetes, qtdeBilhetesVendidos);
      } else {
        console.log('Erro na API:', res);
      }
    });
  }

  startReport(qtdeBilhetesTotais: number, qtdeBilhetesVendidos: number) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
  
    this.data = {
      labels: ['Bilhetes totais', 'Bilhetes vendidos'],
      datasets: [
        {
          data: [qtdeBilhetesTotais, qtdeBilhetesVendidos],
          backgroundColor: [
            documentStyle.getPropertyValue('--p-cyan-500'),
            documentStyle.getPropertyValue('--p-orange-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--p-cyan-400'),
            documentStyle.getPropertyValue('--p-orange-400')
          ],
        },
      ],
    };
  
    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };
    this.cd.markForCheck();
    this.carregouGrafico = true;
  }
  
}
