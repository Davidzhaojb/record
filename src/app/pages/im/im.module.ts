import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ImPage } from './im.page';
import { ShareModule } from 'src/shared/share.module';
const routes: Routes = [
    {
        path: '',
        component: ImPage
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
    declarations: [ImPage],
    exports: []
    // schemas: [
    //     CUSTOM_ELEMENTS_SCHEMA,
    //     NO_ERRORS_SCHEMA
    // ]
})
export class ImPageModule { }
