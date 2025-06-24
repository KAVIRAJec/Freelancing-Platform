import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { receiveMessage } from '../NgRx/Chat/chat.actions';
import { Store } from '@ngrx/store';

export class SignalRService {
  constructor(private store: Store) {}

  private hubConnection!: signalR.HubConnection;

  private chatNotificationSubject = new BehaviorSubject<any>(null);
  chatNotification$: Observable<any> = this.chatNotificationSubject.asObservable();

  private clientNotificationSubject = new BehaviorSubject<any>(null);
  clientNotification$ = this.clientNotificationSubject.asObservable();

  private freelancerNotificationSubject = new BehaviorSubject<any>(null);
  freelancerNotification$ = this.freelancerNotificationSubject.asObservable();

  startConnection(token: string) {
    if (this.hubConnection) return;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${environment.baseUrl.replace('/api/v1', '')}/notificationhub`,
        { accessTokenFactory: () => token }
      )
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected!'))
      .catch(err => console.error('SignalR Connection Error:', err));

    // Listen for chat notifications
    this.hubConnection.on('ChatNotification', (message) => {
      this.chatNotificationSubject.next(message);
      if (this.store) {
        this.store.dispatch(receiveMessage({ message }));
      }
    });

    // Listen for client notifications
    this.hubConnection.on('ClientNotification', (message) => {
      this.clientNotificationSubject.next(message);
    });

    // Listen for freelancer notifications
    this.hubConnection.on('FreelancerNotification', (notification) => {
      this.freelancerNotificationSubject.next(notification);
    });
  }

  stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
      this.hubConnection = undefined!;
    }
  }
}