import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookPageCreateService } from 'src/app/shared/book-page-create.service';
import { ToastrService } from 'ngx-toastr';
import { ImageUploadService } from 'src/app/shared/image-upload.service';
import { Location } from '@angular/common';
import { UserService } from 'src/app/shared/user.service';
import { SubtopicService } from 'src/app/shared/subtopic.service';

@Component({
  selector: 'app-editor-edit',
  templateUrl: './editor-edit.component.html',
  styleUrls: ['./editor-edit.component.scss']
})
export class EditorEditComponent implements OnInit {
  addHide = true;
  Editorform: FormGroup;
  topic_id: number;
  selected:string;
  topicRes = false;
  forShow = false;
  apiResSp = false;
  id:number;
  arr: FormArray;
  // for text type select
  isText = false;

  config: any = {
    height: '100px',
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

  backg = [
    {value: 'image', viewValue: 'Background Image'},
    {value: 'color', viewValue: 'Background Color'}
  ];

  foods = [
    { value: 1, viewValue: 'Yes' },
    { value: 0, viewValue: 'No' },
  ];

  constructor(private fb: FormBuilder, private _route: ActivatedRoute, private userService: UserService,
    private service: BookPageCreateService, private toastr: ToastrService,
    private route: Router, private imageUpload: ImageUploadService, private _location: Location,
    private subtopicService: SubtopicService) { }

  ngOnInit() {

    this.id = +this._route.snapshot.paramMap.get('id');
    this.Editorform = this.fb.group({
      book_id: +this.id,
      title:'',
      sub_title:'',
      show_button_text:'',
      description:'',
      topic_cover:'',
      bg_image:'',
      color_code:'',
    });
  }

  someMethod(value){
    this.selected = value;
    console.log(value);
  }

  addItem() {
     this.forShow = true;
     this.addHide = false;
  }

  onSaveTopic() {
    this.apiResSp = true;
    const data = JSON.stringify(this.Editorform.value)
    console.log(data)
    this.service.createTopic(data)
      .subscribe(
        res => {
          if (res.status === 1) {
            this.apiResSp = false;
            this.forShow = false;
            this.addHide = true;
            this.toastr.success('Submitted successfully', 'Topic has been submitted');
            this.Editorform.reset();
          } else {
            return;
          }
        },
        err => console.log(err)
      )
  }

  backClicked() {
    this._location.back();
    this.userService.setChap(1)
  }

}
