import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports:[SignUpComponent,LoginComponent,RouterModule]
})
export class AppComponent implements OnInit {
  constructor(private connect : SignalrService){}
  ngOnInit(): void {
    
    this.connect.startConnection();
  }


}
