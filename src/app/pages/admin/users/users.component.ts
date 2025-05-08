import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PrimeNgModule } from '../../../modules/primeng.module';
import { SharedModule } from '../../../modules/shared.module';
import { FirebaseService } from '../../../services/firebase.service';
import { SubscriptionService } from '../../../services/subscription.service';
import { TemplateService } from '../../../services/template.service';

@Component({
  selector: 'app-users',
  imports: [SharedModule, PrimeNgModule, NgxLoadingModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [TemplateService, MessageService, ConfirmationService],
})
export class UsersComponent implements OnInit {
  @ViewChild('dt1') dt: Table | undefined;
  private firebaseService = inject(FirebaseService);
  private templateService = inject(TemplateService);
  private subService = inject(SubscriptionService);
  loading: boolean = true;
  items: any[] = [];
  visible: boolean = false;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt?.filterGlobal($event.target.value, stringVal);
  }

  ngOnInit() {
    this.initialForm();

    this.subService.getUpdateTemplate().subscribe((res: any) => {
      if (res === 'update_template') {
        this.getData();
      }
    });

    this.getData();
  }

  getData() {
    this.firebaseService.getUsers().subscribe((res: any) => {
      if (res) {
        this.items = res;
        this.loading = false;
      }
    });
  }

  initialForm() {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(6)]],
      isColaborator: [false, [Validators.required]],
      codeColaborator: ['', [Validators.required, Validators.maxLength(4)]],
    });
  }
  openModal(status: boolean, data: any) {
    this.form.patchValue(data);
    this.visible = true;
  }

  resetForm() {
    this.visible = false;
    this.form.reset();
  }

  save() {
    delete this.form.value.name;
    this.loading = true;

    this.firebaseService.updateUser(this.form.value).subscribe((res: any) => {
      if (res) {
        this.loading = false;
        this.visible = false;

        this.templateService.showMessage(
          'success',
          'Parabéns!',
          'Colaborador criado com sucesso.'
        );

        this.subService.setUpdateTemplate('update_template');
      }
    });
  }
}
