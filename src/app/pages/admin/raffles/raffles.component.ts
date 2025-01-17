import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { parseISO } from 'date-fns';
import { NgxLoadingModule } from 'ngx-loading';
import { MessageService } from 'primeng/api';
import { Editor } from 'primeng/editor';
import { Table } from 'primeng/table';
import { PhoneMaskDirective } from '../../../directives/phone-mask.directive';
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
  selector: 'app-raffles',
  imports: [
    SharedModule,
    PrimeNgModule,
    CommonModule,
    ReactiveFormsModule,
    Editor,
    PhoneMaskDirective,
    NgxLoadingModule,
  ],
  templateUrl: './raffles.component.html',
  styleUrl: './raffles.component.scss',
  providers: [CurrencyPipe, TemplateService, MessageService],
})
export class RafflesComponent implements OnInit {
  @ViewChild('dt1') dt: Table | undefined;
  private b4aService = inject(B4aServiceService);
  private subService = inject(SubscriptionService);
  items: any[] = [];
  globalFilterFields: string[] = ['name', 'price', 'drawDate', 'status'];
  visible: boolean = false;
  headerModal: string = 'Adicionar campanha';
  uploadedFiles: Array<any> = [];
  form!: FormGroup;
  valueFormatMoney: string = '';
  qtdRaffles = [
    { label: '10 bilhetes', value: `10.json` },
    { label: '50 bilhetes', value: `50.json` },
    { label: '100 bilhetes', value: `100.json` },
    { label: '500 bilhetes', value: `500.json` },
    { label: '1.000 bilhetes', value: `1000.json` },
    { label: '5.000 bilhetes', value: `5000.json` },
    { label: '10.000 bilhetes', value: `10000.json` },
    { label: '15.000 bilhetes', value: `15000.json` },
    { label: '20.000 bilhetes', value: `20000.json` },
    { label: '25.000 bilhetes', value: `25000.json` },
  ];
  itemsAwards: string[] = [];
  prizeDraw: string[] = [
    'Diretamente com o Organizador',
    'Loteria Federal',
    'Sorteador Online',
  ];
  visibleAwards: boolean = false;
  @ViewChild('awardsInput') awardsInput: any;
  loading: boolean = false;
  private templateService = inject(TemplateService);
  constructor(private fb: FormBuilder, private currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
    this.initialForm();

    this.subService.getUpdateTemplate().subscribe((res: any) => {
      console.log('res =>', res);

      if (res === 'update_template') {
        this.getData();
      }
    });

    this.getData();
  }

  getData() {
    this.b4aService.getRaffles().subscribe((res: any) => {
      this.items = res.result.data;
    });
  }
  initialForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      price: ['', [Validators.required]],
      drawDate: ['', [Validators.required]],
      status: [0],
      whatsApp: ['', [Validators.required]],
      regulation: [''],
      fileTickets: ['', [Validators.required]],
      showProgress: [false],
      showBuilders: [false],
      favoriteRaffle: [false],
      prizeDraw: ['Diretamente com o Organizador', [Validators.required]],
    });
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt?.filterGlobal($event.target.value, stringVal);
  }

  openModal() {
    this.visible = true;
  }

  onUpload(event: UploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  async save() {
    this.loading = true;
    this.visible = false;

    const data = this.form.value;
    const drawDateString = data.drawDate;
    data.drawDate = parseISO(drawDateString);
    data.price = parseFloat(data.price.replace(',', '.'));
    data.typeFile = this.uploadedFiles[0].type;
    const strbase64 = await this.convertFileToBase64(this.uploadedFiles[0]);
    data.image = `data:image/jpeg;base64,${strbase64}`;
    data.awards = this.itemsAwards;

    this.b4aService.createRaffle(data).subscribe({
      next: (res: any) => {
        if (res.result.success) {
          this.templateService.showMessage(
            'success',
            'Parabéns!',
            'Campanha criada com sucesso.'
          );

          this.subService.setUpdateTemplate('update_template');
        } else {
          this.templateService.showMessage(
            'error',
            'Putzzz!',
            'Problemas internos ao criar campanha.'
          );
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  createAwards(value: any) {
    this.visibleAwards = false;
    this.itemsAwards.push(value.value);
    this.awardsInput!.nativeElement!.value = '';
  }

  removeAwards(item: any) {
    this.itemsAwards = this.itemsAwards.filter((i: any) => i !== item);
  }

  formatValueWithBRL(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    valor = (parseInt(valor) / 100).toFixed(2);

    //aplicar formatação monetária
    this.valueFormatMoney = this.currencyPipe.transform(
      valor,
      'BRL',
      'symbol',
      '1.2-2'
    )!;

    //atualiza o valor do formulário trocando a vírgula por ponto
    this.form.get('price')?.setValue(valor.replace('.', ','));
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
}
