import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CountUpModule } from 'ngx-countup';
@Component({
  selector: 'app-number-roller',
  templateUrl: './number-roller.component.html',
  styleUrls: ['./number-roller.component.scss'],
  imports: [CountUpModule, CommonModule],
})
export class NumberRollerComponent implements OnInit {
  @Input() number: number = 0;
  @Input() duration: number = 1;
  @Input() options: any = {};
  @Input() idRaffle: string = '';
  @Input() nameUser: string = '';
  @Input() cpf: string = '';
  @Input() phone: string = '';
  @Input() createdAt: Date = new Date();
  ngOnInit(): void {    
    const formattedNumber = this.number.toString().padStart(6, '0');
    const prefix = formattedNumber.slice(0, 6 - this.number.toString().length);

    this.options = {
      prefix,
      separator: '.',
    };
  }
}
