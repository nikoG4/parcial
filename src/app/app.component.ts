import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Tickets', url: '/tickets', icon: 'home' },
    { title: 'Clientes', url: '/clientes', icon: 'person' },
  ];


  constructor() {

  }

}
