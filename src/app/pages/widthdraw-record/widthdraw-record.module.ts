import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WidthdrawRecordPage } from './widthdraw-record.page';
import { ShareModule } from 'src/shared/share.module';


const routes: Routes = [
    {
        path: '',
        component: WidthdrawRecordPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ShareModule
    ],
    declarations: [WidthdrawRecordPage]
})
export class WidthdrawRecordPageModule { }
