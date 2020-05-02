import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AlluserService } from 'src/app/shared/alluser.service';

export interface ResUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  profile_pic: string;
  dob: string;
  age: number;
  status: string;
  role: string;
  last_login: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isLoading = true;
  displayedColumns: string[] = ["id", "first_name", "last_name", "email","mobile","dob","age","status","role","last_login"];
  searchKey: string;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  error: string;
  loginError: string;
  public counter: number = 1;
  public lastpage:number;

  public dataSource = new MatTableDataSource<ResUser>();
  constructor(private service: AlluserService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.findValue();
    this.service.getAlluser(this.counter).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )

  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  increment() {
    this.counter += 1;
    this.findValue();
  }

  decrement() {
    this.counter -= 1;
    this.findValue();
  }
  lastPage(){
    this.service.getAlluser(this.lastpage).subscribe(
      res => {
        if (res.status == 1) {
          this.isLoading = false;
          this.lastpage = +res.data.last_page;
          this.dataSource.data = res.data.data as ResUser[];
        } else {
          this.loginError = 'Server Side Problem..';
        }
      },
      error => this.error = error
    );
  }
  firstPage(){
    this.service.getAlluser(1).subscribe(
      res => {
        if (res.status == 1) {
          this.isLoading = false;
          this.lastpage = +res.data.last_page;
          this.dataSource.data = res.data.data as ResUser[];
        } else {
          this.loginError = 'Server Side Problem..';
        }
      },
      error => this.error = error
    );
  }

  findValue() {
    this.service.getAlluser(this.counter).subscribe(
      res => {
        if (res.status == 1) {
          this.isLoading = false;
          this.lastpage = +res.data.last_page;
          this.dataSource.data = res.data.data as ResUser[];
        } else {
          this.loginError = 'Server Side Problem..';
        }
      },
      error => this.error = error
    );
  }
 
}
