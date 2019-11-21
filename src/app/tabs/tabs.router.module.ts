import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../home/home.module').then(
                                m => m.HomePageModule
                            )
                    }
                ]
            },
            {
                path: 'trend',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../trend/trend.module').then(
                                m => m.TrendPageModule
                            )
                    }
                ]
            },
            {
                path: 'add',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../add/add.module').then(
                                m => m.AddPageModule
                            )
                    }
                ]
            },
            {
                path: 'notice',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../notice/notice.module').then(
                                m => m.NoticePageModule
                            )
                    }
                ]
            },
            {
                path: 'personal',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../personal/personal.module').then(
                                m => m.PersonalPageModule
                            )
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
