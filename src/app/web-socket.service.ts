import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }

  private oWebSocket: WebSocket;
  private aMessages = [];
  oMessageQueue$: Subject<any> = new Subject();
  lConnectionOpen: boolean = false;

  openWebSocket(url: string) {
    try {
      this.oWebSocket = new WebSocket(url);
      this.setupSocket(url);
    } catch {
      this.lConnectionOpen = false;
    }
  }

  setupSocket(url: string) {
    this.oWebSocket.onopen = (e) => {
      this.lConnectionOpen = true;
      console.log("Connected")
    }
    this.oWebSocket.onmessage = (e) =>{
      const message = JSON.parse(e.data);
      this.oMessageQueue$.next(message);
      this.aMessages.push(message);
    }
    this.oWebSocket.onclose = (e) => {
      this.lConnectionOpen = false;

      setTimeout(() => {
        this.openWebSocket(url);
        console.log("Reconnecting...");
      }, 3000);
    }
    this.oWebSocket.onerror = (e) => {
      this.oWebSocket.close();
    }
  }
}
