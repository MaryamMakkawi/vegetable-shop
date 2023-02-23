import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckOutRoutingModule } from './check-out-routing.module';
import { CheckOutComponent } from './check-out.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CheckOutComponent],
  imports: [CommonModule, CheckOutRoutingModule, SharedModule],
})
export class CheckOutModule {}
