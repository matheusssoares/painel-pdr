import { ChangeDetectorRef, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  detectChange() {
    try {
      this.cdr.detectChanges();
    } catch (err) {
      console.log(err);
    }
  }

  showMessage(
    severity: 'success' | 'error' | 'info' = 'success',
    summary: string,
    detail: string
  ) {
    this.messageService.add({
      severity: severity,
      summary,
      detail,
      life: 2500,
    });
  }
}
