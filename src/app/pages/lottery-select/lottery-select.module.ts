import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LotterySelectPage } from './lottery-select.page';

const routes: Routes = [
  {
    path: '',
    component: LotterySelectPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LotterySelectPage]
})
export class LotterySelectPageModule {}
