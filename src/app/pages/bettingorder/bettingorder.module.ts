import { NgModule } from '@angular/core';
import { BettingorderComponent } from './bettingorder.component';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from '../../../shared/share.module';
import { LotteryChooesComponent } from './lottery-chooes/lottery-chooes.component';
import { LotteryNumberComponent } from './lottery-number/lottery-number.component';
import { GameSelectComponent } from './game-select/game-select.component';
import { LotteryService } from 'src/services/lottery.service';
import { MoreMenuComponent } from './more-menu/more-menu.component';

const routes: Routes = [
    { path: '', component: BettingorderComponent }
];
@NgModule({
    imports: [
        ShareModule,
        RouterModule.forChild(routes)
    ],
    providers: [LotteryService],
    declarations: [
        BettingorderComponent,
        LotteryChooesComponent,
        LotteryNumberComponent,
        GameSelectComponent,
        MoreMenuComponent],
    entryComponents: [GameSelectComponent, MoreMenuComponent]
})
export class BettingorderModule { }
