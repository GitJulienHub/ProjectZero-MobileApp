import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the GroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  token: string;
  groups: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private toastCtrl: ToastController) {
    this.token = navParams.get('token');
    this.getAllGroups();
  }

  getAllGroups(){
    this.http.get("https://pr0jectzer0.ml/api/groups?token="+this.token)
    .subscribe(
        data => {
          this.groups = [];
          for(var i in (data as any).groups){
            this.groups.push((data as any).groups[i]);
          }
        }, err => {

        }
    );
  }

  joinGroup(id: any){
    this.http.get('https://pr0jectzer0.ml/api/group/'+id+'/request_access?token='+this.token)
    .subscribe(
        data => {
          this.toast("Anfrage abgeschickt.");
        }, err => {
          this.toast("User ist bereits in Gruppe!");
        }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsPage');
  }

  toast(msg : any ) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bot'
  });
  toast.present();
  }

}
