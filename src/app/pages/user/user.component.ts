import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AlluserService } from 'src/app/shared/alluser.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';

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
  apiResSp = false;
  contactForm: FormGroup;
  displayedColumns: string[] = ["id", "name", "email", "mobile", "dob", "age", "status", "role", "last_login"];
  searchKey: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  error: string;
  loginError: string;
  public counter: number = 1;
  public lastpage: number;
  usersFor = '0';

  teacherList = [];
  NewteacherList = [];

  storage = false;


  public dataSource = new MatTableDataSource<ResUser>();
  constructor(private service: AlluserService, private _formBuilder: FormBuilder, public dialog: MatDialog,) { }

  ngOnInit() {

    this.createContactFormInactive();

    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.findValue();
    this.service.getAlluser(this.counter).subscribe(
      res => {
        this.teacherList = res.data.data;
        console.log(this.teacherList)
      },
      err => console.log(err)
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
    switch (this.usersFor) {
      case '0':
        this.findValue();
        break;
      case '1':
        this.getSubTeacher();
        break;
      case '2':
        this.getSubStudents();
        break;
    }
  }
  changeStatus(id: number) {
    this.apiResSp = true;
    this.contactForm.setValue({
      user_id: id,
      status: "inactive"
    })
    const data = JSON.stringify(this.contactForm.value)
    console.log(data)
    this.service.userStatus(this.contactForm.value).subscribe(
      res => {
        this.apiResSp = false;
        console.log(res)
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.findValue();
      },
      err => console.log(err)
    )
  }
  changeStatusInact(id: number) {
    this.apiResSp = true;
    this.contactForm.setValue({
      user_id: id,
      status: "active"
    })
    const data = JSON.stringify(this.contactForm.value)
    console.log(data)
    this.service.userStatus(this.contactForm.value).subscribe(
      res => {
        this.apiResSp = false;
        console.log(res)
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.findValue();
      },
      err => console.log(err)
    )
  }

  createContactFormInactive() {
    this.contactForm = this._formBuilder.group({
      user_id: null,
      status: [''],
    });
  }

  decrement() {
    this.counter -= 1;
    switch (this.usersFor) {
      case '0':
        this.findValue();
        break;
      case '1':
        this.getSubTeacher();
        break;
      case '2':
        this.getSubStudents();
        break;
    }
  }
  lastPage() {
    switch (this.usersFor) {
      case '0':
        this.service.getAlluser(this.lastpage).subscribe(
          res => {
            if (res.data.data.length === 0) {
              this.storage = true;
            } else {
              this.storage = false;
            }
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
        break;
      case '1':
        this.service.getAllTeachers(this.lastpage).subscribe(
          res => {
            if (res.data.data.length === 0) {
              this.storage = true;
            } else {
              this.storage = false;
            }
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
        break;
      case '2':
        this.service.getAllStudents(this.lastpage).subscribe(
          res => {
            if (res.data.data.length === 0) {
              this.storage = true;
            } else {
              this.storage = false;
            }
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
        break;

    }
  }
  firstPage() {
    switch (this.usersFor) {
      case '0':
        this.service.getAlluser(1).subscribe(
          res => {
            if (res.data.data.length === 0) {
              this.storage = true;
            } else {
              this.storage = false;
            }
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
        break;
      case '1':
        this.service.getAllTeachers(1).subscribe(
          res => {
            if (res.data.data.length === 0) {
              this.storage = true;
            } else {
              this.storage = false;
            }
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
        break;
      case '2':
        this.service.getAllStudents(1).subscribe(
          res => {
            if (res.data.data.length === 0) {
              this.storage = true;
            } else {
              this.storage = false;
            }
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
        break;

    }
  }
  getAllUser() {
    this.counter = 1;
    this.findValue();
  }
  getAllteachers() {
    this.counter = 1;
    this.getSubTeacher();
  }
  getSubTeacher(){
    this.dataSource.data = [],
    this.service.getAllTeachers(this.counter).subscribe(
      res => {
        console.log(res.data)
        if (res.data.data.length === 0) {
          this.storage = true;
        } else {
          this.storage = false;
        }
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
  getAllStudents() {
    this.counter = 1;
    this.getSubStudents();
  }
  getSubStudents(){
    this.dataSource.data = [],
    this.service.getAllStudents(this.counter).subscribe(
      res => {
        console.log(res.data)
        if (res.data.data.length === 0) {
          this.storage = true;
        } else {
          this.storage = false;
        }
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
        console.log(res.data)
        if (res.data.data.length === 0) {
          this.storage = true;
        } else {
          this.storage = false;
        }
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

  openDialog() {

    let dialogRef = this.dialog.open(UserFormComponent, {
      width: '80%',
      autoFocus: true,
      disableClose: true,
    });
    //method run after dialog is close  
    dialogRef.afterClosed().subscribe(result => {
      this.service.getAlluser(this.counter).subscribe(
        res => this.dataSource.data = res.data.data as ResUser[],
        err => console.log(err));
    });
  };





}
