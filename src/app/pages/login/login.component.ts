import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private localService = inject(LocalStorageService);
  loading: boolean = false;
  form!: FormGroup;
  showPassword: boolean = true;
  logo!: string;

  constructor(
    private fb: FormBuilder,
  ) { 

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    const config: any = this.localService.getItem('config');
    const configJson = JSON.parse(config);
    this.logo = configJson.image.url;
    
  }
  async onSubmit() {

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
