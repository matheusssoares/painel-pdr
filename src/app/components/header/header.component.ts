import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  NbDialogRef,
  NbDialogService,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../../modules/primeng.module';
import { SharedModule } from '../../modules/shared.module';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { SubscriptionService } from '../../services/subscription.service';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule, PrimeNgModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [TemplateService, MessageService],
})
export class HeaderComponent implements OnInit {
  private localService = inject(LocalStorageService);
  private authService = inject(AuthService);
  private templateService = inject(TemplateService);
  private subsService = inject(SubscriptionService);
  logo!: string;
  private dialogRef!: NbDialogRef<any>;
  physicalPositions = NbGlobalPhysicalPosition;
  constructor(private dialogService: NbDialogService, private router: Router) {}

  ngOnInit(): void {
    const config: any = this.localService.getItem('config');
    if (config) {
      const configJson = JSON.parse(config);
      this.logo = configJson.image.url;
    }
  }

  logout(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog, {
      hasBackdrop: true,
      closeOnEsc: true,
    });
  }

  async yes() {
    this.authService.logout()?.subscribe(
      () => {
        if (this.dialogRef) {
          this.dialogRef.close();
        }
        this.templateService.showMessage(
          'success',
          'Parabéns!',
          `Logout efetuado com sucesso!`
        );
        this.localService.removeItem('user');
        this.subsService.setIsLoggedIn(false);
        this.subsService.setChangeAuth(false);
        this.router.navigateByUrl('login');
        this.templateService.detectChange();
      },
      () => {
        this.templateService.detectChange();
        this.templateService.showMessage(
          'error',
          'Putzzzz!',
          'Problemas ao efetuar login.'
        );
      }
    );
  }
}
