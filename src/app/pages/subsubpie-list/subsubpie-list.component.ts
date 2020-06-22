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

@Component({
  selector: 'app-subsubpie-list',
  templateUrl: './subsubpie-list.component.html',
  styleUrls: ['./subsubpie-list.component.scss']
})
export class SubsubpieListComponent implements OnInit {

  topics2 = [];
  list = true;
  lastView = false;
  bookId:number;
   
  // topics2 = [];
  topics = [];
  subpie = [];
  subSubpie = [];
  ExtraArr = [];
  LastSubArr = [];
  LastSub: number;
  selectedIdForSubPieId: number;
  // list = true;
  SubsubpieArr = [];
  // bookId:number;
  PiechartOn:string;
  selectedIdForSubNext = [];
  selectedIdForSubNextpie = [];

  constructor(private _formBuilder: FormBuilder,private _location: Location,
    private seriesService: SeriesService,
    private authorService: AuthorService,
    private categoryService: CategoryService, private userService: UserService,
    private fb: FormBuilder, private bookService: BookService,
    private service: BookPageCreateService,
    private _route: ActivatedRoute, private toastr: ToastrService, private route: Router) { }

    snapId = +this._route.snapshot.paramMap.get('id');

  ngOnInit() {

    this.bookId  = this.userService.getChap();

    if (this.bookId) {
      this.bookService.getTopicById(this.bookId).subscribe(
        res => {
          console.log(res),
            this.topics = res.data;
          // console.log(res.data)
        },
        err => console.log(err)
      )
    }
    this.bookId  = this.userService.getChap();

    const id = +this._route.snapshot.paramMap.get('id');
    this.bookService.subSubpieId(id).subscribe(
      res => {
        this.list = false;
        console.log(res),
          this.topics2 = res.data;
          if (res.data.length === 0) {
            this.lastView = true;
          }
        // console.log(res.data)
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
      this.bookService.deletepieId(+id)
        .subscribe(
          res => {
            this.bookService.subSubpieId(this.snapId).subscribe(
              data=>{
                this.list = false;
                this.topics2=data.data
                if (data.data.length === 0) {
                  this.lastView = true;
                }
              },
              err=>console.log(err)
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

  onResetarray(){
    this.subpie = [];
    this.subSubpie = [];
    this.subSubpie = [];
    this.ExtraArr = [];
  }

  onClickSubPie(sub) {
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

  SubPie() {
    var i;
    for (i = 0; i < this.selectedIdForSubNextpie.length; i++) {
      if (this.selectedIdForSubNextpie[i].is_pichart == 1) {
        this.subpie.push(this.selectedIdForSubNextpie[i]);
      }
    }
    return this.subpie;
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

  goToSubSubPie(id: number) {
    if (this.selectedIdForSubPieId) {
      this.route.navigate(['home/topic/sub-topic/pie-chart/create/', id])
    } else {
      this.route.navigate(['edit/', this.snapId])
    }
  }

  goToSubLastPie(id: number) {
    if (this.LastSub) {
      this.route.navigate(['home/topic/sub-sub-topic/pie-chart/create/', id])
    } else {
      this.route.navigate(['edit/', this.snapId])
    }
  }

  SubsubpieList(id) {
    this.bookService.getSubpieById(id).subscribe(
      data=>{
        this.list = false;
        this.lastView = false;
        this.topics2=data.data,
        this.route.navigate(['home/books/Sub-Sub-topic/pie/', id])
        if (data.data.length === 0) {
          this.lastView = true;
        }
      },
      err=>console.log(err)
    );
  }

  SubpieList(id) {
    this.route.navigate(['home/books/Sub-topic/pie/', id])
  }

}


