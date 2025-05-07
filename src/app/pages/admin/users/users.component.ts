import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNgModule } from '../../../modules/primeng.module';
import { SharedModule } from '../../../modules/shared.module';
import { FirebaseService } from '../../../services/firebase.service';
import { TemplateService } from '../../../services/template.service';

@Component({
  selector: 'app-users',
  imports: [SharedModule, PrimeNgModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [TemplateService, MessageService, ConfirmationService],
})
export class UsersComponent implements OnInit {
  private firebaseService = inject(FirebaseService);
  constructor() {}
  
  ngOnInit() {
    this.firebaseService.getUsers().subscribe((res: any) => {
      console.log('res =>', res);
      
    });
  }
  openModal(status: boolean, data: any) {}
}
