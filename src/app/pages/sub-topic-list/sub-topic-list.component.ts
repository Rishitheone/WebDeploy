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
  selector: 'app-sub-topic-list',
  templateUrl: './sub-topic-list.component.html',
  styleUrls: ['./sub-topic-list.component.scss']
})
export class SubTopicListComponent implements OnInit {

  bookId: number;
  subtopics = [];
  topics = [];
  list = true;
  lastView = false;
  selectedId: number;

  constructor(private _formBuilder: FormBuilder, private _location: Location,
    private seriesService: SeriesService,
    private authorService: AuthorService,
    private categoryService: CategoryService, private userService: UserService,
    private fb: FormBuilder, private bookService: BookService,
    private service: BookPageCreateService,
    private _route: ActivatedRoute, private toastr: ToastrService, private route: Router) { }

  snapId = +this._route.snapshot.paramMap.get('id');

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
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

    this.categoryService.getAllSubCategoryforTopic(id)
      .subscribe(
        res => {
          this.list = false;
          console.log(res),
            this.subtopics = res.data;
          if (res.data.length === 0) {
            this.lastView = true;
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
      this.bookService.getSubTopicById(+id)
        .subscribe(
          res => {
            console.log(res)
            this.categoryService.getAllSubCategoryforTopic(this.snapId).subscribe(
              res => {
                this.list = false;
                console.log(res),
                  this.subtopics = res.data;
                if (res.data.length === 0) {
                  this.lastView = true;
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

  // goToTopic() {
  //   this.route.navigate(['home/book/chapter/create', this.bookId])
  // }

  methodSubTopic(id: number) {
    this.route.navigate(['home/topic/sub-topic/create/', id])
  }

  subTopiclist(id: number) {
    this.categoryService.getAllSubCategoryforTopic(id).subscribe(
      res => {
        this.list = false;
        this.lastView = false;
        console.log(res),
          this.subtopics = res.data;
          this.route.navigate(['home/books/Sub-topic/', id])
        if (res.data.length === 0) {
          this.lastView = true;
        }
      },
      err => console.log(err)
    );
  }

}
