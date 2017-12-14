import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
export class FriendlistPage {
  friendlist: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.friendlist="Friends";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendlistPage');
  }

}
