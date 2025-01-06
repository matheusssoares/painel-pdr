import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { environment } from '../../environment';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  logo: string = environment.logoPathHorizontal;
  private dialogRef!: NbDialogRef<any>;
  constructor(
    //private authService: AuthService,
    private dialogService: NbDialogService,
    private router: Router,
    //private templateService: TemplateService
  ) {
    
  }

  logout(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog, {
      hasBackdrop: true,
      closeOnEsc: true,
    });
  }

  async yes() {
    /* this.authService.logout();
    this.templateService.detectChange();
    this.templateService.changeTemplate(true); */
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.router.navigateByUrl('');
  }

}
