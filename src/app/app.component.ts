import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { SharedModule } from './modules/shared.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule, HeaderComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLoggedIn = false;
  title = 'painel-papo-de-rifa';
}
