import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ShareModule } from 'src/shared/share.module';
import { QuillModule } from 'ngx-quill';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ShareModule,
        QuillModule.forRoot(),
        RouterModule.forChild([{ path: '', component: HomePage }])
    ],
    declarations: [HomePage],
    providers: []
})
export class HomePageModule { }
