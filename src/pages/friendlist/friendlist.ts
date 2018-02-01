import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ChatroomPage } from '../chatroom/chatroom';
import { AddGroupModalPage } from '../add-group-modal/add-group-modal'
import { GroupModalPage } from '../group-modal/group-modal'
/**
 * Generated class for the FriendlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friendlist',
  templateUrl: 'friendlist.html',
})
export class FriendlistPage implements OnInit{
  friendlist: string;
  name: string;
  friends: any;
  userid: any;
  groups: any;
  error: string = null;
  token: any;

  id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: HttpClient, private toastCtrl: ToastController, public modalCtrl: ModalController) {
    this.token = this.navParams.get('token');
    localStorage.setItem('token', this.token);

    this.friendlist="Friends";
    this.getFriends();
    this.getGroups();
    this.getUserId();
  }

  ngOnInit() {

  }

  getUserId(){
    this.http.get("https://pr0jectzer0.ml/api/user?token="+this.token)
        .subscribe(
            data => {
              this.userid=(data as any).user.id;
            }, err => {
              console.log("ID konnte nicht ermittelt werden. (getUserId())");
            }
        );
  }

  getFriends(){
    this.http.get("https://pr0jectzer0.ml/api/friends?token="+this.token)
        .subscribe(
            data => {
              this.friends = [];
              for(var i in (data as any).friends){

                this.friends.push((data as any).friends[i].friend_user);
              }
            }, err => {

            }
        );
  }


  getGroups(){
    this.http.get("https://pr0jectzer0.ml/api/user/groups?token="+this.token)
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendlistPage');
  }

  addFriend(id: string){
    if(id == this.userid){
      this.toast("Nicht möglich");
      return;
    }
    for(var i in this.friends){
      if(id == this.friends[i].id){
        this.toast("Nicht möglich");
        return;
      }
    }
    this.http.post('https://pr0jectzer0.ml/api/friend/add?token=' + this.token, {'id': id})
        .subscribe(
            data => {
              this.getFriends();
              this.toast('Freundschaftsanfrage verschickt');
            }, err => {

            }
        );

  }

  openChat(id: any){
        this.navCtrl.push(ChatroomPage,{'token' : this.token,'user': id});
  }

  deleteFriend(id: any){
      this.http.delete('https://pr0jectzer0.ml/api/friend/remove/'+id+'?token=' + this.token)
          .subscribe(
              data => {
                this.getFriends();
                this.toast('Freund wurde entfernt.');
                return;
              }, err => {
                return;
              }
      );
  }

  showGroup(group: any){
    this.getFriends();
    let groupModal = this.modalCtrl.create(GroupModalPage, {'token': this.token, 'group': group, 'friends': this.friends});
    groupModal.onDidDismiss(() => {this.getGroups();});
    groupModal.present();
  }

  leaveGroup(group: any){
    let prompt = this.alertCtrl.create({
          title: 'Aus Gruppe Austreten',
          message: "Wollen sie die Gruppe "+group.name+" wirklich Verlassen?",
          buttons: [
            {
              text: 'Nein',
              handler: data => {
              }
            },
            {
              text: 'Ja',
              handler: data => {
                this.http.post('https://pr0jectzer0.ml/api/group/'+group.id+'/remove_user?token=' + this.token, {'id': this.userid})
                    .subscribe(
                        data => {
                          this.getGroups();
                          this.toast('Erfolgreich ausgetreten!');
                        }, err => {
                          this.toast('Austreten nicht möglich!');
                        }
                );
              }
            }
          ]
        });
        prompt.present();
  }

  getId(username: string){
    return new Promise(resolve => {
      this.http.get("https://pr0jectzer0.ml/api/users?token="+this.token)
          .subscribe(
              data => {
                for(var i in (data as any).users){
                    if(username==(data as any).users[i].name){
                      this.id=((data as any).users[i].id);
                      resolve(this.id);
                      return;
                    }
                  }
                  this.toast("Diesen Benutzer gibt es nicht.");
              }, err => {
                  return;
              }
          );
     });
  }

  getGroupId(groupname: string){
    return new Promise(resolve => {
      this.http.get("https://pr0jectzer0.ml/api/groups?token="+this.token)
          .subscribe(
              data => {
                for(var i in (data as any).groups){
                    if(groupname==(data as any).groups[i].name){
                      this.id=((data as any).groups[i].id);
                      resolve(this.id);
                      return;
                    }
                  }
                  this.toast("Diese Gruppe gibt es nicht.");

              }, err => {
                  console.log("getID error getGroupId()");
                  return;
              }
          );
     });
  }



  addFriendPrompt(){
    let prompt = this.alertCtrl.create({
          title: 'Freundschaft Anfragen',
          message: "Geben sie den Namen ihres Freundes ein.",
          inputs: [
            {
              name: 'name',
              placeholder: 'Name'
            },
          ],
          buttons: [
            {
              text: 'Abbrechen',
              handler: data => {
              }
            },
            {
              text: 'Abschicken',
              handler: data => {
                this.name = data.name;
                this.getId(data.name)
                .then(data => {
                  this.addFriend(this.id);
                });
              }
            }
          ]
        });
        prompt.present();
  }

  addGroupModal(){

   let addGroupModal = this.modalCtrl.create(AddGroupModalPage, {'token': this.token});
   addGroupModal.onDidDismiss(() =>{this.getGroups();});
   addGroupModal.present();
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
