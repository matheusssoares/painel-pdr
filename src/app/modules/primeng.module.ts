import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  imports: [TableModule, ButtonModule, InputTextModule, DataViewModule, TagModule, MessagesModule],
  exports: [TableModule, ButtonModule, InputTextModule, DataViewModule, TagModule, MessagesModule],
})
export class PrimeNgModule {}
