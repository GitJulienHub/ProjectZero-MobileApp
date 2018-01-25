
import {Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.authService.error.subscribe((err: string) => {
      this.error = err;
      console.log("Error: ", this.error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signInUser() {
    console.log('Signing in as ', this.user.value);
    const email = this.user.value;
    const password =this.password.value;
    this.authService.signinUser(email, '12345678');//("shut@yourmouth.pls","12345678");//("testb@b.de", "12345678");//(email, password);


    if(this.authService.isAuthenticated() == true){
      this.toast("Signing in");
        this.navCtrl.push(WillkommenPage,{'auth' : this.authService});
        console.log(this.authService.isAuthenticated());
        console.log(this.authService.getToken());
    }else{
      this.toast("Log in Failed");
      console.log("Log in Failed");
    }


  }

  toast(msg: any) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bot'
  });
  toast.present();
}

}
