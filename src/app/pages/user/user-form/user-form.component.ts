import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { SeriesFormComponent } from '../../series/series-form/series-form.component';
import { InstituionService } from 'src/app/shared/instituion.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form: FormGroup;
  Teacherform: FormGroup;
  toppings = new FormControl();
  selected: string;
  institution = [];

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  types = [
    { viewValue: 'Preschool', value: 'preschool' },
    { viewValue: 'Lower Middle School', value: 'lower-middle-school' },
    { viewValue: 'Upper Middle School', value: 'upper-middle-school' },
    { viewValue: 'Secondary School', value: 'secondary-school' }
  ];

  constructor(private fb: FormBuilder, public service: UserService,
    private toastr: ToastrService, public serviceIns: InstituionService,
    public dialogRef: MatDialogRef<SeriesFormComponent>) { }

  ngOnInit() {
    this.form = this.fb.group({
      institution_id: ['', Validators.required],
      school_type: ['', Validators.required],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      locality: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin_code: ['', Validators.required],
      country: ['', Validators.required],
      admission_no: ['', Validators.required],
      guardian_name: ['', Validators.required],
      guardian_relationship: ['', Validators.required],
      class_enrollment: ['', Validators.required],
    });
    this.Teacherform = this.fb.group({
      institution_id: ['', Validators.required],
      school_type: ['', Validators.required],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      locality: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin_code: ['', Validators.required],
      country: ['', Validators.required],
      employee_id: ['', Validators.required],
    });
  }



  onSubmitStudent(form) {
    console.log(form.value)
    if (!this.form.valid) {
      return;
    }
    this.service.saveStudents(form.value).subscribe(
      res => {
        this.toastr.success('Inserted successfully', 'Student Register');
        form.reset();
        console.log(res);
        this.dialogRef.close();
      },
      err => {
        console.log(err)
      }
    );
  }
  onSubmitteacher(Teacherform) {
    console.log(Teacherform.value)
    if (!this.Teacherform.valid) {
      return;
    }
    this.service.saveTeachers(Teacherform.value).subscribe(
      res => {
        this.toastr.success('Inserted successfully', 'Student Register');
        Teacherform.reset();
        console.log(res);
        this.dialogRef.close();
      },
      err => {
        console.log(err)
      }
    );
  }

  getAllInstitution() {
    this.serviceIns.getAllSeries()
      .subscribe(
        data => {
          this.institution = data.data
        },
        err => {
          console.log(err)
        }
      )
  }
  getAllInstitutionS() {
    this.getAllInstitution();
  }
  getAllInstitutionT() {
    this.getAllInstitution();
  }

}