import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})
export class ChatroomPage implements OnInit{

  @ViewChild('message') message;

  chatroom: any;

  messages: any;

  token: any;
  user: any;
  channel: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.token = this.navParams.get('token');
    this.user = this.navParams.get('user');
    this.updateMessages();


    this.messages = [];
  }

  ngOnInit() {

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatroomPage');
  }


  updateMessages() {

    this.getChatroom()
      .then(data => {
         this.http.get("https://pr0jectzer0.ml/api/chatroom/" + this.chatroom + "/messages?token=" + this.token)
           .subscribe(
             data => {
               this.messages = data['message'];
               this.messages = [];
               var message;
               var username;
               for(var i in (data as any).message){

                  message = ((data as any).message[i].message);
                  username = ((data as any).message[i].user.name);
                  this.messages.push(username+": "+message);
               }
             }
           );
         });

   }

  getChatroom(){
      return new Promise(resolve => {
        this.http.get("https://pr0jectzer0.ml/api/chatroom/"+this.user+"?token="+this.token)
        .subscribe(
            data => {
              this.chatroom = data['chatroom'];
              resolve(this.chatroom);
            }, err => {

            }
        );
        });
  }

  sendMessage(){
    this.getChatroom()
      .then(data => {
        this.http.post('https://pr0jectzer0.ml/api/chatroom/'+this.chatroom+'/messages?token=' + this.token, {'message': this.message.value})
            .subscribe(
                data => {
                  this.updateMessages();
                }, err => {
                }
            );
      });

  }

}
