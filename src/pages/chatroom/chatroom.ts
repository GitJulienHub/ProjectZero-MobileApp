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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.token = this.navParams.get('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatroomPage');
  }

  getChatroom(){

  }

  sendMessage(){
    console.log(this.message.value);

    this.http.post('https://pr0jectzer0.ml/api/chatroom/'+this.chatroom+'/messages?token=' + this.token, {'message': this.message.value})
        .subscribe(
            data => {
              console.log(data);
            }, err => {

            }
        );
  }

}
