import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule
  ],
  exports: [
    MatIconModule,
    MatDialogModule,
    MatTabsModule
  ]
})
export class MaterialModule { }
