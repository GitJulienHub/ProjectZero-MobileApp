import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGroupModalPage } from './add-group-modal';

@NgModule({
  declarations: [
    AddGroupModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddGroupModalPage),
  ],
})
export class AddGroupModalPageModule {}
