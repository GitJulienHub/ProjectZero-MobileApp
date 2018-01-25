import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
  }

  ngOnInit() {

  }

  getNotes(){
    console.log(this.token);
    this.http.get("https://pr0jectzer0.ml/api/notes?token="+this.token)
        .subscribe(
            data => {
              this.notes = [];
              for(var i in (data as any).notes){
                this.notes.push((data as any).notes[i].name);
              }
              console.log(this.notes);
            }, err => {

            }
        );
  }

  addNoteModal(){

   let profileModal = this.modalCtrl.create(AddGroupModalPage, {'token': this.token});
   profileModal.present();
   this.getGroups();

  }

  editNote(note:string){

  }

}