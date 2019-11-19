import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { NoMsgComponent } from 'src/app/no-msg/no-msg.component';
import { SearchBarComponent } from 'src/app/search-bar/search-bar.component';
import { BaseRecordmainComponent } from 'src/app/base-recordmain/base-recordmain.component';
import { CopyDirective } from './copy.diretive';
import { BaseSegmentComponent } from 'src/app/base-segment/base-segment.component';

@NgModule({
    declarations: [
        NoMsgComponent,
        SearchBarComponent,
        BaseRecordmainComponent,
        BaseSegmentComponent,
        CopyDirective

    ],
    entryComponents: [],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule],
    providers: [],
    exports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ComponentsModule,
        NoMsgComponent,
        SearchBarComponent,
        BaseRecordmainComponent,
        BaseSegmentComponent,
        CopyDirective

    ]
})
export class ShareModule { }
