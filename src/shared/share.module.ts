import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { CopyDirective } from './copy.diretive';
@NgModule({
    declarations: [
        CopyDirective

    ],
    entryComponents: [],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule,
    ],
    providers: [],
    exports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ComponentsModule,
        CopyDirective,
    ]
})
export class ShareModule { }
