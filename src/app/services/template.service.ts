import { ChangeDetectorRef, Injectable } from '@angular/core';
import { NbToastrConfig, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  constructor(
    private cdr: ChangeDetectorRef,
    private toastrService: NbToastrService
  ) { }

  detectChange() {
    try {
      this.cdr.detectChanges();
    } catch (err) {
      console.log(err);
    }
  }

  showToastr(
    description: string,
    title: string,
    config: Partial<NbToastrConfig>
  ) {
    this.toastrService.show(description, title, config);
  }
}
