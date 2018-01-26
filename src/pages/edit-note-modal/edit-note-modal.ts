import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the EditNoteModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-note-modal',
  templateUrl: 'edit-note-modal.html',
})
export class EditNoteModalPage {
  token: string;
  title: string;
  text: string;
  noteInfo: any;

  @ViewChild('note') note: ElementRef;
  @ViewChild('noteName') noteName;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private toastCtrl: ToastController, public http: HttpClient) {
    this.token = navParams.get('token');
    this.noteInfo = navParams.get('note');
    this.title = this.noteInfo.titel;
    this.text = this.noteInfo.text;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditNoteModalPage');
  }


  updateNote(){
    this.http.put('https://pr0jectzer0.ml/api/note/'+this.noteInfo.id+'?token=' + this.token, {'titel': this.noteName.value, 'text': this.note.nativeElement.value})
        .subscribe(
            data => {
              this.toast('Notiz wurde aktualisiert!');
            }, err => {
              this.toast('Notiz konnte nicht aktualisiert werden!');
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

  resize() {
    this.note.nativeElement.style.height = this.note.nativeElement.scrollHeight + 'px';
  }

}
