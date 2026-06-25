import { Component, Input, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  @Input()title =  ''
  isOpen = input(false);
  close = output<void>();

  onClose() {
    this.close.emit();
  }
}
