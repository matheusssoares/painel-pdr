import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {
  Component,
  computed,
  inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { Subscription } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { environment } from './environment';
import { SharedModule } from './modules/shared.module';
import { B4aServiceService } from './services/b4a-service.service';
import { LocalStorageService } from './services/local-storage.service';
import { SubscriptionService } from './services/subscription.service';
import { TemplateService } from './services/template.service';
registerLocaleData(localePt);
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule, HeaderComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, TemplateService],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private b4aService = inject(B4aServiceService);
  private localService = inject(LocalStorageService);
  private sub = inject(SubscriptionService);
  private subscriptions: Array<Subscription> = [];

  constructor(private primeng: PrimeNG) {}

  ngOnInit(): void {
    this.primeng.ripple.set(true);
    this.getConfig();
    this.sub.getIsLoggedIn();
  }

  getConfig() {
    const data = { nameProject: environment.nameProjectB4A };
    this.b4aService.getConfig(data).subscribe((res: any) => {
      console.log(res);
      if (res.result.success) {
        this.localService.setItem('config', res.result.data);
      }
    });
  }

  changeAuth = computed(() => this.sub.isChangeAuth());

  ngOnDestroy(): void {
    this.subscriptions.forEach((data) => {
      data?.unsubscribe();
    });
  }
}
