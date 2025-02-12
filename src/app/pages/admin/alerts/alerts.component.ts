import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { MessageService } from 'primeng/api';
import { Editor } from 'primeng/editor';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import { PrimeNgModule } from '../../../modules/primeng.module';
import { SharedModule } from '../../../modules/shared.module';
import { B4aServiceService } from '../../../services/b4a-service.service';
import { SubscriptionService } from '../../../services/subscription.service';
import { TemplateService } from '../../../services/template.service';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-alerts',
  imports: [
    SharedModule,
    PrimeNgModule,
    ReactiveFormsModule,
    Editor,
    NgxLoadingModule,
  ],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss',
  providers: [MessageService, TemplateService],
})
export class AlertsComponent implements OnInit {
  private subService = inject(SubscriptionService);
  private b4aService = inject(B4aServiceService);
  private templateService = inject(TemplateService);
  items: any[] = [];
  form!: FormGroup;
  headerModal: string = 'Adicionar comunicado';
  visible: boolean = false;
  loading = false;
  @ViewChild('dt1') dt: Table | undefined;
  uploadedFiles: Array<any> = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initialForm();

    this.subService.getUpdateTemplate().subscribe((res: any) => {
      if (res === 'update_template') {
        this.getData();
      }
    });

    this.getData();
  }

  initialForm() {
    this.form = this.fb.group({
      objectId: [null],
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required]],
      status: [false],
    });
  }

  getData() {
    this.b4aService.getAlerts().subscribe((res: any) => {
      this.items = res.result.data;
    });
  }

  openModal(action: boolean, data: any) {
    if (action) {
      this.form.reset();
      this.headerModal = 'Editar comunicado';
      this.form.patchValue(data);
      setTimeout(() => {
        this.form.get('description')?.setValue(data.description);
        this.cdr.detectChanges();
      }, 400);
    } else {
      this.form.reset();
      this.initialForm();
      this.headerModal = 'Adicionar comunicado';
    }
    this.uploadedFiles = [];
    this.visible = true;
  }

  async save() {
    this.loading = true;
    this.visible = false;

    const data = this.form.value;
    if (this.uploadedFiles.length > 0) {
      data.typeFile = this.uploadedFiles[0].type;
      const strbase64 = await this.convertFileToBase64(this.uploadedFiles[0]);
      data.image = `data:image/jpeg;base64,${strbase64}`;
    }

    if (data.objectId) {
      this.b4aService.actionAlert(data, 'update').subscribe((res: any) => {
        this.loading = false;
        if (res.result.success) {
          this.uploadedFiles = [];
          this.subService.setUpdateTemplate('update_template');
          this.templateService.showMessage(
            'success',
            'Parabéns!',
            'Comunicado atualizado com sucesso.'
          );
        } else {
          this.templateService.showMessage(
            'error',
            'Ops!',
            'Ocorreu um erro ao atualizar o comunicado.'
          );
        }
      });
    } else {
      this.b4aService.actionAlert(data, 'create').subscribe((res: any) => {
        this.loading = false;
        if (res.result.success) {
          this.uploadedFiles = [];
          this.subService.setUpdateTemplate('update_template');
          this.templateService.showMessage(
            'success',
            'Parabéns!',
            'Comunicado criado com sucesso.'
          );
        } else {
          this.templateService.showMessage(
            'error',
            'Ops!',
            'Ocorreu um erro ao atualizar o comunicado.'
          );
        }
      });
    }
  }

  resetForm() {
    this.visible = false;
    this.form.reset();
  }

  deleteItem(item: any) {
    const data = { objectId: item };
    Swal.fire({
      title: 'Atenção!',
      text: 'Voce realmente deseja excluir esse comunicado?',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.b4aService.deleteAlert(data).subscribe((res: any) => {
          if (res.result.success) {
            this.templateService.showMessage(
              'success',
              'Parabéns!',
              'Comunicado excluido com sucesso.'
            );

            this.subService.setUpdateTemplate('update_template');
          } else {
            this.templateService.showMessage(
              'error',
              'Putzzz!',
              'Problemas internos ao excluir comunicado.'
            );
          }
        });
      }
    });
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt?.filterGlobal($event.target.value, stringVal);
  }

  onUpload(event: UploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1]; // Remove o prefixo data:<type>;base64,
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file); // Lê o arquivo como URL de dados (Base64)
    });
  }
  openImage(url: string) {
    window.open(url, '_blank');
  }
}
