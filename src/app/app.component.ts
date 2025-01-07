import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { SharedModule } from './modules/shared.module';
import { B4aServiceService } from './services/b4a-service.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule, HeaderComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  private b4aService = inject(B4aServiceService);
  private localService = inject(LocalStorageService);

  constructor() { 

  }

  ngOnInit(): void {
    this.b4aService.getConfig().subscribe(res => { 
     if(res) {
      console.log(res);      
      this.localService.setItem('config', res);
     }    
    });

  }
}
