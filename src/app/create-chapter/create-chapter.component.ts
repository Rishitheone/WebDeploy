import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SeriesService } from '../shared/series.service';
import { AuthorService } from '../shared/author.service';
import { CategoryService } from '../shared/category.service';
import { UserService } from '../shared/user.service';
import { BookService } from '../shared/book.service';
import { BookPageCreateService } from '../shared/book-page-create.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss']
})
export class CreateChapterComponent implements OnInit {

  topics = [];
  selectedIdForSubPieId: number;
  selectedIdForSub: number;
  selectedIdForSubId: number;
  selectedIdForSubPie: number;
  selectedId: number;
  passingId: number;
  PiechartOn:string;
  LastSub: number;
  selectedIdForSubNext = [];
  selectedIdForSubNextpie = [];
  LastSubArr = [];
  SubsubpieArr = [];
  resArr = [];
  subpie = [];
  subSubpie = [];
  ExtraArr = [];

  constructor(
    // private _formBuilder: FormBuilder,
    private seriesService: SeriesService,
    // private location: Location,
    // private authorService: AuthorService,
    private categoryService: CategoryService,
    private userService: UserService,
    // private fb: FormBuilder,
    private bookService: BookService,
    // private service: BookPageCreateService,
    private _route: ActivatedRoute,
    // private toastr: ToastrService,
    private route: Router
    ) { }

  snapid: number = +this._route.snapshot.paramMap.get('id');

  ngOnInit() {


    //topic list
    const id = +this._route.snapshot.paramMap.get('id');
    if(id){
      this.userService.setChap(+id)
    }
    if (id) {
      this.bookService.getTopicById(id).subscribe(
        res => {
          console.log(res),
            this.topics = res.data;
          // console.log(res.data)
        },
        err => console.log(err)
      )
    }
  }
  methodSubTopic(id: number) {
      this.route.navigate(['home/topic/sub-topic/create/', id])
  }
  allTopics() {
    this.route.navigate(['home/books/topic/', this.snapid])
  }
  subTopiclist(id: number) {
    this.route.navigate(['home/books/Sub-topic/', id])
  }
  subSubtopiclist(id: number) {
    this.route.navigate(['home/books/Sub-Sub-topic/', id])
  }
  method() {
      this.route.navigate(['edit/', this.snapid])
  }
  goToSubLastPie(id: number) {
    if (this.LastSub) {
      this.route.navigate(['home/topic/sub-sub-topic/pie-chart/create/', id])
    } else {
      this.route.navigate(['edit/', this.snapid])
    }
  }
  goToSubSubPie(id: number) {
    if (this.selectedIdForSubPieId) {
      this.route.navigate(['home/topic/sub-topic/pie-chart/create/', id])
    } else {
      this.route.navigate(['edit/', this.snapid])
    }
  }

  SubpieList(id) {
    this.route.navigate(['home/books/Sub-topic/pie/', id])
  }
  SubsubpieList(id) {
    this.route.navigate(['home/books/Sub-Sub-topic/pie/', id])
  }

  onClickSub(sub) {
    this.resArr = [];
    this.categoryService.getAllSubCategoryforTopic(sub)
      .subscribe(
        res => {
          this.selectedIdForSubNext = res.data
          if (this.selectedIdForSubNext) {
            this.checkArr();
          }
        },
        err => console.log(err)
      )
  }
  onClickSubSubPie(sub) {
    this.subSubpie = [];
    this.ExtraArr = [];
    this.categoryService.getAllSubCategoryforTopic(sub)
      .subscribe(
        res => {
          this.SubsubpieArr = res.data
          if (this.SubsubpieArr) {
            this.SubSubPie();
          }
        },
        err => console.log(err)
      )
  }
  onClickSubPie(sub) {
    this.subpie = [];
    this.selectedIdForSubPieId = null,
    this.categoryService.getAllSubCategoryforTopic(sub)
      .subscribe(
        res => {
          this.selectedIdForSubNextpie = res.data
          if (this.selectedIdForSubNextpie) {
            this.SubPie();
          }
        },
        err => console.log(err)
      )
  }
  onLastSub(sub) {
    this.ExtraArr = [];
   
    this.categoryService.getLastArr(sub)
      .subscribe(
        res => {
          this.LastSubArr = res.data
          if (this.LastSubArr) {
            this.Extra();
          }
          console.log(res)
         
        },
        err => console.log(err)
      )
  }

  goToSubSubTopic(id: number) {
      this.route.navigate(['home/topic/sub-topic/sub-sub-topic/create/', id])
  }

  checkArr() {
    var i;
    for (i = 0; i < this.selectedIdForSubNext.length; i++) {
      if (this.selectedIdForSubNext[i].is_column == 0 && this.selectedIdForSubNext[i].is_pichart == 0 &&
        this.selectedIdForSubNext[i].is_graphp == 0 && this.selectedIdForSubNext[i].is_timeline == 0 &&
        this.selectedIdForSubNext[i].is_website == 0
      ) {
        this.resArr.push(this.selectedIdForSubNext[i]);
      }
    }
    return this.resArr;
  }
  SubPie() {
    var i;
    for (i = 0; i < this.selectedIdForSubNextpie.length; i++) {
      if (this.selectedIdForSubNextpie[i].is_pichart == 1) {
        this.subpie.push(this.selectedIdForSubNextpie[i]);
      }
    }
    return this.subpie;
  }
  SubSubPie() {
    var i;
    for (i = 0; i < this.SubsubpieArr.length; i++) {
      if (this.SubsubpieArr[i].is_column == 0 && this.SubsubpieArr[i].is_pichart == 0 &&
        this.SubsubpieArr[i].is_graphp == 0 && this.SubsubpieArr[i].is_timeline == 0 &&
        this.SubsubpieArr[i].is_website == 0
        ) {
        this.subSubpie.push(this.SubsubpieArr[i]);
      }
    }
    return this.subSubpie;
  }
  Extra() {
    var i;
    for (i = 0; i < this.LastSubArr.length; i++) {
      if (this.LastSubArr[i].is_pichart == 1 
        ) {
        this.ExtraArr.push(this.LastSubArr[i]);
      }
    }
    return this.ExtraArr;
  }

  onResetarray(){
    this.subpie = [];
    this.subSubpie = [];
    this.subSubpie = [];
    this.ExtraArr = [];
  }


}