import { Component } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'status-monitor';

  aCoreData = [
    {
      name: 'Core01',
      url: 'ws://localhost:8080',
      data: [],
      socket: new WebSocketService(),
    },
    {
      name: 'Core02',
      url: 'ws://localhost:8080',
      data: [],
      socket: new WebSocketService(),
    },
    {
      name: 'Core03',
      url: 'ws://localhost:8080',
      data: [],
      socket: new WebSocketService(),
    },
  ];

  constructor() {
    this.setupConnections();

    for (let item of this.aCoreData) {
      item.socket.oMessageQueue$.subscribe((x) => {
        item.data = x;
      });
    }
  }

  setupConnections() {
    for (let item of this.aCoreData) {
      if (!item.socket.lConnectionOpen) {
        item.socket.openWebSocket(item.url);
      }
    }
  }

  getTotalMemory(coreData): number {
    return coreData.data?.MemFree+coreData.data?.MemUsed;
  }
}
