import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
@NgModule({
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    DataViewModule,
    TagModule,
    MessagesModule,
    FileUploadModule,
    ToastModule
  ],
  exports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    DataViewModule,
    TagModule,
    MessagesModule,
    FileUploadModule,
    ToastModule
  ],
})
export class PrimeNgModule {}
