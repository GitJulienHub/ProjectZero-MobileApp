import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoteMemberModalPage } from './note-member-modal';

@NgModule({
  declarations: [
    NoteMemberModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NoteMemberModalPage),
  ],
})
export class NoteMemberModalPageModule {}
