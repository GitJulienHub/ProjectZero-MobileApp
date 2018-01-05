import { Component, ViewChild } from '@angular/core';
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
export class ChatroomPage {

  @ViewChild('message') message;

  chatroom: any = 26;
  messages: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.token = this.navParams.get('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatroomPage');
  }

  getChatroom(){
    this.http.get("https://pr0jectzer0.ml/api/chatroom/?token="+this.token)
        .subscribe(
            data => {
              console.log(data);
            /*  this.messages = [];
              for(var i in (data as any).messages){
                this.messages.push((data as any).messages[i].name);
              }
              console.log(this.friends);
              */
            }, err => {

            }
        );
  }

  sendMessage(){
    console.log(this.message.value);
    getChatroom()
      .then
    this.http.post('https://pr0jectzer0.ml/api/chatroom/'+this.chatroom+'/messages?token=' + this.token, {'message': this.message.value})
        .subscribe(
            data => {
              console.log(data);
            }, err => {

            }
        );
  }

}
