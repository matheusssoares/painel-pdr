import { Component, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../../../../modules/primeng.module';
import { SharedModule } from '../../../../modules/shared.module';


@Component({
  selector: 'app-form-raffles',
  imports: [SharedModule, PrimeNgModule],
  templateUrl: './form-raffles.component.html',
  styleUrl: './form-raffles.component.scss',
  providers: [MessageService]
})

export class FormRafflesComponent implements OnInit {
  loading: boolean = false;
  idRaffles!: string;
  uploadedFiles: any[] = [];
  constructor(
    @Optional() private dialogRef: NbDialogRef<any>,
  ) {}
  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  onUpload(event: any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
}

}
