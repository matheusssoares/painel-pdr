import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { NumberRollerComponent } from '../../../components/number-roller/number-roller.component';
import { PrimeNgModule } from '../../../modules/primeng.module';
import { SharedModule } from '../../../modules/shared.module';
import { B4aServiceService } from '../../../services/b4a-service.service';
import { TemplateService } from '../../../services/template.service';

@Component({
  selector: 'app-raffle-maker',
  imports: [SharedModule, PrimeNgModule, NgxLoadingModule, LottieComponent, FormsModule, NumberRollerComponent],
  templateUrl: './raffle-maker.component.html',
  styleUrl: './raffle-maker.component.scss',
  providers: [MessageService, TemplateService]
})
export class RaffleMakerComponent implements OnInit {
  b4aService = inject(B4aServiceService);
  private templateService = inject(TemplateService);
  visible = false;
  options: AnimationOptions = {
    path: '/assets/lotties/countdown.json',
    loop: false,
  };
  subscriptions: Subscription[] = [];
  items: any[] = [];

  // Variáveis para armazenar os valores selecionados
  selectedCampaign: any = null;
  ticketQuantity: number = 1;
  displayForm = true;
  data: any = [];
  constructor() {}

  ngOnInit(): void {
    const sub = this.b4aService.getRaffles(true).subscribe((res: any) => {
      if (res.result.success) {
        this.items = res.result.data;
      }
    });

    this.subscriptions.push(sub);
  }

  finallyEvent() {
    this.displayForm = false;
    this.visible = false;
    this.templateService.showMessage('success', 'Parabéns!', 'Bilhetes sorteados com sucesso!');
  }

  // Método que verifica se o formulário está válido
  isFormValid(): boolean {
    return this.selectedCampaign && this.ticketQuantity && this.ticketQuantity > 0;
  }

  generateTickets() {
    if (this.isFormValid()) {
      this.visible = true;
      this.b4aService.generateTickets(this.selectedCampaign, this.ticketQuantity).subscribe((res: any) => { 
        if (res.result.success) {
          this.data = res.result.data.map((item: any) => {           
            return {
              item: item,
              selectedTicket: parseInt(item.selectedTicket.number),
            }
          });          
          
        } else {
          this.visible = false;
          this.templateService.showMessage('error', 'Ops!', 'Ocorreu um erro ao sortear os bilhetes.');
        }
      });
    }
  }
}
