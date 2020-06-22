import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SeriesService } from 'src/app/shared/series.service';
import { AuthorService } from 'src/app/shared/author.service';
import { CategoryService } from 'src/app/shared/category.service';
import { BookService } from 'src/app/shared/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Datum, RootObject } from '../home/home.component';
import { UserService } from 'src/app/shared/user.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BookPageCreateService } from 'src/app/shared/book-page-create.service';
// import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {
  // new/////////////
  form: FormGroup;
  bookForm: FormGroup;
  pageTitle: string;
  isLinear = true;
  pictureUrl = null;
  coverUrl = null;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  responceValue: string = "Somthing worng";
  books: Datum[] = []
  randome: string;

  apiRes = false;

  isDataAble = true;
  returnId: number;
  chapValue: number;
  selectedValue: any;
  selectedValueMax: any;

  mainCategory = [
    { value: 'primary', viewValue: 'Primary' },
    { value: 'secondary', viewValue: 'Secondary' },
    { value: 'higher', viewValue: 'Higher' }
  ];

  types = [
    { value: 'preschool', viewValue: 'Pre School' },
    { value: 'lower-middle-school', viewValue: 'Lower Middle School' },
    { value: 'upprer-middle-school', viewValue: 'Upper Middle School' },
    { value: 'secondary-school', viewValue: 'Secondary School' },
    { value: 'friction', viewValue: 'Friction' },
    { value: 'non-friction', viewValue: 'Non-Friction' },
    { value: 'comic', viewValue: 'Comic' },
    { value: 'education-&-reference', viewValue: 'Education & Reference' },
    { value: 'literary-collections', viewValue: 'Literary Collections' },
    { value: 'non-classifiable', viewValue: 'Non-Classifiable' },
  ]
  template = [
    { value: 1, viewValue: 'Template 1' },
    // { value: 2, viewValue: 'Template 2' },
    // { value: 3, viewValue: 'Template 3' },
    // { value: 4, viewValue: 'Template 4' },
  ]
  minAge = [
    { value: 3, viewValue: '3 years' },
    { value: 4, viewValue: '4 years' },
    { value: 5, viewValue: '5 years' },
    { value: 6, viewValue: '6 years' },
    { value: 7, viewValue: '7 years' },
    { value: 8, viewValue: '8 years' },
    { value: 9, viewValue: '9 years' },
    { value: 10, viewValue: '10 years' },
    { value: 11, viewValue: '11 years' },
    { value: 12, viewValue: '12 years' },
    { value: 13, viewValue: '13 years' },
    { value: 14, viewValue: '14 years' },
    { value: 15, viewValue: '15 years' },
    { value: 16, viewValue: '16 years' },
  ];
  maxAge = [];
  maximumAge = [
    { value: 17, viewValue: '17 years' },
    { value: 18, viewValue: '18 years' },
  ];
  language: any[] = ['English', 'German', 'French', 'Spanish', 'Italian', 'Portuguese', 'Dutch', 'Japanese'
    , 'Afrikaans', 'Alsatian', 'Arabic', 'Basque', 'Bokmal Norwegian', 'Breton', 'Catalan', 'Chinese {Traditional)', 'Cornish'
    , 'Corsican', 'Danish', 'Eastern Frisian', 'Finnish', 'Frisian', 'Galician', 'Gujarati', 'Hindi', 'Icelandic'
    , 'Irish', 'Luxembourgish', 'Malayalam', 'Manx', 'Marathi', 'Northern Frisian', 'Norwegian ', 'Nynorsk Norwegian '
    , 'Provençal', 'Romansh', 'Scots', 'Scottish Gaelic', 'Swedish', 'Swedish', 'Tamil', 'Telgue'

  ];
  series = [];
  author = [];
  category = [];
  AllSubCategory = [];
  // for html editon starting
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
      ['customButtons', ['testBtn']],
      ['view', ['fullscreen']]
    ],
  };
  data: Datum[];
  constructor(private _formBuilder: FormBuilder,
    private seriesService: SeriesService, private location: Location,
    private authorService: AuthorService,
    private categoryService: CategoryService, private userService: UserService,
    private fb: FormBuilder, private bookService: BookService,
    private service: BookPageCreateService, private router: Router,
    private _route: ActivatedRoute, private toastr: ToastrService, private route: Router) {
    this.data = this.bookService.getData();

  }
  // @ViewChild('stepper') stepper: MatStepper;
  snapid: number = +this._route.snapshot.paramMap.get('id');
  ngOnInit() {

    //topic list
    const id = +this._route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getTopicById(id).subscribe(
        res =>
          // {
          console.log(res),
        // this.topics = res.data;

        // console.log(res.data)
        // },
        err => console.log(err)
      )
    }

    this.returnId = this.service.getData()
    if (this.returnId) {
      this.isLinear = true;
    }

    this.chapValue = this.userService.getChap()
    this.userService.setTitle('Book');
    // for series dropdown
    this.seriesService.getAllSeries()
      .subscribe(
        res => this.series = res['data'],
        err => console.log(err)
      )

    //for author dropdown
    this.authorService.getAllAuthor()
      .subscribe(
        res => this.author = res['data'],
        err => console.log(err)
      )

    //for Category DropDown
    this.categoryService.getAllCategory()
      .subscribe(
        res => this.category = res['data'],
        err => console.log(err)
      )

    if (id) {
      this.bookForm = this.fb.group({
        book_id: id,
      });
      this.pageTitle = 'Update Book';

      this.bookService.getBookbyPost(this.bookForm.value).subscribe(
        res => {
          console.log(res)
          this.selectedValue = res.min_age;
          for (let i = (this.selectedValue - 2); i < this.minAge.length; i++) {
            this.maxAge.push(this.minAge[i])
          }
          this.apiRes = true;
          this.isLinear = false;
          this.isDataAble = false;
          console.log(res.category.type)
          this.callAllType(res.category.type)
          this.callSubCateApi(res.category.parent_category_id)
          var test = res.tags.split(',')
          this.form.patchValue({
            book_id: res.id,
            series_id: res.series_id,
            author_id: res.author_id,
            title: res.title,
            overview_title: res.overview_title,
            overview_sub_title: res.overview_sub_title,
            overview_description: res.overview_description,
            sub_title: res.sub_title,
            description: res.description,
            status: res.status,
            book_cover: res.book_cover,//no
            cover: res.cover,//yes
            language: res.language,
            isbn_code: res.isbn_code,
            min_age: res.min_age,
            max_age: res.max_age,
            template: res.template,
            type: res.category["type"],
            category: res.category["parent_category_id"],
            category_id: res.category["id"],
            tags: test,
          });
          this.pictureUrl = res.book_cover;
          this.coverUrl = res.cover;
        }
      );
    } else {
      this.pageTitle = 'Create Book';
      this.isDataAble = false;
    }

    //form submit
    this.form = this.fb.group({
      category_id: ['', Validators.required],//yes
      book_id: [null],
      series_id: [''],//yes
      author_id: ['', Validators.required],//yes
      title: ['', Validators.required],//yes
      sub_title: [''],//yes
      overview_title: [''],//yes
      overview_sub_title: [''],//yes
      description: [''],//yes
      // description: ['', Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(4000)])],//yes
      overview_description: [''],//yes
      // overview_description: ['', Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(4000)])],//yes
      status: ['published', Validators.required],//yes
      language: ['', Validators.required],//yes
      book_cover: ['', Validators.required],//no
      cover: ['', Validators.required],//yes
      isbn_code: ['', Validators.required],//yes
      min_age: ['', Validators.required],//yes
      max_age: [''],//yes
      template: [1, Validators.required],//yes
      type: [null],//yes
      category: [null],//yes
      tags: this.fb.array([ //no
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
      ])
    });
  }
  selectedLanguage = this.language;

  onKey(value) {
    this.selectedLanguage = this.search(value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.language.filter(option => option.toLowerCase().startsWith(filter));
  }
  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     if (this.returnId) {
  //       this.apiRes = true;
  //       this.stepper.selectedIndex = 1;
  //     }
  //   }, 1000);
  //   setTimeout(() => {
  //     if (this.chapValue) {
  //       console.log(this.chapValue);
  //       this.apiRes = true;
  //       this.stepper.selectedIndex = 1;
  //     }
  //   }, 1000);
  // }

  ngOnDestroy(): void {
    this.userService.setChap(null)
  }

  get tags() {
    return this.form.get('tags') as FormArray;
  }
  //  getsubtopictexttype(){

  //  }
  onSubmit() {
    const formData = new FormData();
    formData.append('category_id', this.form.get('category_id').value)
    formData.append('series_id', this.form.get('series_id').value)
    formData.append('author_id', this.form.get('author_id').value)
    formData.append('book_id', this.form.get('book_id').value)
    formData.append('title', this.form.get('title').value)
    formData.append('overview_title', this.form.get('overview_title').value)
    formData.append('overview_sub_title', this.form.get('overview_sub_title').value)
    formData.append('overview_description', this.form.get('overview_description').value)
    formData.append('sub_title', this.form.get('sub_title').value)
    formData.append('description', this.form.get('description').value)
    formData.append('status', this.form.get('status').value)
    formData.append('language', this.form.get('language').value)
    formData.append('isbn_code', this.form.get('isbn_code').value)
    formData.append('min_age', this.form.get('min_age').value)
    formData.append('max_age', this.form.get('max_age').value)
    formData.append('template', this.form.get('template').value)
    formData.append('book_cover', this.form.get('book_cover').value)
    formData.append('cover', this.form.get('cover').value)
    var tags = this.form.get('tags').value;
    for (var i = 0; i < tags.length; i++) {
      formData.append('tags[' + i + ']', tags[i]);
    }

    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    // var json = JSON.stringify(object);
    // console.log(json);
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.updateBook(formData).subscribe(
        res => {
          this.apiRes = true;
          console.log(res),
            this.toastr.success('Book has been submitted', 'Book Updated successfully');
          this.form.reset();
          if (res.status === 1) {
            this.route.navigateByUrl('/home');
          } else {
            return;
          }
        },
        err => console.log(err)
      );
    } else {
      this.bookService.createBook(formData).subscribe(
        res => {
          this.apiRes = true;
          console.log(res)
          const array1 = res.data;
          var test2;
          array1.forEach(element => {
            test2 = element.id;
          });
          // this.passingId = test2;
          console.log(test2),
            this.toastr.success('Book has been submitted', 'Book created successfully');
          if (res.status === 1) {
            this.form.reset();
            this.router.navigate(['home/book/chapter/create', test2])
          }
        },
        err => console.log(err)
      );
    }



    console.log(this.form.value)


  }

  onSelect(selectedItem: any) {
    this.AllSubCategory = [];
    this.callSubCateApi(selectedItem.id);
    console.log(selectedItem.id)
  }
  callSubCateApi(selectedItem) {
    this.categoryService.getAllSubCategory(selectedItem)
      .subscribe(
        data => {
          this.AllSubCategory = data['data']
        },
        err => console.log(err)
      )
  }


  onFileSelect(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.pictureUrl = reader.result;
        this.form.get('book_cover').setValue(file);
      }
    }
  }
  onFileSelectCover(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.coverUrl = reader.result;
        this.form.get('cover').setValue(file);
      }
    }
  }

  callAllType(type) {
    this.category = [];
    this.AllSubCategory = [];
    this.categoryService.getType(type)
      .subscribe(
        res => {
          console.log(res.data)
          this.category = res.data
        },
        err => console.log(err)
      )
  }


  goBack(): void {
    this.location.back();
  }

  //delete Topic
  onDelete(item) {
    if (confirm('Are you sure to delete this record ?')) {
      this.bookService.onDeleteTopic(item).subscribe(
        res => {
          console.log(res)
          this.toastr.warning('Topic has been deleted', 'Topic deleted successfully');
          const id = +this._route.snapshot.paramMap.get('id');
          this.bookService.getTopicById(id).subscribe(
            // res => this.topics = res,
            err => console.log(err),
          )

        },
        err => console.log(err)
      )
    }
  }

  onSelectAge() {
    console.log(this.maxAge.length)
    // before
    if (this.maxAge.length > 0) {
      this.maxAge = []
    }
    for (let i = (this.selectedValue - 2); i < this.minAge.length; i++) {
      this.maxAge.push(this.minAge[i])
    }
  }



}