import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { EditNoteModalPage } from '../edit-note-modal/edit-note-modal';
import { NoteMemberModalPage } from '../note-member-modal/note-member-modal';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ShowNoteModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-note-modal',
  templateUrl: 'show-note-modal.html',
})
export class ShowNoteModalPage {
  note: any;
  title: string;
  noteval: string;
  token: string;
  id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController, public http: HttpClient, private toastCtrl: ToastController) {
    this.token = navParams.get('token');
    this.note = navParams.get('note');
    this.title = this.note.titel;
    this.noteval = this.note.text;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowNoteModalPage');
  }

  getNoteById(){
    this.http.get('https://pr0jectzer0.ml/api/note/'+this.note.id+'?token='+this.token)
        .subscribe(
            data => {
              this.title = (data as any).note.titel;
              this.noteval = (data as any).note.text;
            }, err => {

            }
        );
  }

  editNoteModal(){
    let editNoteModal = this.modalCtrl.create(EditNoteModalPage, {'token': this.token, 'note': this.note});
    editNoteModal.onDidDismiss(() => {this.getNoteById();});
    editNoteModal.present();
  }

  noteMemberModal(){
    let noteMemberModal = this.modalCtrl.create(NoteMemberModalPage, {'token': this.token, 'note': this.note});
    noteMemberModal.present();
  }

  deleteNote(){
    let prompt = this.alertCtrl.create({
          title: 'Notiz löschen',
          message: "Wollen sie diese Notiz wirklich löschen?",
          buttons: [
            {
              text: 'No',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Yes',
              handler: data => {
                this.http.delete('https://pr0jectzer0.ml/api/note/'+this.note.id+'?token=' + this.token)
                    .subscribe(
                        data => {
                          this.toast('Notiz wurde gelöscht.');
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

  closeModal(){
    this.navCtrl.pop();
  }

  toast(msg : any ) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bot'
    });
    toast.present();
  }

  resize() {
    this.note.nativeElement.style.height = this.note.nativeElement.scrollHeight + 'px';
  }

}
