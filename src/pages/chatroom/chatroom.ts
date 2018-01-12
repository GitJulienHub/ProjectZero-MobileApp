import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {PusherService} from '../../shared/pusher.service';

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

  constructor(public navCtrl: NavController, private p: PusherService, public navParams: NavParams, public http: HttpClient) {
    this.token = this.navParams.get('token');
    this.user = this.navParams.get('user');
    this.updateMessages();


    this.messages = [];
  }

  ngOnInit() {
  // this.route.params.subscribe(params => {
  //   this.chatid = params['id'];
  //   this.updateMessages();
  // });

  // this.channel = this.p.pusher.subscribe('private-chat.' + this.chatid);
  // this.channel.bind('App\\Events\\MessageSent', () => {
  //   console.log("Herro");
  //   this.updateMessages();
  // });
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
               //console.log(data);
               this.messages = data['message'];
               console.log(this.messages.message);
               this.messages = [];
               var message;
               var username;
               console.log(data);
               for(var i in (data as any).message){

                  message = ((data as any).message[i].message);
                  username = ((data as any).message[i].user.name);
                  this.messages.push(username+": "+message);
                 //this.friends.push((data as any).friends[i].name);
               }
               console.log(this.messages);

             }
           );
         });

   }


  getChatroom(){
      return new Promise(resolve => {
        this.http.get("https://pr0jectzer0.ml/api/chatroom/"+this.user+"?token="+this.token)
        .subscribe(
            data => {
              console.log("https://pr0jectzer0.ml/api/chatroom/"+this.user+"?token="+this.token);
              console.log(data);
              this.chatroom = data['chatroom'];
              resolve(this.chatroom);
            /*  this.messages = [];
              for(var i in (data as any).messages){
                this.messages.push((data as any).messages[i].name);
              }
              console.log(this.friends);
              */
            }, err => {

            }
        );
        });
  }

  sendMessage(){
    console.log(this.message.value);
    this.getChatroom()
      .then(data => {
        this.http.post('https://pr0jectzer0.ml/api/chatroom/'+this.chatroom+'/messages?token=' + this.token, {'message': this.message.value})
            .subscribe(
                data => {

                  console.log(data);
                  this.updateMessages();
                }, err => {

                }
            );
      });

  }

}
