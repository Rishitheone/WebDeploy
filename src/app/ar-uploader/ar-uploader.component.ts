import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageUploadService } from '../shared/image-upload.service';
import { ExploreBrowseService } from '../shared/explore-browse.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ar-uploader',
  templateUrl: './ar-uploader.component.html',
  styleUrls: ['./ar-uploader.component.scss']
})
export class ArUploaderComponent implements OnInit {

  form: FormGroup;
  ARurl:string;
  fileUploads = { status: '', message: '', filePath: '' };

  constructor(private seriesService: BookService,
    private fb: FormBuilder, private imageUpload: ImageUploadService,
    private explore: ExploreBrowseService,
    private _http: HttpClient, private toastr: ToastrService, private route: Router,
    private _route: ActivatedRoute) { }

  ngOnInit() {

    this.form = this.fb.group({
      file: [''],
    })

  }

  onARSelect(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        // this.pictureUrl = reader.result;
        this.form.get('file').setValue(file);
      }
    }

  }

  onSubmitAR() {
    const formData = new FormData();
    formData.append('file', this.form.get('file').value)
    this.imageUpload.uploadeAR(formData).subscribe(
      data => {
        // this.toastr.success('Submitted successfully', 'AR has been submitted');
        this.ARurl = data.data;
        this.fileUploads = data;
        console.log(data)
      },
      err => console.log(err)
    );
    console.log(this.form.value)
  }

}
