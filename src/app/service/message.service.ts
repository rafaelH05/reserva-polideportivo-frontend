import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type MessageType = 'success' | 'danger' | 'warning';

@Injectable({ providedIn: 'root' })
export class MessageService {
    public messageSubject = new Subject<{ text: string, type: MessageType }>();
    message$ = this.messageSubject.asObservable();

    showMessage(text: string, type: MessageType = 'success') {
        this.messageSubject.next({ text, type });
    }

    showError(number: number, message: string) {
        let errorMessage = '';


        if (number === 401) {
            errorMessage = 'Contraseña y/o usuario incorrecto';
        }
        else if (number === 404) {
            errorMessage = 'Usuario no encontrado';
        }
        else if (number === 500) {
            errorMessage = 'Error interno del servidor';
        }
        else if (number === 409) {
            console.log(message);
            if (message === 'El nombre de usuario ya está en uso') {
                errorMessage = 'El nombre de usuario ya está en uso';
            }
            else{
                errorMessage = 'El gmail ya está en uso';
            }
        }
        else if (status === '0') {

        }
        else {
            errorMessage = message.toString();
        }

        this.showMessage(errorMessage, 'danger');
    }

    showWarning(text: string) {
        this.showMessage(text, 'warning');
    }

    showSuccess(text: string) {
        this.showMessage(text, 'success');
    }
}