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
  selector: 'app-sub-sub-topic-list',
  templateUrl: './sub-sub-topic-list.component.html',
  styleUrls: ['./sub-sub-topic-list.component.scss']
})
export class SubSubTopicListComponent implements OnInit {
  subsubtopics = [];
  list = true;
  lastView = false;
  bookId: number;
  topics = [];
  resArr = [];
  selectedIdForSubNext = [];
  selectedIdForSub: number;
  selectedIdForSubId: number;

  constructor(private _formBuilder: FormBuilder, private _location: Location,
    private seriesService: SeriesService,
    private authorService: AuthorService,
    private categoryService: CategoryService, private userService: UserService,
    private fb: FormBuilder, private bookService: BookService,
    private service: BookPageCreateService,
    private _route: ActivatedRoute, private toastr: ToastrService, private route: Router) { }

  snapId = +this._route.snapshot.paramMap.get('id');

  ngOnInit() {

    this.bookId = this.userService.getChap();
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

    const id = +this._route.snapshot.paramMap.get('id');
    this.categoryService.getLastArr(id)
      .subscribe(
        res => {
          this.list = false;
          this.subsubtopics = res.data;
          if (res.data.length === 0) {
            this.lastView = true;
          }
          console.log(res)
        },
        err => console.log(err)
      )
  }
  backClicked() {
    this._location.back();
    this.userService.setChap(1)
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

  goToSubSubTopic(id: number) {
    this.route.navigate(['home/topic/sub-topic/sub-sub-topic/create/', id])
  }
  subSubtopiclist(id: number) {
    this.categoryService.getLastArr(id).subscribe(
      data => {
        this.list = false;
        this.lastView = false;
        console.log(data)
        this.subsubtopics = data.data,
        this.route.navigate(['home/books/Sub-Sub-topic/', id])
        if (data.data.length === 0) {
          this.lastView = true;
        }
      },
      err => console.log(err)
    );

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

  deleteDis(id: number) {
    console.log(id)
    if (confirm('Are you sure to delete this record ?')) {
      this.bookService.getSubSubById(+id)
        .subscribe(
          res => {
            this.categoryService.getLastArr(this.snapId).subscribe(
              data => {
                this.list = false;
                this.subsubtopics = data.data
                if (res.data.length === 0) {
                  this.lastView = true;
                }
              },
              err => console.log(err)
            );
            this.toastr.warning('Deleted successfully', 'Sub-sub topic has been Deleted');
          },
          err => {
            console.log(err);
          }
        )
    }
  }
  goToTopic() {
    this.route.navigate(['home/book/chapter/create', this.bookId])
  }
}
