import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {

    constructor(private el: ElementRef) { }

    @Output() clickOutside = new EventEmitter<void>()

    @HostListener('document:click', ['$event.target'])
    onClick(target: HTMLElement) {
        console.log('happen');
        
        const isClickedInside = this.el.nativeElement.contains(target)
        if (!isClickedInside) {
            this.clickOutside.emit()
        }
    }

}
