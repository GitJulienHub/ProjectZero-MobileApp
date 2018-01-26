import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AddNoteModalPage } from '../add-note-modal/add-note-modal';
import { ShowNoteModalPage } from '../show-note-modal/show-note-modal';
/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.

 TODO: Modal page erstellen; Constructor

 */

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage implements OnInit{
  token: string;
  notes: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public modalCtrl: ModalController) {
    this.token = this.navParams.get('token');
    this.getNotes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes(){
    this.http.get("https://pr0jectzer0.ml/api/notes?token="+this.token)
        .subscribe(
            data => {
              this.notes = [];
              for(var i in (data as any).notes){
                this.notes.push((data as any).notes[i]);
              }
            }, err => {

            }
        );
  }

  addNoteModal(){
    let noteModal = this.modalCtrl.create(AddNoteModalPage, {'token': this.token});
    noteModal.onDidDismiss(() => {this.getNotes();});
    noteModal.present();
  }

  showNoteModal(note: any){
    let showNoteModal = this.modalCtrl.create(ShowNoteModalPage, {'token': this.token, 'note': note});
    showNoteModal.onDidDismiss(() => {this.getNotes();});
    showNoteModal.present();
  }

}
