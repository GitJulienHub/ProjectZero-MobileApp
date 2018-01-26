import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular'
import { HttpClient } from '@angular/common/http';



/**
 * Generated class for the AddGroupModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-group-modal',
  templateUrl: 'add-group-modal.html',
})
export class AddGroupModalPage {
  token: any;

  @ViewChild('groupname') groupname;
  @ViewChild('groupdesc') groupdesc;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public http: HttpClient) {
    this.token = this.navParams.get('token');
    console.log('UserId', navParams.get('userId'));
  }

  sendGroupData(){
    this.http.post('https://pr0jectzer0.ml/api/group?token=' + this.token, {'name': this.groupname.value, 'beschreibung': this.groupdesc.value})
        .subscribe(
            data => {
              this.toast('Gruppe wurde hinzugefügt');
            }, err => {
              this.toast('Gruppe konnte nicht hinzugefügt werden.');
            }
        );
    this.closeModal();
  }

  toast(msg : any ) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bot'
    });
    toast.present();
  }

  closeModal(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGroupModalPage');
  }

}
