import { Component } from '@angular/core';
import { NbComponentStatus } from '@nebular/theme';


@Component({
  selector: 'ngx-nav-page',
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.scss']
})
export class NavPageComponent {
  buttonConfigs = [
    { status: 'Phases', route: '/route1', icon: 'home' },
     { status: 'success', route: '/route2', icon: 'checkmark-circle' },
     { status: 'gf', route: '/route3', icon: 'info' },
    // { status: 'warning', route: '/route4', icon: 'alert-triangle' },
    // { status: 'danger', route: '/route5', icon: 'close-circle' }
  ];

  buttonConfigsDisabled = [
    { status: 'dashboard', route: '/route1', icon: 'layout' },
    // { status: 'success', route: '/route2', icon: 'checkmark-circle' },
    // { status: 'info', route: '/route3', icon: 'info' },
    // { status: 'warning', route: '/route4', icon: 'alert-triangle' },
    // { status: 'danger', route: '/route5', icon: 'close-circle' }
  ];

  
  
}
