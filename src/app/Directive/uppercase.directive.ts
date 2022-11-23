import { Directive, ElementRef, EventEmitter, HostListener, Renderer2, Output } from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {


  constructor(private element : ElementRef<HTMLInputElement>,private renderer: Renderer2) {
   }

   @HostListener('input',['$event'])
    input($event: any) {
      const newValue = $event.target.value.toLocaleUpperCase();
      this.element.nativeElement.value = newValue;
  }

}
