import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition } from '@nebular/theme';
import { NgxLoadingModule } from 'ngx-loading';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../../modules/primeng.module';
import { SharedModule } from '../../modules/shared.module';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { SubscriptionService } from '../../services/subscription.service';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-login',
  imports: [SharedModule, ReactiveFormsModule, PrimeNgModule, NgxLoadingModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [TemplateService, MessageService],
})
export class LoginComponent implements OnInit {
  private localService = inject(LocalStorageService);
  private authService = inject(AuthService);
  private sub = inject(SubscriptionService);
  private templateService = inject(TemplateService);
  loading: boolean = false;
  form!: FormGroup;
  showPassword: boolean = false;
  logo!: string;
  physicalPositions = NbGlobalPhysicalPosition;

  constructor(private fb: FormBuilder, private router: Router) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    const config: any = this.localService.getItem('config');
    if (config) {
      const configJson = JSON.parse(config);      
      this.logo = configJson.image.url;
    } else {
      this.logo = "https://parsefiles.back4app.com/um4uYNQErQqajOI5i5mtKzsGknk3ywb5fggFqMS8/dea0d661fd9ee21ba1a75d3a6f5fa547_logo.png"
    }

    this.getSection();
  }

  getSection() {
    const isLogged = this.authService.getCurrentUser();
    if (isLogged) {
      this.sub.setIsLoggedIn(true);
      this.sub.setChangeAuth(true);
      this.router.navigateByUrl('admin/dashboard');
    }
  }
  async onSubmit() {
    if (this.form.valid) {
      this.loading = true;

      const { email, password } = this.form.value;
      this.authService.login(email, password).subscribe({
        next: (res: any) => {
          this.loading = false;
          if (res) {
            this.localService.setItem('user', res.result.data);
            this.sub.setIsLoggedIn(true);
            this.sub.setChangeAuth(true);
            this.templateService.detectChange();
            this.templateService.showMessage(
              'success',
              'Parabéns!',
              'Login efetuado com sucesso!'
            );
            this.router.navigateByUrl('admin/dashboard');
          }
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
          this.templateService.detectChange();
          this.templateService.showMessage(
            'error',
            'Putzzzz!',
            'Problemas ao efetuar login.'
          );
        },
      });
    }
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  resetPassword() {
    this.templateService.showMessage('info', 'Olá', 'mundo!');
  }
}
