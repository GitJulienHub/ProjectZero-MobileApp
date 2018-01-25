import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the GroupModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-modal',
  templateUrl: 'group-modal.html',
})
export class GroupModalPage {
  groupdetails: string;
  createDate: string;
  updateDate: string;
  describtion: string;
  friends: any;
  users: string;
  token: string;
  group: any;
  title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private toastCtrl: ToastController) {
    this.token = this.navParams.get('token');
    this.group = this.navParams.get('group');
    this.friends = this.navParams.get('friends');
    this.title = this.group.name;
    this.describtion = this.group.beschreibung;
    this.createDate = this.group.created_at;
    this.updateDate = this.group.updated_at;
    this.users = this.group.users;
    this.groupdetails="Details";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupModalPage');
  }

  closeModal(){
    this.navCtrl.pop();
  }

  inviteFriend(id: string){
    console.log("THIS IS MU ID", id);
    //id geht nur von 1-47 (Hardcoded by backend HEHEXD)
    this.http.post('https://pr0jectzer0.ml/api/group/'+this.group.id+'/add_user?token=' + this.token, {'id': id})
        .subscribe(
            data => {
              this.toast('Gruppeneinladung verschickt');
            }, err => {

            }
        );
  }
  toast(msg : any ) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'top'
  });
  toast.present();
  }

}
