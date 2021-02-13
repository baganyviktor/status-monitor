import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'status-monitor';
  cards: any = [
    { title: 'CPU Usage' },
    { title: 'Memory Usage' },
    { title: 'Requests' },
    { title: 'Visitors' },
    { title: 'Card name' },
    { title: 'Card name' },
    { title: 'Card name' },
    { title: 'Card name' },
  ];
}
