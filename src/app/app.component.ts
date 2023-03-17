import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports:[RouterModule]
})
export class AppComponent  {
  constructor(private connect : SignalrService){
  //  this.connect.startConnection(localStorage.getItem('token'))
  }
}
