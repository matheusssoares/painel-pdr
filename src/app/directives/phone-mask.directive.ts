import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appPhoneMask]',
})
export class PhoneMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    // Aplica o padrão de máscara para telefone com 8 ou 9 dígitos no final
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else {
      value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
    }

    input.value = value;
  }
}
