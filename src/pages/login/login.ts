
import {Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../auth.service';

import { WillkommenPage } from '../willkommen/willkommen';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{
  error: string = null;

  @ViewChild('username') user;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.error.subscribe((err: string) => {
      this.error = err;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signInUser() {
    console.log('Would sign in with ', this.user.value, this.password.value);
    const email = this.user.value;
    const password =this.password.value;
    this.authService.signinUser("w@w.de","12345678");//(email, password);


    if(this.authService.isAuthenticated() == true){
        this.navCtrl.push(WillkommenPage,{'auth' : this.authService});
    }

    console.log(this.authService.isAuthenticated());
    console.log(this.authService.getToken());
  }

}
