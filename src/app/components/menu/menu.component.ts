import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  items: NbMenuItem[] = [
    {
      title: 'DASHBOARD',
      icon: 'home-outline',
      home: true,
      link: 'admin/dashboard',
    },
    {
      title: 'ESPECIALIDADES',
      icon: 'layers-outline',
      link: 'admin/specialties',
    },
    {
      title: 'ESTABELECIMENTOS',
      icon: 'keypad-outline',
      link: 'admin/establishment',
    },
    {
      title: 'ENTREGADORES',
      icon: 'car-outline',
      url: 'delivery',
    },
    {
      title: 'PEDIDOS',
      icon: 'shopping-cart-outline',
      url: 'request',
    },
    {
      title: 'CUPONS',
      icon: 'book-open-outline',
      url: 'coupon',
    },
    {
      title: 'FINANCEIRO',
      icon: 'hard-drive-outline',
      url: 'financial',
    },
    {
      title: 'RELATÓRIOS',
      icon: 'pie-chart-outline',
      url: 'report',
    },
    {
      title: 'USUÁRIOS',
      icon: 'person-outline',
      link: 'admin/user',
    },  
    {
      title: 'CONFIGURAÇÕES',
      icon: 'settings-outline',
      url: 'setting',
    },
    {
      title: 'NOTIFICAÇÕES',
      icon: 'bell-outline',
      url: 'notification',
    },
    {
      title: 'SUPORTE',
      icon: 'mic-outline',
      url: 'support',
    }
  ];

}
