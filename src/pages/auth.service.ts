import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from "@angular/core";
import { tokenNotExpired } from "angular2-jwt";
import { Token } from "./token.model";
import { Subject } from "rxjs/Subject";

@Injectable()
export class AuthService implements OnInit {
    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.error = null;
    }
    //test123
    //t@t.de
    //hallo1234

    public signupUser(username: string, email: string, password: string) {
        this.http.post("https://pr0jectzer0.ml/api/user", {'name': username, 'password': password, 'email': email})
            .subscribe(
                data => {
                    this.signinUser(email, password);
                }, err => {
                    this.error.next(err.error.email);
                }
            );
    }

    public signinUser(email: string, password: string) {
        this.http.post<Token>("https://pr0jectzer0.ml/api/user/login", {'email': email, 'password': password})
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                },
                err => {
                    this.error.next(err.error.error);
                }
            );
    }

    public signOut() {
        localStorage.removeItem('token');
    }

    public getToken() {
        return localStorage.getItem('token');
    }

    public isAuthenticated() {
        const token = this.getToken();
        return tokenNotExpired(null, token);
    }
}

