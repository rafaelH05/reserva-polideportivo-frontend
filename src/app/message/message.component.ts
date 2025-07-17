import { Component } from '@angular/core';
import { MessageService, MessageType } from '../service/message.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" class="alert alert-{{message.type}} alert-dismissible fade show" role="alert">
      {{ message.text }}
      <button type="button" class="btn-close" (click)="close()"></button>
    </div>
  `
})
export class MessageComponent {
  message: { text: string, type: MessageType } | null = null;

  constructor(private messageService: MessageService) {
    this.messageService.message$.subscribe(msg => this.message = msg);
  }

  close() {
    this.message = null;
  }
}
