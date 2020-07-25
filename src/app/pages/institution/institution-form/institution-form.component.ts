import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InstituionService } from 'src/app/shared/instituion.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-institution-form',
  templateUrl: './institution-form.component.html',
  styleUrls: ['./institution-form.component.scss']
})
export class InstitutionFormComponent implements OnInit {

  form:FormGroup;
  constructor(private fb: FormBuilder, public service: InstituionService, private toastr: ToastrService,
    public dialogRef: MatDialogRef<InstitutionFormComponent>) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['',Validators.required],
      curriculum: ['',Validators.required],
      address: ['',Validators.required],
      logo: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      pin_code: ['',Validators.required],
      phone: ['',Validators.required],
      country: ['',Validators.required],
      website: ['',Validators.required],
      contact_person_name: ['',Validators.required],
      email: ['',Validators.required],
      level: ['',Validators.required],
      locality: ['',Validators.required],
    });
  }

 

  onSubmit(form) {
    if(!this.form.valid){
      return;
    }
    this.service.saveSeries(form.value).subscribe(
      res => {
        this.toastr.success('Inserted successfully', 'Institute Register');
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