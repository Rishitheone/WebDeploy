import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { BookPageCreateService } from 'src/app/shared/book-page-create.service';
import { ToastrService } from 'ngx-toastr';
import { ImageUploadService } from 'src/app/shared/image-upload.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sub-web',
  templateUrl: './sub-web.component.html',
  styleUrls: ['./sub-web.component.scss']
})
export class SubWebComponent implements OnInit {

  mySubForm: FormGroup;
  selectedsubback: string;
  selectedsubbtn: string;
  apiResSp = false;
  arr: FormArray;
  id: number;
  formNumber = 0;
  config: any = {
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['style', ['style']],
      ['misc', ['codeview', 'undo', 'redo']],
      ['font', ['bold', 'italic', 'underline', 'clear']],
      // ['fontsize', ['fontname', 'fontsize']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
      ['customButtons', ['testBtn']]
    ],
  };

  constructor(private fb: FormBuilder, private _route: ActivatedRoute, private userService: UserService,
    private service: BookPageCreateService, private toastr: ToastrService,
    private route: Router, private imageUpload: ImageUploadService, private _location: Location) { }

  ngOnInit() {

    this.id = +this._route.snapshot.paramMap.get('id');
    this.mySubForm = this.fb.group({
      arr: this.fb.array([this.createItem()])
    })
  }

  createItem() {
    return this.fb.group({
      sub_topic_id: [+this.id],
      heading: [],
      sub_heading: [],
      description: [],
      url: [],
    })
  }
  addItem() {
    this.arr = this.mySubForm.get('arr') as FormArray;
    this.arr.push(this.createItem());
    this.formNumber = this.formNumber += 1
  }
  deleteInvoiceParticulars(i) {
    this.formNumber = this.formNumber -= 1
    console.log(i);
    this.invoiceparticularsArray.removeAt(i);
  }
  get invoiceparticularsArray(): FormArray {
    return this.mySubForm.get('arr') as FormArray;
  }

  backClicked() {
    this._location.back();
    this.userService.setChap(1)
  }

  // resetForm(){
  //   this.mySubForm.setValue({
  //     sub_topic_id: +this.id,
  //     heading:'',
  //     sub_heading:'',
  //     description:'',
  //     color_code:'',
  //     numaric_value:'',
  //     mime_type:'',
  //     url:'',
  //     ar_url: '',
  //   })

  // }

  onAllsaveform() {
    var i;
    for (i = 0; i <= this.formNumber; i++) {
      this.onSubSubClick(i)
      this.toastr.success('Submitted successfully', 'Sub topic web has been submitted');
    }
    if (this.formNumber = i) {
      setTimeout(() => {
        this.route.navigate(['home/topic/sub-topic/Web/list/', this.id])
        this.userService.setChap(1)
      }, 2000);
    } else {
      return;
    }
  }


  onSubSubClick(index) {
    this.apiResSp = true;
    var my_array = this.mySubForm.value.arr;
    const data = JSON.stringify(my_array[index])
    console.log(data)
    this.service.createSubWeb(data).subscribe(
      res => {
        if (res.status === 1) {
          // this.toastr.success('Submitted successfully', 'Topic has been submitted');
          // this.resetForm();
          this.apiResSp = false;
        }
        console.log(res)
      },
      err => console.log(err)
    )
  }

}
