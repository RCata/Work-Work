import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MomentService } from 'shared/moment/moment.service';

@NgModule({
    imports: [CommonModule, RouterModule],
    // export and declare components you want to use in other modules
    exports: [],
    declarations: [],
    providers: [MomentService],
    entryComponents: [],
})
export class SharedModule {}
