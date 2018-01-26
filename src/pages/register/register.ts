import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthService} from '../auth.service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
    error: string;

    @ViewChild('username') user;
    @ViewChild('email') email;
    @ViewChild('password') password;
    @ViewChild('password2') password2;


    constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private toastCtrl: ToastController) {
    }

    ngOnInit() {
        this.authService.error.subscribe((err: string) => {
            this.error = err;
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    onSignup() {
      const username = this.user.value;
      const email = this.email.value;
      const password =this.password.value;
      const password2 =this.password2.value;
      if(password != password2){
        console.log('Password not matching ',password.length);
        this.toast('Passwort stimmen nicht überein');
        return;
      }else if(password.length < 8){
        console.log('Passwort zu kurz')
        this.toast('Passwort zu kurz');
      }

        this.authService.signupUser(username, email, password);
        this.toast('Erfolgreich registriert');
    }
    toast(msg : any ) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'bot'
      });
      toast.present();
    }


}
