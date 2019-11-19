import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { LotteryService } from 'src/services/lottery.service';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: '', component: HomePage }])
    ],
    declarations: [HomePage],
    providers: [LotteryService]
})
export class HomePageModule { }
