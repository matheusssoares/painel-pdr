import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { SharedModule } from './modules/shared.module';
import { B4aServiceService } from './services/b4a-service.service';
import { LocalStorageService } from './services/local-storage.service';
import { SubscriptionService } from './services/subscription.service';
import { TemplateService } from './services/template.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule, HeaderComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [TemplateService],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private b4aService = inject(B4aServiceService);
  private localService = inject(LocalStorageService);
  private sub = inject(SubscriptionService);
  private subscriptions: Array<Subscription> = [];
  constructor() {
    
  }

  ngOnInit(): void {
    this.getConfig();
    this.sub.getIsLoggedIn();
  }

  getConfig() {
    this.b4aService.getConfig().subscribe((res) => {
      if (res) {
        this.localService.setItem('config', res);
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
