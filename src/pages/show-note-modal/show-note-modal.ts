import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.note = navParams.get('note');
    console.log("note log: ", this.note.titel);
    this.title = this.note.titel;
    this.noteval = this.note.text;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowNoteModalPage');
  }

  closeModal(){
    this.navCtrl.pop();
  }

  resize() {
    this.note.nativeElement.style.height = this.note.nativeElement.scrollHeight + 'px';
  }

}
