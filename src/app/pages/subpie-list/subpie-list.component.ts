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
  selector: 'app-subpie-list',
  templateUrl: './subpie-list.component.html',
  styleUrls: ['./subpie-list.component.scss']
})
export class SubpieListComponent implements OnInit {
  topics = [];
  list = true;
  
  constructor(private _formBuilder: FormBuilder,
    private seriesService: SeriesService,private _location: Location,
    private authorService: AuthorService,
    private categoryService: CategoryService, private userService: UserService,
    private fb: FormBuilder, private bookService: BookService,
    private service: BookPageCreateService,
    private _route: ActivatedRoute, private toastr: ToastrService, private route: Router) { }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this.bookService.getSubpieById(id).subscribe(
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

}
