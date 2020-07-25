import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstituionService, InstitutionInerFace } from 'src/app/shared/instituion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstitutionFormComponent } from '../institution-form/institution-form.component';
import { SeriesUpdateComponent } from '../../series/series-update/series-update.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-institution-update',
  templateUrl: './institution-update.component.html',
  styleUrls: ['./institution-update.component.scss']
})
export class InstitutionUpdateComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, public service: InstituionService, private toastr: ToastrService,
    public dialogRef: MatDialogRef<InstitutionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      institution_id:[this.data.id],
      name: [this.data.name,Validators.required],
      curriculum: [this.data.curriculum,Validators.required],
      address: [this.data.address,Validators.required],
      logo: [this.data.logo,Validators.required],
      city: [this.data.city,Validators.required],
      state: [this.data.state,Validators.required],
      pin_code: [this.data.pin_code,Validators.required],
      phone: [this.data.phone,Validators.required],
      country: [this.data.country,Validators.required],
      website: [this.data.website,Validators.required],
      contact_person_name: [this.data.contact_person_name,Validators.required],
      email: [this.data.email,Validators.required],
      level: [this.data.level,Validators.required],
      locality: [this.data.locality,Validators.required],
    });

  }

  onSubmit(form) {
    if (!this.form.valid) {
      return;
    }
    this.service.updateSeries(form.value).subscribe(
      res => {
        this.toastr.success('Inserted successfully', 'Institute Updated');
        form.reset();
        console.log(res);
        this.dialogRef.close();
      },
      err => {
        console.log(err)
      }
    );
  }
}