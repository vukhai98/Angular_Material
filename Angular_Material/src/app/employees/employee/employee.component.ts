import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/share/employee.service';
import { ReactiveFormsModule,FormControl,Validators,FormGroup } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Employee } from 'src/app/employee';
import { NotificationService } from 'src/app/share/notification.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  newEmployeee : Employee[] =  [];
  constructor(
    public service:EmployeeService,
    public notificationService :NotificationService
    ) { }

  ngOnInit(): void {
    this.service.getEmployees().subscribe(
      (response) => {
        console.log(response);
    },
    error => {
      console.log(error);
    })
  }
  departments =[
    {id: 1 , value:'Dep 1'},
    {id: 2 , value:'Dep 2'},
    {id: 3 , value:'Dep 3'}
  ];


  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  onSubmit(){

      this.service.insertEmployee().subscribe(
        (response : any) => {
          this.newEmployeee = response;
          console.log(this.newEmployeee);
          this.notificationService.success(':: Submitted successfully!')
      },
      error => {
        console.log(error);
      })
      this.service.form.reset();
      this.service.initializeFormGroup();

  }

}
