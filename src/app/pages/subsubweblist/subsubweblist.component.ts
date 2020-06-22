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
import { Location } from '@angular/common';
import { ListViewService } from 'src/app/shared/list-view.service';

@Component({
  selector: 'app-subsubweblist',
  templateUrl: './subsubweblist.component.html',
  styleUrls: ['./subsubweblist.component.scss']
})
export class SubsubweblistComponent implements OnInit {
  topics2 = [];
  list = true;
  nodata = false;
  bookId:number;
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

  constructor(private _formBuilder: FormBuilder, private _location: Location,
    private seriesService: SeriesService,
    private authorService: AuthorService,
    private categoryService: CategoryService, private userService: UserService, private bookService: BookService,
    private service: ListViewService,
    private _route: ActivatedRoute, private toastr: ToastrService, private route: Router) { }

  snapId = +this._route.snapshot.paramMap.get('id');

  ngOnInit() {
    this.bookId  = this.userService.getChap();
    this.bookService.getTopicById(this.bookId).subscribe(
      res => {
        console.log(res),
          this.topics = res.data;
      },
      err => console.log(err)
    )

    const id = +this._route.snapshot.paramMap.get('id');
    this.service.subsubId(id).subscribe(
      res => {
        this.topics2 = res.data;
        this.list = false;
        if (res.data.length === 0) {
          this.nodata = true;
        }
      },
      err => console.log(err)
    )
  }
  backClicked() {
    this._location.back();
    this.userService.setChap(1)
  }

  deleteDis(id: number) {
    if (confirm('Are you sure to delete this record ?')) {
      this.bookService.deletewebbyId(+id)
        .subscribe(
          res => {
            this.service.subsubId(this.snapId).subscribe(
              data => {
                this.topics2 = res.data;
                this.list = false;
                if (res.data.length === 0) {
                  this.nodata = true;
                }
              },
              err => console.log(err)
            );
            this.toastr.warning('Deleted successfully', 'Sub-topic has been Deleted');
          },
          err => {
            console.log(err);
          }
        )
    }
  }

  goToTopic(){
    this.route.navigate(['home/book/chapter/create',this.bookId])
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
      this.route.navigate(['edit/', this.snapId])
    }
  }

  goToSubSubTimeLine(id: number){
    if (this.LastSubid) {
      this.route.navigate(['home/topic/sub-sub-topic/Web/create/', id])
    } else {
      this.route.navigate(['edit/', this.snapId])
    }
    
  }
  subweb(id){
    this.route.navigate(['home/topic/sub-topic/Web/list/', id])
  }
  subsubweb(id){
    this.route.navigate(['home/topic/sub-sub-topic/Web/list/', id])
  }

}

