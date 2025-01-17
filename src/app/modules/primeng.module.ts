import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
@NgModule({
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    DataViewModule,
    TagModule,
    MessagesModule,
    FileUploadModule,
    ToastModule,
    EditorModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    SelectModule,
    TabsModule,
    ChipModule,
    ToggleSwitchModule
  ],
  exports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    DataViewModule,
    TagModule,
    MessagesModule,
    FileUploadModule,
    ToastModule,
    EditorModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    SelectModule,
    TabsModule,
    ChipModule,
    ToggleSwitchModule
  ],
})
export class PrimeNgModule {}
