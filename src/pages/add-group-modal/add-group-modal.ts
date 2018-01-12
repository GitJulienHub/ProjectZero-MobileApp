import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular'
import { ImagePicker } from '@ionic-native/image-picker';
import { HttpClient } from '@angular/common/http';



/**
 * Generated class for the AddGroupModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-group-modal',
  templateUrl: 'add-group-modal.html',
})
export class AddGroupModalPage {

  options: ImagePickerOptions;
  token: any;

  @ViewChild('groupname') groupname;
  @ViewChild('groupdesc') groupdesc;

  constructor(public navCtrl: NavController, public navParams: NavParams, private imagePicker: ImagePicker, private toastCtrl: ToastController, public http: HttpClient) {
    this.token = this.navParams.get('token');
    console.log('UserId', navParams.get('userId'));
  }

  sendGroupData(){
    this.http.post('https://pr0jectzer0.ml/api/group?token=' + this.token, {'name': this.groupname.value, 'beschreibung': this.groupdesc.value})
        .subscribe(
            data => {
              this.groupAdded();
            }, err => {
              this.groupNotAdded();
            }
        );
    this.closeModal();
  }

  groupAdded() {
  let toast = this.toastCtrl.create({
    message: 'Gruppe wurde hinzugefügt.',
    duration: 3000,
    position: 'top'
  });
  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

groupNotAdded() {
let toast = this.toastCtrl.create({
  message: 'Gruppe konnte nicht hinzugefügt werden. :wink:',
  duration: 3000,
  position: 'top'
});
toast.onDidDismiss(() => {
  console.log('Dismissed toast');
});

toast.present();
}

//   private openGallery (): void {
//   let options = {
//     maximumImagesCount: 1,
//     width: 500,
//     height: 500,
//     quality: 75
//   }
//
//   ImagePicker.getPictures(options).then(
//     file_uris => this.navCtrl.push(AddGroupModalPage, {images: file_uris}),
//     err => console.log('uh oh')
//   );
// }

  closeModal(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGroupModalPage');
  }

}
