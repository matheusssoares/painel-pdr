import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PickListModule } from 'primeng/picklist';
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
    ToggleSwitchModule,
    MessageModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ChartModule,
    PickListModule
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
    ToggleSwitchModule,
    MessageModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ChartModule,
    PickListModule
  ],
})
export class PrimeNgModule {}
