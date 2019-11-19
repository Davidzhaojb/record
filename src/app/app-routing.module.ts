import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'signin',
        loadChildren: () =>
            import('./pages/signin/signin.module').then(m => m.SigninPageModule)
    },
    {
        path: 'domains',
        loadChildren: () =>
            import('./pages/domains/domains.module').then(
                m => m.DomainsPageModule
            )
    },
    { path: 'bettingorder', loadChildren: () => import('./pages/bettingorder/bettingorder.module').then(m => m.BettingorderModule) },
    { path: 'personal', loadChildren: './personal/personal.module#PersonalPageModule' },
    { path: 'protocol', loadChildren: './pages/protocol/protocol.module#ProtocolPageModule' },
    { path: 'notice-detail', loadChildren: './pages/notice-detail/notice-detail.module#NoticeDetailPageModule' },
    { path: 'home-hotlottery', loadChildren: './pages/home-hotlottery/home-hotlottery.module#HomeHotlotteryPageModule' },
    { path: 'trend-detail', loadChildren: './pages/trend-detail/trend-detail.module#TrendDetailPageModule' },
    { path: 'lottery-select', loadChildren: './pages/lottery-select/lottery-select.module#LotterySelectPageModule' },
    { path: 'im', loadChildren: './pages/im/im.module#ImPageModule' },
    { path: 'chat-details', loadChildren: './pages/im/chat-details/chat-details.module#ChatDetailsPageModule' },
    { path: 'friend-list', loadChildren: './pages/im/friend-list/friend-list.module#FriendListPageModule' },
    { path: 'message-group', loadChildren: './pages/im/message-group/message-group.module#MessageGroupPageModule' },
    { path: 'transfer', loadChildren: './pages/transfer/transfer.module#TransferPageModule' },
    { path: 'withdraw', loadChildren: './pages/withdraw/withdraw.module#WithdrawPageModule' },
    { path: 'widthdraw-record', loadChildren: './pages/widthdraw-record/widthdraw-record.module#WidthdrawRecordPageModule' },
    { path: 'transfer-record', loadChildren: './pages/transfer-record/transfer-record.module#TransferRecordPageModule' },
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
