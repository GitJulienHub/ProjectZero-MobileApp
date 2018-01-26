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
  userid: any;
  notificationsGroup: any;
  notificationsFriend: any;
  notificationsNote: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private toastCtrl: ToastController) {
    this.token = this.navParams.get('token');
    this.getFriendNotifications();
    this.getGroupNotifications();
    this.getNotesNotifications();
    this.getUserId();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  getUserId(){
    this.http.get('https://pr0jectzer0.ml/api/user?token=' + this.token)
        .subscribe(
            data => {
              this.userid = (data as any).user.id;
            }, err => {

            }
        );
  }

  getFriendNotifications(){
    return new Promise(resolve => {
      this.http.get("https://pr0jectzer0.ml/api/friend/requests?token="+this.token)
          .subscribe(
              data => {
                this.notificationsFriend = [];
                for(var i in (data as any).requests){
                  this.notificationsFriend.push((data as any).requests[i]);
                }
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
      this.http.get("https://pr0jectzer0.ml/api/user/groups/requests?token="+this.token)
          .subscribe(
              data => {
                this.notificationsGroup = [];
                for(var i in (data as any).groups){
                  if((data as any).groups[i].group != null){
                    this.notificationsGroup.push((data as any).groups[i].group);
                  }
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
    this.http.get('https://pr0jectzer0.ml/api/friend/'+notificationFriend.id+'/accept/?token=' + this.token)
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
    // Hardcoded IDS (1-47)
    this.http.get('https://pr0jectzer0.ml/api/user/group/'+notificationGroup.id+'/accept?token=' + this.token)
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
    this.http.get('https://pr0jectzer0.ml/api/user/group/'+notificationGroup.id+'/decline?token=' + this.token)
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
              this.toast("Notizanfrage angenommen");
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
              this.toast("Notizanfrage abgelehnt");
            }, err => {

            }
        );
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
