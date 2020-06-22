import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { BookPageCreateService } from 'src/app/shared/book-page-create.service';
import { ToastrService } from 'ngx-toastr';
import { ImageUploadService } from 'src/app/shared/image-upload.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-subtimeline',
  templateUrl: './subtimeline.component.html',
  styleUrls: ['./subtimeline.component.scss']
})
export class SubtimelineComponent implements OnInit {
  expression = false;
  id:number;
  formNumber = 0;
  arr: FormArray;
  mySubForm: FormGroup;
  mySubtimeForm: FormGroup;
  selectedsubback: string;
  selectedsubbtn: string
  sub_timeLine_id: number;
  sub_topic_id = null;
  for_timrline_id = null;
  foods = [
    { value: 1, viewValue: 'Yes' },
    { value: 0, viewValue: 'No' },
  ];
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
    private route: Router, private imageUpload: ImageUploadService,private _location: Location) { }

  ngOnInit() {
    this.id = +this._route.snapshot.paramMap.get('id');
    if (+this.id) {
      this.mySubtimeForm = this.fb.group({
        arr: this.fb.array([this.createItem()])
      })
    }

  }

  addItem() {
    this.arr = this.mySubtimeForm.get('arr') as FormArray;
    this.arr.push(this.createItem());
    this.formNumber = this.formNumber +=1
  }
  createItem() {
    return this.fb.group({
      sub_sub_topic_id: [+this.id],
      heading: [],
      sub_heading: [],
      description: [],
      year: [],
      date: [],
      time: [],
      mime_type: [],
      url: [],
      ar_model: [],
    })
  }
  deleteInvoiceParticulars(i) {
    console.log(i);
    this.invoiceparticularsArray.removeAt(i);
    this.formNumber = this.formNumber -=1
  }
  get invoiceparticularsArray(): FormArray {
    return this.mySubtimeForm.get('arr') as FormArray;
  }
  backClicked() {
    this._location.back();
    this.userService.setChap(1)
  }

  onAllsaveform() {
    var i;
    for (i = 0; i <= this.formNumber; i++) {
      this.ontimeLineContent(i)
      this.toastr.success('Submitted successfully', 'Sub-Sub-timeline has been submitted');
    }
    if (this.formNumber = i) {
      setTimeout(() => {
        this.route.navigate(['home/topic/sub-sub-topic/timeline/list/', this.id])
        this.userService.setChap(1)
      }, 2000);
    } else {
      return;
    }
  }
  ontimeLineContent(index) {
    var my_array = this.mySubtimeForm.value.arr;
    const data = JSON.stringify(my_array[index])
    console.log(data)
    this.service.createsubTimeline(data).subscribe(
      res => console.log("Submit"),
      err => console.log(err)
    )
  }

}
