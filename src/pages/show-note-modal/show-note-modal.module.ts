import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowNoteModalPage } from './show-note-modal';

@NgModule({
  declarations: [
    ShowNoteModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowNoteModalPage),
  ],
})
export class ShowNoteModalPageModule {}
