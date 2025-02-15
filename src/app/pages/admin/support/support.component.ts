import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { PrimeNgModule } from '../../../modules/primeng.module';
import { SharedModule } from '../../../modules/shared.module';
import { B4aServiceService } from '../../../services/b4a-service.service';
import { SubscriptionService } from '../../../services/subscription.service';
import { TemplateService } from '../../../services/template.service';

@Component({
  selector: 'app-support',
  imports: [SharedModule, PrimeNgModule, NgxLoadingModule, ReactiveFormsModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss',
  providers: [MessageService, TemplateService],
})
export class SupportComponent implements OnInit, OnDestroy {
  private b4aService = inject(B4aServiceService);
  private subService = inject(SubscriptionService);
  private templateService = inject(TemplateService);
  public loading = true;
  items: any[] = [];
  visible = false;
  @ViewChild('dt1') dt: Table | undefined;
  form!: FormGroup;
  status: Array<String> = ['Em atendimento', 'Finalizado'];
  data: any;
  subscriptions: Array<Subscription> = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      objectId: [null],
      name: [''],
      typeMotivation: [''],
      email: [''],
      subject: [''],
      message: [''],
      reading: [0],
      status: [0],
      reply: ['']
    });
  }

  ngOnInit(): void {
    const sub = this.subService.getUpdateTemplate().subscribe((res: any) => {
      if (res === 'update_template') {
        this.getData();
      }
    });

    this.subscriptions.push(sub);

    this.getData();
  }

  getData() {
    const sub = this.b4aService.getSupport().subscribe((res: any) => {
      if (res.result.success) {
        this.items = res.result.data;
        this.loading = false;
      }
    });

    this.subscriptions.push(sub);
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt?.filterGlobal($event.target.value, stringVal);
  }

  openDetails(item: any) {
    this.form.patchValue(item);
    this.data = item;
    this.visible = true;
  }

  resetForm() {
    this.visible = false;
    this.form.reset();
  }

  save() {
    this.loading = true;
    this.visible = false;

    const data = this.form.value;
    data.status = this.form.value.status === 'Em atendimento' ? 1 : 2;
    data.reading = this.form.value.reading ? 1 : 0;

    this.b4aService.updateSupport(data).subscribe({
      next: (res: any) => {
       
        if (res.result.success) {
          this.subService.setUpdateTemplate('update_template');
          this.templateService.showMessage(
            'success',
            'Parabéns!',
            'Ticket atualizado com sucesso.'
          );
        } else {
          this.templateService.showMessage(
            'error',
            'Ops!',
            'Ocorreu um erro ao atualizar o ticket.'
          );
        }
      },
      error: (error: any) => {
        // Handle error here
      },
      complete: () => {
        this.loading = false;
      }
    });
    
  }

   deleteItem(item: any) {
      const data = { objectId: item };
      Swal.fire({
        title: 'Atenção!',
        text: 'Voce realmente deseja excluir esse ticket?',
        showCancelButton: true,
        confirmButtonText: 'Excluir',
        cancelButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.b4aService.deleteSupport(data).subscribe((res: any) => {
            if (res.result.success) {
              this.templateService.showMessage(
                'success',
                'Parabéns!',
                'Ticket excluido com sucesso.'
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((data) => {
      data?.unsubscribe();
    });
  }
}
