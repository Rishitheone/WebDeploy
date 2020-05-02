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
  selector: 'app-weblist',
  templateUrl: './weblist.component.html',
  styleUrls: ['./weblist.component.scss']
})
export class WeblistComponent implements OnInit {

  topics = [];
  list = true;
  
  constructor(private _formBuilder: FormBuilder,
    private seriesService: SeriesService,
    private authorService: AuthorService,
    private categoryService: CategoryService, private userService: UserService,
    private fb: FormBuilder, private bookService: BookService,
    private service: BookPageCreateService,
    private _route: ActivatedRoute, private toastr: ToastrService, private route: Router) { }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this.bookService.getsubWebById(id).subscribe(
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

}

