import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SeriesService } from 'src/app/shared/series.service';
import { AuthorService } from 'src/app/shared/author.service';
import { CategoryService } from 'src/app/shared/category.service';
import { UserService } from 'src/app/shared/user.service';
import { BookService } from 'src/app/shared/book.service';
import { BookPageCreateService } from 'src/app/shared/book-page-create.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-web-view',
  templateUrl: './web-view.component.html',
  styleUrls: ['./web-view.component.scss']
})
export class WebViewComponent implements OnInit {
  topics = [];

  PiechartOn:string;

  subtopic = [];
  subtopicList = [];
  ///////////////////
  Subsubtopic = [];
  SubsubtopicList = [];
  //////////////
  LastSub = [];
  LastSubList = [];

  selectedIdForSubPieId:number;
  LastSubid:number;

  constructor(private _formBuilder: FormBuilder,
    private seriesService: SeriesService,
    private authorService: AuthorService,
    private categoryService: CategoryService, private userService: UserService,
    private fb: FormBuilder, private bookService: BookService,
    private service: BookPageCreateService,
    private _route: ActivatedRoute, private toastr: ToastrService, private route: Router) { }

    snapid: number = +this._route.snapshot.paramMap.get('id');
  ngOnInit() {

    const id = +this._route.snapshot.paramMap.get('id');
    this.bookService.getTopicById(id).subscribe(
      res => {
        console.log(res),
          this.topics = res.data;
      },
      err => console.log(err)
    )
  }

  onSectionOne(one) {
    this.subtopicList = [];
    this.categoryService.getAllSubCategoryforTopic(one)
      .subscribe(
        res => {
          this.subtopic = res.data
          if (this.subtopic) {
            this.SubPie();
          }
        },
        err => console.log(err)
      )
  }

  SubPie() {
    var i;
    for (i = 0; i < this.subtopic.length; i++) {
      if (this.subtopic[i].is_website == 1) {
        this.subtopicList.push(this.subtopic[i]);
      }
    }
    return this.subtopicList;
  }

  onResetarray(){
    this.subtopic = [];
    this.subtopicList = [];
  }


  /////////////////////subsubs section/////////////////////
  onsectionTwo(two){
    this.SubsubtopicList = [];
    this.LastSubList = [];
    this.categoryService.getAllSubCategoryforTopic(two)
    .subscribe(
      res => {
        this.Subsubtopic = res.data
        if (this.Subsubtopic) {
          this.SubSubTime();
        }
      },
      err => console.log(err)
    )
  }
  onLastSubsUB(lastTow){
    this.LastSubList = [];
    this.categoryService.getLastArr(lastTow)
      .subscribe(
        res => {
          this.LastSub = res.data
          if (this.LastSub) {
            this.Extra();
          }
          console.log(res)
         
        },
        err => console.log(err)
      )
  }
  Extra() {
    var i;
    for (i = 0; i < this.LastSub.length; i++) {
      if (this.LastSub[i].is_website == 1 
        ) {
        this.LastSubList.push(this.LastSub[i]);
      }
    }
    return this.LastSubList;
  }
  SubSubTime() {
    var i;
    for (i = 0; i < this.Subsubtopic.length; i++) {
      if (this.Subsubtopic[i].is_column == 0 && this.Subsubtopic[i].is_pichart == 0 &&
        this.Subsubtopic[i].is_graphp == 0 && this.Subsubtopic[i].is_timeline == 0 &&
        this.Subsubtopic[i].is_website == 0
        ) {
        this.SubsubtopicList.push(this.Subsubtopic[i]);
      }
    }
    return this.SubsubtopicList;
  }

  goToSubTimeLine(id: number) {
    if (this.selectedIdForSubPieId) {
      this.route.navigate(['home/topic/sub-topic/Web/create/', id])
    } else {
      this.route.navigate(['edit/', this.snapid])
    }
  }

  goToSubSubTimeLine(id: number){
    if (this.LastSubid) {
      this.route.navigate(['home/topic/sub-sub-topic/Web/create/', id])
    } else {
      this.route.navigate(['edit/', this.snapid])
    }
    
  }
  subweb(id){
    this.route.navigate(['home/topic/sub-topic/Web/list/', id])
  }
  subsubweb(id){
    this.route.navigate(['home/topic/sub-sub-topic/Web/list/', id])
  }

}
