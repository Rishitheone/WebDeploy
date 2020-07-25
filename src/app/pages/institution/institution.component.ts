import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstituionService, InstitutionInerFace } from 'src/app/shared/instituion.service';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { InstitutionFormComponent } from './institution-form/institution-form.component';
import { InstitutionUpdateComponent } from './institution-update/institution-update.component';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent implements OnInit {

  dataSource: InstitutionInerFace[] = []
  isLoading = true;
  constructor(public dialog: MatDialog, private _router: Router, private toastr: ToastrService,
    public service: InstituionService, private fb: FormBuilder,) { }

  onDelete(id: any) {
    this.deleteSeries(id.id);
  }

  openDialog() {

    let dialogRef = this.dialog.open(InstitutionFormComponent, {
      width: '80%',
      autoFocus: true,
      disableClose: true,
    });
    //method run after dialog is close  
    dialogRef.afterClosed().subscribe(result => {
      this.service.getAllSeries().subscribe(
        data => this.dataSource = data.data,
        err => console.log(err));
    });
  };
  
  editSeries(series: InstitutionInerFace) {
    const index = this.dataSource.findIndex(c => c.id === series.id);
    this.dataSource[index] = series;
  }
  getEditAll() {
    return this.dataSource;
  }

  onEdit(id: number) {
    console.log(id)
    const seriesAll = this.getEditAll().find(c => c.id === id);
    let dialogRef = this.dialog.open(InstitutionUpdateComponent,
       {
      width: '80%',
      autoFocus: true,
      disableClose: true,
      data: seriesAll,
    });
    // method run after dialog is close  
    dialogRef.afterClosed().subscribe(result => {
      this.service.getAllSeries().subscribe(
        data => this.dataSource = data.data,
        err => console.log(err))
    });
  }



  ngOnInit() {
    this.service.getAllSeries()
      .subscribe(
        data => {
          console.log(data.data)
          this.isLoading = false,
            this.dataSource = data.data
        },
        err => {
          console.log(err)
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }

  onAbout(about){
    this.service.setAbout(about)
    this._router.navigate(['/home/Institution-about'])
  }

  deleteSeries(id: number) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteSeries(id)
        .subscribe(
          res => {
            this.toastr.warning('Deleted successfully', 'Series has been deleted !!');
            this.service.getAllSeries()
              .subscribe(
                data => {
                  this.dataSource = data.data
                },
                err => console.log(err)
              )
          },
          err => {
            console.log(err);
          }
        )
    }
  }

}
