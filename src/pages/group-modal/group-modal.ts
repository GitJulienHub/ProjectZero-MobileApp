import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
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
  requests: any;
  nonMembers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.token = this.navParams.get('token');
    this.group = this.navParams.get('group');
    this.friends = this.navParams.get('friends');
    this.title = this.group.name;
    this.describtion = this.group.beschreibung;
    this.createDate = this.group.created_at;
    this.updateDate = this.group.updated_at;
    this.users = this.group.users;
    this.groupdetails="Details";
    this.getRequests();
    this.getNonMembers();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupModalPage');
  }

  closeModal(){
    this.navCtrl.pop();
  }

  getNonMembers(){
    this.nonMembers = this.friends;
    for(var i in (this.users as any)){
      for(var x in (this.nonMembers as any)){
        if((this.nonMembers as any)[x].id == (this.users as any)[i].user.id){
          (this.nonMembers as any).pop((this.nonMembers as any)[x]);
        }
      }
    }

  }
  inviteFriend(id: string){
    //id geht nur von 1-47 (Hardcoded by backend HEHEXD)
    this.http.post('https://pr0jectzer0.ml/api/group/'+this.group.id+'/add_user?token=' + this.token, {'id': id})
        .subscribe(
            data => {
              this.toast('Gruppeneinladung verschickt');
            }, err => {

            }
        );
  }

  acceptRequest(id: any){
    this.http.get('https://pr0jectzer0.ml/api/group/'+this.group.id+'/accept/'+id+'?token=' + this.token)
        .subscribe(
            data => {
              this.getRequests();
              this.toast('Anfrage angenommen.');
            }, err => {
              this.toast('Anfrage konnte nicht angenommen werden.');
            }
        );
  }

  declineRequest(id: any){
    this.http.get('https://pr0jectzer0.ml/api/group/'+this.group.id+'/decline/'+id+'?token=' + this.token)
        .subscribe(
            data => {
              this.getRequests();
              this.toast('Anfrage abgelehnt.');
            }, err => {
              this.toast('Anfrage konnte nicht abgelehnt werden.');
            }
        );
  }

  getRequests(){
    this.http.get('https://pr0jectzer0.ml/api/group/'+this.group.id+'/requests/?token=' + this.token)
        .subscribe(
            data => {
              this.requests = [];
              for(var i in (data as any).requests){
                this.requests.push((data as any).requests[i]);
              }
            }, err => {

            }
        );
  }

  deleteGroup(id: string){
    let prompt = this.alertCtrl.create({
          title: 'Gruppe Auflösen',
          message: "Wollen sie diese Gruppe wirklich Auflösen?",
          buttons: [
            {
              text: 'No',
              handler: data => {
              }
            },
            {
              text: 'Yes',
              handler: data => {
                this.http.delete('https://pr0jectzer0.ml/api/group/'+this.group.id+'?token=' + this.token)
                    .subscribe(
                        data => {
                          this.toast('Gruppe wurde aufgelöst.');
                          this.closeModal();
                        }, err => {
                        }
                );
              }
            }
          ]
        });
        prompt.present();

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
