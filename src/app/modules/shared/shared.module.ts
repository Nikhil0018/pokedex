import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxSkeletonLoaderModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxSkeletonLoaderModule
  ]
})
export class SharedModule { }
