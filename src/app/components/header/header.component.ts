import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  NbDialogRef,
  NbDialogService,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { SharedModule } from '../../modules/shared.module';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { SubscriptionService } from '../../services/subscription.service';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [TemplateService],
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
        this.templateService.showToastr(
          'Logout efetuado com sucesso.',
          'Atenção!',
          {
            duration: 3000,
            position: this.physicalPositions.TOP_RIGHT,
            status: 'info',
          }
        );
        this.localService.removeItem('user');
        this.subsService.setIsLoggedIn(false);
        this.subsService.setChangeAuth(false);
        this.router.navigateByUrl('login');
        this.templateService.detectChange();
      },
      () => {
        this.templateService.detectChange();
        this.templateService.showToastr('Erro ao efetuar logout.', 'Putzzzz!', {
          duration: 3000,
          position: this.physicalPositions.TOP_RIGHT,
          status: 'danger',
        });
      }
    );
  }
}
