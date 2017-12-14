import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WillkommenPage } from './willkommen';

@NgModule({
  declarations: [
    WillkommenPage,
  ],
  imports: [
    IonicPageModule.forChild(WillkommenPage),
  ],
})
export class WillkommenPageModule {}
