//import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';


//4Tutorial
export class User {
  public id: string;
  public name: string ;
  public connId: string //signalr
  public msgs: Array<Message>;//5Tutorial (only client-side property)
  public firstName: any;
}


//5Tutorial
export class Message {
  constructor(
    public content: string,
    public mine: boolean
  ) {}
}




@Injectable({ providedIn: 'root' })
export class SignalrService {
    constructor(
        //public toastr: ToastrService,
        public router: Router //2Tutorial
        ) { }


    hubConnection:signalR.HubConnection;
    //4Tutorial
    userData: User | undefined;

    //3Tutorial
    ssSubj = new Subject<any>();
    ssObs(): Observable<any> {
        return this.ssSubj.asObservable();
    }

    startConnection = (authToken :string ) => {
        this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('http://192.180.0.127:4040/ChatHub', {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets,
            accessTokenFactory :() => authToken
        }).withAutomaticReconnect()
        .build();

        this.hubConnection
        .start()
        .then(() => {
            console.log("started");
        })
        .catch((err:any) => console.log('Error while starting connection: ' + err))
    }


}
