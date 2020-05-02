import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { BookPageCreateService } from 'src/app/shared/book-page-create.service';
import { ToastrService } from 'ngx-toastr';
import { SubtopicService } from 'src/app/shared/subtopic.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sub-topic',
  templateUrl: './sub-topic.component.html',
  styleUrls: ['./sub-topic.component.scss']
})
export class SubTopicComponent implements OnInit {

  myForm: FormGroup;
  arr: FormArray;
  id: number;
  sub_topic_id: number;
  selectedbtn: string;
  selectedback: string;
  isText = true;
  submitRes = false;

  apiResSp = false;
  forShow = false;
  addHide = true;
  expression:string;


  texts = [
    { value: 1, viewValue: 'Yes' },
    { value: 0, viewValue: 'No' },
  ];


  types = [
    { value: 'is_text', viewValue: 'Text' },
    { value: 'is_timeline', viewValue: 'TimeLine' },
    { value: 'is_graphp', viewValue: 'Graph' },
    { value: 'is_pichart', viewValue: 'Pie Chart' },
    { value: 'is_column', viewValue: 'Column' },
    { value: 'is_website', viewValue: 'Web' }
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

  constructor(private fb: FormBuilder, private _route: ActivatedRoute,private userService: UserService,
    private service: BookPageCreateService, private toastr: ToastrService, private _location: Location ) { }

  ngOnInit() {
    this.id = +this._route.snapshot.paramMap.get('id');
    if (+this.id) {
      this.myForm = this.fb.group({
        topic_id: +this.id,
        heading: '',
        sub_heading: '',
        html_content: '',
        ar_url: '',
        bg_image: '',
        btn_image: '',
        color_code: '',
        show_button_text:0,
        type: '',
        sub_topic_files: this.fb.array([
          this.addImgurl(),
        ])
      })
    }
  }
 
  someFunction(sub){
    var i;
    // if(sub == 'is_text'){
    //     this.addPlayer();
    // }else{
      for(i = 1;i<9;i++){
        this.deleteInvoiceParticulars(i);
      }
      
    // }
  }

  addPlayer() {
    this.arr = this.myForm.get('sub_topic_files') as FormArray;
    this.arr.push(this.addImgurl());
  }

  addImgurl(): FormGroup {
    return this.fb.group({
      url:null,
      mime_type:null,
    })
  }
  addReset(){
    this.myForm.controls['sub_topic_files'].reset();
  }
 
  get aliases() {
    return this.myForm.get('sub_topic_files') as FormArray;
  }
  deleteInvoiceParticulars(i) {
    console.log(i);
    this.invoiceparticularsArray.removeAt(i);
  }
  get invoiceparticularsArray(): FormArray {
    return this.myForm.get('sub_topic_files') as FormArray;
  }



  get players(): FormGroup {
    return this.fb.group({
      url: [],
      mime_type: [],
    });
  }

  addItem() {
    this.forShow = true;
    this.addHide = false;
 }
 backClicked() {
  this._location.back();
  this.userService.setChap(1)
}
 
  onClick() {
    this.apiResSp = true;
    console.log(this.myForm.value);
    const data = JSON.stringify(this.myForm.value)
    this.service.createSubTopic(data)
      .subscribe(
        res => {
          console.log(res)
          if (res.status === 1) {
            this.apiResSp = false;
            this.forShow = false;
            this.addHide = true;
            this.selectedbtn = null;
            this.selectedback = null;
            this.toastr.success('Submitted successfully', 'Sub-Topic has been submitted');
            this.myForm.setValue({
              topic_id: +this.id,
              heading: '',
              sub_heading: '',
              html_content: '',
              ar_url: '',
              bg_image: '',
              btn_image: '',
              color_code: '',
              show_button_text:0,
              type: '',
              sub_topic_files: this.fb.array([
               this.addReset()
              ])
            })
          } else {
            return;
          }
        },
        err => console.log(err)
      )
  }

}
