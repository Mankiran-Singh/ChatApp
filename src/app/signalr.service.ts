

import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { Subject } from "rxjs"

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
  public _hubConnection : signalR.HubConnection | any;
  constructor(private http: HttpClient){}
  api='http://192.180.2.128:5050/chatHub';
  Message = new Subject<{}>
  chatSubject = new Subject
  recieveMessage = new Subject;
  onlineUsers = new Subject;
  
  getMessage()
  {
     return this.http.get(this.api);
  }

  public startConnection(authToken : string)
  {
      
      this._hubConnection = new signalR.HubConnectionBuilder().withUrl(this.api,
      { 
          skipNegotiation: true,
           transport: signalR.HttpTransportType.WebSockets,
          accessTokenFactory :()=> authToken

      }).withAutomaticReconnect().build();

      this._hubConnection.start().then(()=>{
         // console.log("Connection started ");
          this.refreshListener();
      }).catch((error: any)=>{
         // console.log(" Error While starting connection "+error);
      });
  }

  sendMessage(email:string,msg:string,type:number,url:string,fileName:any)
  {
      return this._hubConnection?.invoke("sendMessage",email,msg,type,url,fileName);
  }

  addChat(email:string)
  {
      return this._hubConnection.invoke("addChat",email).catch((error:Error)=>{
          console.log('error');
      });
  }

  receiveMessageListener()
  {
      return this._hubConnection.on('receiveMessage', (response) => {
          this.Message.next(response);
      })
  }

  saveData(email:string)
  {
      return this._hubConnection.invoke('saveData',email).then((value:string)=>{
         // console.log(value)
      }).catch((error:Error)=>{
          console.log('error');
   });
}


  getChat(id:string,pageNumber:Number)
  {
       this._hubConnection.invoke('previousMessages',id,pageNumber).then((response : any )=>{
         // console.log(response.data)
          this.chatSubject.next(response.data);
       }).catch((error:any)=>{
          console.log('error');
   }); 
  }

  refreshListener()
  {
      this._hubConnection.on('refresh' ,()=>{
          return this._hubConnection.invoke('getUsers').then((response :any)=>{
              //console.log(response);
              this.onlineUsers.next(response.data);
          })
              .catch((error:any)=>{
                  console.log('error');
               }); 
      })
  }

  getUsers()
  {
      return this._hubConnection.invoke('getUsers').catch((error:any)=>{
          console.log('error');
   }); 
  }

}
