import { Component } from '@angular/core';
import { WebSocketService } from './web-socket.service';

export class ArchitectureInfo {
  year: number;
  smp: number;
  mmp: number;
  cnstl: number;
  cluster: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'status-monitor';
  compactView: boolean = true;

  get lConnected(): boolean {
    return this.aCoreSocketServices.every((x) => x.lConnectionOpen);
  }

  get CPUDetails() {
    return this.aCoreSocketServices.map(x => x['CPU']);
  }

  myData = [
    ['Memory', 80],
    ['CPU', 55],
    ['Network', 68]
  ];

  aCoreUrls = [
    'ws://localhost:8080',
    'ws://localhost:8080',
    'ws://localhost:8080',
  ];
  aCoreSocketServices: WebSocketService[] = new Array(
    this.aCoreUrls.length
  ).fill(new WebSocketService());
  aCoreUsageDetails = new Array(this.aCoreUrls.length);

  constructor() {
    this.setupConnections();

    for (let i = 0; i < this.aCoreUrls.length; i++) {
      this.aCoreSocketServices[i].oMessageQueue$.subscribe((x) => {
        this.aCoreUsageDetails[i] = x;
      });
    }
  }

  setupConnections() {
    for (let i = 0; i < this.aCoreUrls.length; i++) {
      if (!this.aCoreSocketServices[i].lConnectionOpen) {
        this.aCoreSocketServices[i].openWebSocket(this.aCoreUrls[i]);

      }
    }
  }
}
