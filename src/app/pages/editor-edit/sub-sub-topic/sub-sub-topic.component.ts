import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { BookPageCreateService } from 'src/app/shared/book-page-create.service';
import { ToastrService } from 'ngx-toastr';
import { SubtopicService } from 'src/app/shared/subtopic.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sub-sub-topic',
  templateUrl: './sub-sub-topic.component.html',
  styleUrls: ['./sub-sub-topic.component.scss']
})
export class SubSubTopicComponent implements OnInit {
  mySubForm: FormGroup;
  sub_sub_topic_id: number;
  id: number;
  submitRes = false;
  expression:string;

  selectedsubback: string;
  selectedsubbtn: null;

  apiResSp = false;
  forShow = false;
  addHide = true;

  texts = [
    { value: 1, viewValue: 'Yes' },
    { value: 0, viewValue: 'No' },
  ];

  arr: FormArray;
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

  types = [
    { value: 'is_text', viewValue: 'Text' },
    { value: 'is_timeline', viewValue: 'TimeLine' },
    // { value: 'is_graphp', viewValue: 'Graph' },
    { value: 'is_pichart', viewValue: 'Pie Chart' },
    // { value: 'is_column', viewValue: 'Column' },
    { value: 'is_website', viewValue: 'Web' }
  ];

  snapid = +this._route.snapshot.paramMap.get('id');

  constructor(private fb: FormBuilder, private _route: ActivatedRoute, private userService: UserService,
    private service: BookPageCreateService, private toastr: ToastrService,
    private route: Router,
    private subtopicService: SubtopicService, private _location: Location) { }

  ngOnInit() {
    this.id = +this._route.snapshot.paramMap.get('id');
    if (+this.id) {
      this.mySubForm = this.fb.group({
        sub_topic_id: +this.id,
        heading: '',
        sub_heading: '',
        html_content: '',
        ar_url: '',
        web_url: '',
        bg_image: '',
        btn_image: '',
        color_code: '#',
        show_button_text: 0,
        type: '',
        sub_sub_topic_files: this.fb.array([
          this.addImgurl(),
        ])
      })
    }
  }


  get invoiceparticularsArray(): FormArray {
    return this.mySubForm.get('sub_sub_topic_files') as FormArray;
  }
  deleteInvoiceParticulars(i) {
    console.log(i);
    this.invoiceparticularsArray.removeAt(i);

  }

  addImgurl(): FormGroup {
    return this.fb.group({
      url: null,
      mime_type:null,
    })
  }



  get Subaliases() {
    return this.mySubForm.get('sub_sub_topic_files') as FormArray;
  }


  get players(): FormGroup {
    return this.fb.group({
      url: [],
      mime_type: [],
    });
  }

  addsubPlayer() {
    this.arr = this.mySubForm.get('sub_sub_topic_files') as FormArray;
    this.arr.push(this.addImgurl());
  }

  addItem() {
    this.forShow = true;
    this.addHide = false;
  }

  addReset() {
    this.mySubForm.controls['sub_sub_topic_files'].reset();
  }
  backClicked() {
    this._location.back();
    this.userService.setChap(1)
  }

  onSubSubClick() {
    this.apiResSp = true;
    console.log(this.mySubForm.value)
    this.service.createSubSubTopic(this.mySubForm.value).subscribe(
      res => {
        console.log(res)
        this.submitRes = true;
        res.data.forEach(element =>
          this.sub_sub_topic_id = +element.id);
        if (res.status === 1) {
          this.apiResSp = false;
          this.forShow = false;
          this.addHide = true;
          this.selectedsubback = null;
          this.selectedsubbtn = null;
          this.toastr.success('Submitted successfully', 'Sub-sub-Topic has been submitted');
          this.route.navigate(['home/books/Sub-Sub-topic/', this.snapid])
          // this.mySubForm.setValue({
          //   sub_topic_id: +this.id,
          //   heading: '',
          //   sub_heading: '',
          //   html_content: '',
          //   ar_url: '',
          //   bg_image: '',
          //   btn_image: '',
          //   color_code: '',
          //   show_button_text:0,
          //   type: '',
          //   sub_sub_topic_files: this.fb.array([
          //     this.addReset(),
          //   ])
          // })
        } else {
          return;
        }
      },
      err => console.log(err)
    )
  }

}
