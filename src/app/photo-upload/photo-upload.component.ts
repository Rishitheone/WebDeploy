import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../shared/book.service';
import { ImageUploadService } from '../shared/image-upload.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GallaryComponent } from '../file-upload/gallary/gallary.component';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent implements OnInit {

  imageForm: FormGroup;
  imgtype:string;
  pictureUrl = null;
  fileUpload = { status: '', message: '', filePath: '' };
  imgRes = [];
  res:string;
  constructor(
    private seriesService: BookService,
    private fb: FormBuilder, private imageUpload: ImageUploadService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {

    this.imageForm = this.fb.group({
      type: ['',Validators.required],
      file: ['',Validators.required],
    })
  }

  onFileSelect(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.pictureUrl = reader.result;
        this.imageForm.get('file').setValue(file);
      }
    }
  }
  onSubmitImage() {
    const formData = new FormData();
    formData.append('file', this.imageForm.get('file').value)
    formData.append('type', this.imageForm.get('type').value)
    this.imageUpload.uploadeImage(formData).subscribe(
      data => {
        // this.toastr.success('Submitted successfully', 'Image has been submitted');
        this.imgRes = data.data;
        this.fileUpload = data;

        this.res = data.data;
      },
      err => console.log(err)
    );
    console.log(this.imageForm.value)
  }
  onViewImage(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.dialog.open(GallaryComponent, dialogConfig);
  }

}
