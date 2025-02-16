import { Component } from '@angular/core';
import { PrimeNgModule } from '../../../modules/primeng.module';
import { SharedModule } from '../../../modules/shared.module';

@Component({
  selector: 'app-reports',
  imports: [SharedModule, PrimeNgModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

}
