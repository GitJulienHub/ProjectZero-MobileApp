import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditNoteModalPage } from './edit-note-modal';

@NgModule({
  declarations: [
    EditNoteModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditNoteModalPage),
  ],
})
export class EditNoteModalPageModule {}
