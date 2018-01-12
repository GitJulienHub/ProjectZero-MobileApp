import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Subject } from "rxjs/Subject";
import { ChatroomPage } from '../chatroom/chatroom';
import { AddGroupModalPage } from '../add-group-modal/add-group-modal'
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
  groups: any;
  error: string = null;
  token: any;

  id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: HttpClient, private toastCtrl: ToastController, public modalCtrl: ModalController) {
    this.friends = ['hoppöla'];
    this.groups = ['gitjulienhub'];
    this.token = this.navParams.get('token');
    console.log(this.token);

    localStorage.setItem('token', this.token);

    this.friendlist="Friends";
    this.getFriends();
    this.getGroups();
    console.log(this.friends);
  }

  ngOnInit() {

  }

  getFriends(){
    console.log(this.token);
    this.http.get("https://pr0jectzer0.ml/api/friends?token="+this.token)
        .subscribe(
            data => {
              this.friends = [];
              for(var i in (data as any).friends){
                this.friends.push((data as any).friends[i].name);
              }
              console.log(this.friends);
            }, err => {

            }
        );
  }

  getGroups(){
    console.log(this.token);
    this.http.get("https://pr0jectzer0.ml/api/groups?token="+this.token)
        .subscribe(
            data => {
              this.groups = [];
              console.log(data);
              for(var i in (data as any).groups){
                this.groups.push((data as any).groups[i].name);
                console.log((data as any).groups[i].name);
              }
              console.log(this.groups);
            }, err => {

            }
        );
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendlistPage');
  }

  addFriend(id: string){
    console.log("Hallo? ", id);
    this.http.post('https://pr0jectzer0.ml/api/friend/add?token=' + this.token, {'id': id})
        .subscribe(
            data => {
              this.getFriends();
              this.userWasAdded();
            }, err => {

            }
        );
    //this.friends.push(this.name);

  }
  openChat(username: string){
    this.getId(username)
      .then(data => {

        this.navCtrl.push(ChatroomPage,{'token' : this.token,'user': this.id});

      });
  }
  deleteFriend(id: string){
    console.log(this.id);
    this.getId(id)
    .then(data => {
      this.http.delete('https://pr0jectzer0.ml/api/friend/remove/'+this.id+'?token=' + this.token)
          .subscribe(
              data => {
                console.log("WE GOT SOME FKN DATA, FINALLY");
                this.getFriends();
                this.userWasDeleted();
                return;
              }, err => {
                console.log("THERE WAS AN ERRORR HELPPPPPPPPPPPPPPPPP");
                return;
              }
      );
    });
  }

  deleteGroup(id: string){
    console.log(this.id);
    this.getGroupId(id)
    .then(data => {
      this.http.delete('https://pr0jectzer0.ml/api/group/'+this.id+'?token=' + this.token)
          .subscribe(
              data => {
                console.log("WE GOT SOME FKN DATA, FINALLY");
                this.getGroups();
                this.groupWasDeleted();
                return;
              }, err => {
                console.log("THERE WAS AN ERRORR HELPPPPPPPPPPPPPPPPP");
                return;
              }
      );
    });
  }

  getId(username: string){
    console.log("getid: "+username);
    return new Promise(resolve => {
      this.http.get("https://pr0jectzer0.ml/api/users?token="+this.token)
          .subscribe(
              data => {
                for(var i in (data as any).users){
                    if(username==(data as any).users[i].name){
                      this.id=((data as any).users[i].id);
                      console.log("sollte geklappt haben, hm");
                      //this.hatgeklappt.next(true);
                      resolve(this.id);
                      return;
                    }
                  }
                  this.userNotFound();

              }, err => {
                  console.log("getID error, kek");
                  return;
              }
          );
     });
  }

  getGroupId(groupname: string){
    console.log("Gruppenname: "+groupname);
    return new Promise(resolve => {
      this.http.get("https://pr0jectzer0.ml/api/groups?token="+this.token)
          .subscribe(
              data => {
                for(var i in (data as any).groups){
                    if(groupname==(data as any).groups[i].name){
                      this.id=((data as any).groups[i].id);
                      console.log("sollte geklappt haben, hm");
                      //this.hatgeklappt.next(true);
                      resolve(this.id);
                      return;
                    }
                  }
                  this.groupNotFound();

              }, err => {
                  console.log("getID error, kek");
                  return;
              }
          );
     });
  }






  addFriendPrompt(){
    let prompt = this.alertCtrl.create({
          title: 'Freund hinzufügen',
          message: "Geben sie den Namen ihres Freundes ein.",
          inputs: [
            {
              name: 'name',
              placeholder: 'Name'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Hinzufügen',
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

   let profileModal = this.modalCtrl.create(AddGroupModalPage, {'token': this.token});
   profileModal.present();
   this.getGroups();

  }


  userNotFound() {
  let toast = this.toastCtrl.create({
    message: 'Diesen Benutzer gibt es nicht.',
    duration: 3000,
    position: 'top'
  });
  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

groupNotFound() {
let toast = this.toastCtrl.create({
  message: 'Diese Gruppe gibt es nicht.',
  duration: 3000,
  position: 'top'
});
toast.onDidDismiss(() => {
  console.log('Dismissed toast');
});

toast.present();
}

  userWasAdded() {
  let toast = this.toastCtrl.create({
    message: 'Benutzer wurde hinzugefügt.',
    duration: 3000,
    position: 'top'
  });
  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

  userWasDeleted() {
  let toast = this.toastCtrl.create({
    message: 'Benutzer wurde entfernt.',
    duration: 3000,
    position: 'top'
  });
  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

groupWasDeleted() {
let toast = this.toastCtrl.create({
  message: 'Gruppe wurde entfernt.',
  duration: 3000,
  position: 'top'
});
toast.onDidDismiss(() => {
  console.log('Dismissed toast');
});

toast.present();
}


}
