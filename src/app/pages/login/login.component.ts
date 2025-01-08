import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition } from '@nebular/theme';
import { SharedModule } from '../../modules/shared.module';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { SubscriptionService } from '../../services/subscription.service';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-login',
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [TemplateService],
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
      this.authService.login(email, password).subscribe(
        (res: any) => {          
          this.loading = false;
          if (res) {
            this.localService.setItem('user', res.result.data);
            this.router.navigateByUrl('admin/dashboard');
            this.sub.setIsLoggedIn(true);
            this.sub.setChangeAuth(true);
          }
        },
        (error) => {
          console.log(error);
          this.loading = false;
          this.templateService.detectChange();
          this.templateService.showToastr(
            'Erro ao efetuar login.',
            'Putzzzz!',
            {
              duration: 3000,
              position: this.physicalPositions.TOP_RIGHT,
              status: 'danger',
            }
          );
        }
      );
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
}
