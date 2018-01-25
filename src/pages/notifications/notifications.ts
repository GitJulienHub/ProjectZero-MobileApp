import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  token: string;
  notificationsGroup: any;
  notificationsFriend: any;
  notificationsNote: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private toastCtrl: ToastController) {
    this.token = this.navParams.get('token');
    this.getFriendNotifications();
    this.getGroupNotifications();
    this.getNotesNotifications();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  getFriendNotifications(){
    return new Promise(resolve => {
      this.http.get("https://pr0jectzer0.ml/api/friend/requests?token="+this.token)
          .subscribe(
              data => {
                console.log(data);
                this.notificationsFriend = [];
                for(var i in (data as any).requests){
                  this.notificationsFriend.push((data as any).requests[i]);
                }
                  console.log(this.notificationsFriend);
                  resolve(data);
                  return;
              }, err => {
                  console.log("Error, getFriendNotifications");
                  return;
              }
          );
     });

  }

  getGroupNotifications(){
    return new Promise(resolve => {
      this.http.get("https://pr0jectzer0.ml/api/group/requests?token="+this.token)
          .subscribe(
              data => {
                console.log(data);
                this.notificationsGroup = [];
                for(var i in (data as any).requests){
                  this.notificationsGroup.push((data as any).requests[i]);
                }
                  return;
              }, err => {
                  console.log("Error, getGroupNotifications");
                  return;
              }
          );
     });

  }


  getNotesNotifications(){
    return new Promise(resolve => {
      this.http.get("https://pr0jectzer0.ml/api/note/requests?token="+this.token)
          .subscribe(
              data => {
                console.log(data);
                this.notificationsNote = [];
                for(var i in (data as any).requests){
                  this.notificationsNote.push((data as any).requests[i]);
                }
                  return;
              }, err => {
                  console.log("Error, getNotesNotifications");
                  return;
              }
          );
     });

}





  acceptFriend(notificationFriend: any){
    this.http.get('https://pr0jectzer0.ml/api/friend/'+notificationFriend.id+'/accept?token=' + this.token)
        .subscribe(
            data => {
                this.toast("Freundschaftsanfrage angenommen");
                this.getFriendNotifications();
                this.getGroupNotifications();
                this.getNotesNotifications();
            }, err => {

            }
        );

  }

  declineFriend(notificationFriend: any){
    this.http.get('https://pr0jectzer0.ml/api/friend/'+notificationFriend.id+'/decline?token=' + this.token)
        .subscribe(
            data => {
              this.toast("Freundschaftsanfrage abgelehnt");
              this.getFriendNotifications();
              this.getGroupNotifications();
              this.getNotesNotifications();
            }, err => {

            }
        );
  }

  acceptGroup(notificationGroup: any){
    this.http.get('https://pr0jectzer0.ml/api/group/'+notificationGroup.id+'/accept/?token=' + this.token)
        .subscribe(
            data => {
              this.toast("Gruppenanfrage angenommen");
              this.getFriendNotifications();
              this.getGroupNotifications();
              this.getNotesNotifications();
            }, err => {

            }
        );
  }

  declineGroup(notificationGroup: any){
    this.http.get('https://pr0jectzer0.ml/api/group/'+notificationGroup.id+'/decline/?token=' + this.token)
        .subscribe(
            data => {
              this.toast("Gruppenanfrage abgelehnt");
              this.getFriendNotifications();
              this.getGroupNotifications();
              this.getNotesNotifications();
            }, err => {

            }
        );
  }

  acceptNote(notificationNote: any){
    this.http.get('https://pr0jectzer0.ml/api/note/'+notificationNote.id+'/accept/?token=' + this.token)
        .subscribe(
            data => {
              this.toast("Gruppenanfrage abgelehnt");
              this.getFriendNotifications();
              this.getGroupNotifications();
              this.getNotesNotifications();
            }, err => {

            }
        );
  }

  declineNote(notificationNote: any){
    this.http.get('https://pr0jectzer0.ml/api/note/'+notificationNote.id+'/decline/?token=' + this.token)
        .subscribe(
            data => {
              this.toast("Gruppenanfrage abgelehnt");
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
