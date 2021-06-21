import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'ng2-file-upload';
import { NgScrollbarModule } from 'ngx-scrollbar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    FileUploadModule,
    NgScrollbarModule
  ],
  exports: [
    ToastrModule,
    FileUploadModule,
    NgScrollbarModule
  ]
})
export class SharedModule { }
