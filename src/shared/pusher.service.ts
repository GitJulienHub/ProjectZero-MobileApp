import { Injectable } from '@angular/core';
import { AuthService } from '../pages/auth.service';

declare const Pusher: any;

@Injectable()
export class PusherService {
  pusher: any;

  constructor(private auth: AuthService) {
    this.pusher = new Pusher('60b89a1e182fd4635842', {
      cluster: 'eu',
      encrypted: true,
      authEndpoint: 'https://pr0jectzer0.ml/broadcasting/auth',
      host: 'https://pr0jectzer0.ml',
      auth: {
        headers: {
          'Authorization': 'Bearer ' + this.auth.getToken()
        }
      }
    });
  }

}
