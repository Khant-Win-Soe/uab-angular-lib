import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UabLibComponent } from './uab-lib.component';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';
import { ButtonComponent } from './components/button/button.component';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { DropdownBoxComponent } from './components/dropdown-box/dropdown-box.component';
import { FileUploadPreviewComponent } from './components/file-upload-preview/file-upload-preview.component';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { NrcBoxComponent } from './components/nrc-box/nrc-box.component';
import { RadioBoxComponent } from './components/radio-box/radio-box.component';
import { VideoRecoderComponent } from './components/video-recoder/video-recoder.component';

@NgModule({
  declarations: [
    UabLibComponent,
    AlertBoxComponent,
    ButtonComponent,
    DataGridComponent,
    DropdownBoxComponent,
    FileUploadPreviewComponent,
    InputBoxComponent,
    NrcBoxComponent,
    RadioBoxComponent,
    VideoRecoderComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    UabLibComponent,
    AlertBoxComponent,
    ButtonComponent,
    DataGridComponent,
    DropdownBoxComponent,
    FileUploadPreviewComponent,
    InputBoxComponent,
    NrcBoxComponent,
    RadioBoxComponent,
    VideoRecoderComponent,
  ],
  bootstrap: [NrcBoxComponent],
})
export class UabLibModule {}
