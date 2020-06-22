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
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  topics = [];
  list = true;

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
    this.bookService.getTopicById(id).subscribe(
      res => {
        console.log(res),
          this.topics = res.data;
          if(res.data.length>0){
            this.list = false;
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
      this.bookService.onDeleteTopic(+id)
        .subscribe(
          res => {
            this.bookService.getTopicById(this.snapId).subscribe(
              data=>this.topics=data.data,
              err=>console.log(err)
            );
            this.toastr.warning('Deleted successfully', 'Topic has been Deleted');
          },
          err => {
            console.log(err);
          }
        )
    }
  }

  goToTopic(){
    this.route.navigate(['home/book/chapter/create',this.snapId])
  }
  method() {
    this.route.navigate(['edit/', this.snapId])
}

}
