import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TransferRecordPage } from './transfer-record.page';
import { ShareModule } from 'src/shared/share.module';

const routes: Routes = [
  {
    path: '',
    component: TransferRecordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TransferRecordPage]
})
export class TransferRecordPageModule {}
