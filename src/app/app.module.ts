import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { WillkommenPage } from '../pages/willkommen/willkommen';


import { AuthService } from '../pages/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FriendlistPage } from "../pages/friendlist/friendlist";
import { ChatroomPage } from "../pages/chatroom/chatroom";
import { PusherService } from '../shared/pusher.service';
import { AddGroupModalPage } from '../pages/add-group-modal/add-group-modal'
import { NotesPage } from '../pages/notes/notes'
import { NotificationsPage } from '../pages/notifications/notifications'
import { GroupModalPage } from '../pages/group-modal/group-modal'
import { AddNoteModalPage } from '../pages/add-note-modal/add-note-modal'
import { EditNoteModalPage } from '../pages/edit-note-modal/edit-note-modal'
import { ShowNoteModalPage } from '../pages/show-note-modal/show-note-modal'
import { NoteMemberModalPage } from '../pages/note-member-modal/note-member-modal';
import { GroupsPage } from '../pages/groups/groups'

@NgModule({
  declarations: [
    MyApp,
    NotificationsPage,
    EditNoteModalPage,
    ShowNoteModalPage,
    NoteMemberModalPage,
    GroupsPage,
    NotesPage,
    GroupModalPage,
    AddNoteModalPage,
    ChatroomPage,
    AddGroupModalPage,
    HomePage,
    LoginPage,
    RegisterPage,
    FriendlistPage,
    WillkommenPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddNoteModalPage,
    EditNoteModalPage,
    NoteMemberModalPage,
    ShowNoteModalPage,
    GroupsPage,
    ChatroomPage,
    NotesPage,
    GroupModalPage,
    NotificationsPage,
    AddGroupModalPage,
    HomePage,
    LoginPage,
    RegisterPage,
    FriendlistPage,
    WillkommenPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    PusherService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
