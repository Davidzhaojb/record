import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticePage } from './notice.page';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    QuillModule.forRoot({
        modules: {
          syntax: false
        }
      }),
    RouterModule.forChild([{ path: '', component: NoticePage }])
  ],
  declarations: [NoticePage]
})
export class NoticePageModule {}
