import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the AddNoteModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-note-modal',
  templateUrl: 'add-note-modal.html',
})

export class AddNoteModalPage {
  token: string;

  @ViewChild('note') note: ElementRef;
  @ViewChild('noteName') noteName;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private toastCtrl: ToastController) {
    this.token = navParams.get('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNoteModalPage');
  }

  addNote(){
    this.http.post('https://pr0jectzer0.ml/api/note?token=' + this.token, {'titel': this.noteName.value, 'text': this.note.nativeElement.value})
        .subscribe(
            data => {
              this.toast('Notiz erstellt!');
            }, err => {
              this.toast('Notiz konnte nicht erstellt werden!');
            }
        );
    this.closeModal();
  }

  toast(msg : any ) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'top'
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
