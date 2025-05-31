import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Employeemodel } from '../../Models/employeemodel';
import { EmployeeService } from '../../Services/employee.service';
import { DepartmentService } from '../../Services/department.service';
import { Department } from '../../Models/department';
@Component({
  selector: 'app-employee',
  imports: [CommonModule, NgxPaginationModule, FormsModule, HttpClientModule],
  providers: [EmployeeService,DepartmentService],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  showModal: boolean = false;
  isEdit: boolean = false;
  list: Employeemodel[] = [];
  currentData: Employeemodel = this.getEmpty();

  page: number = 1;
  itemsPerPage: number = 5;
  sortColumn: string = 'employeeName';
  sortDirection: string = 'asc';
  searchTerm: string = '';

  departmentList: Department[] = [];
  constructor(private empService: EmployeeService, private deptService: DepartmentService) { }

  ngOnInit(): void {
    this.getEmp();
  }

  getEmp() {
    this.empService.GetAllEmployee().subscribe((res) => {
      this.list = res;
    })
    this.deptService.getDepartments().subscribe((res) => {
      this.departmentList = res;
    })
  }

  closeModal() {
    this.showModal = false;
    this.isEdit = false;
    this.currentData = this.getEmpty();
  }

  getEmpty(): Employeemodel {
    return {
      empId: 0,
      employeeCode: '',
      employeeName: '',
      departmentId: 0,
      jobTitle: '',
      email: '',
      azureEntraId: Math.random().toString(36).substring(2, 10),
      departmentName: '',
      roleId: 1
    };
  }

  openAddDialog() {
    this.isEdit = false;
    this.showModal = true;
    this.currentData = this.getEmpty();
  }

  openEditDialog(data: Employeemodel): void {
    this.isEdit = true;
    this.showModal = true;
    this.currentData = { ...data };
  }

  saveEmployee(data: any): void {
    if (data.valid) {
      if (this.isEdit) {
        this.empService.UpdateEmployee(this.currentData).subscribe({
          next: () => {
            this.getEmp();
            this.closeModal();
          }
        });
      }
      else {
        this.empService.CreateEmployee(this.currentData).subscribe({
          next: () => {
            this.getEmp();
            this.closeModal();
          }
        });
      }

    }
  
  }


  
  deleteEmployee(id: number): void {
    this.empService.DeleteEmployee(id).subscribe({
      next: () => this.getEmp(),
      error: (err) => console.error('Error deleting department', err),
    });
  }

      
  sortByDefault(): void {
    this.sortList();
  }

  

  private sortList(): void {
    this.list.sort((a: any, b: any) => {
      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  sortTable(column: string): void {

    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortList();
    
  }

}
