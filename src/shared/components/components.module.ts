import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackHeaderComponent } from './back/back-header';
import { BackIconComponent } from './back/back-icon';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        BackHeaderComponent,
        BackIconComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        IonicModule.forRoot(),
    ],
    exports: [
        BackHeaderComponent,
        BackIconComponent
    ],
    providers: [],

})
export class ComponentsModule { }
