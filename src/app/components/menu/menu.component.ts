import { Component, inject, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { SharedModule } from '../../modules/shared.module';
import { B4aServiceService } from '../../services/b4a-service.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  private b4aService = inject(B4aServiceService);
  items: NbMenuItem[] = [];	

  constructor(
  ) { }

  ngOnInit(): void {
    this.b4aService.getMenu().subscribe((res: any) => {
      if (res) {
        this.items = res.result.data.map((item: any) => ({
          title: item.title,
          icon: item.icon,
          link: item.url, // 'url' da API vira 'link' para o NbMenu
          home: item.order === 0 // Define 'home' como true para o primeiro item
        }));
      } else {
        console.error("Erro ao carregar o menu:", res.message);
      }
    });
  }
}
