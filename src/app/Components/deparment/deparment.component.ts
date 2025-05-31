import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Department } from '../../Models/department';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentService } from '../../Services/department.service';


@Component({
  selector: 'app-deparment',
  imports: [CommonModule,FormsModule,HttpClientModule,NgxPaginationModule],
  templateUrl: './deparment.component.html',
  styleUrl: './deparment.component.css',
  providers: [DepartmentService] ,
})

export class DeparmentComponent {
  showModal: boolean = false;
  isEdit: boolean = false;
  departmentList: Department[] = [];
  currentDepartment: Department= this.getEmptyDepartment(); 
  //filteredDepartments: Department[] = [];

  // Pagination variables
  page: number = 1;
  itemsPerPage: number = 5;  
  sortColumn: string = 'departmentName'; // Active column being sorted
  sortDirection: string = 'asc'; // Sorting direction ('asc' or 'desc')
  searchTerm: string = ''; 

  constructor(private deptService: DepartmentService) {}

  ngOnInit(): void {
    this.getDepartment();
  }

  openAddDialog(){
    this.isEdit = false;
    this.showModal = true;
    this.currentDepartment = this.getEmptyDepartment();
  }

  openEditDialog(department: Department): void {
    this.isEdit = true;
    this.showModal = true;
    this.currentDepartment = { ...department };
  }

  saveDepartment(departmentForm: any): void {
    if (departmentForm.valid) {
    
    if (this.isEdit) {
      this.deptService.updateDepartment(this.currentDepartment).subscribe({
        next: () => {
          this.getDepartment();
          this.closeModal();
        },
        error: (err) => console.error('Error updating department', err),
      });
    } else {
        this.deptService.addDepartment(this.currentDepartment).subscribe({
          next: () => {
            this.getDepartment();
            this.closeModal();
          },
          error: (err) => console.error('Error add department', err),
        });
    }
  }
  else{
    console.log("invalid");
  }
  }

  deleteDepartment(id: number): void {
    this.deptService.deleteDepartment(id).subscribe({
      next: () => this.getDepartment(),
      error: (err) => console.error('Error deleting department', err),
    });
  }

  closeModal() {
    this.showModal = false;
    this.isEdit = false;
    this.currentDepartment = this.getEmptyDepartment();
  }

  getEmptyDepartment(): Department {
    return {
      departmentId: 0,
      departmentName: '',
    };
  }

  getDepartment() {
    this.deptService.getDepartments().subscribe((res) => {
      this.departmentList = res;
      //this.filterDepartments(); 
      this.sortByDefault();
    })
  }




  sortByDefault(): void {
    this.sortList();
  }


  private sortList(): void {
    this.departmentList.sort((a: any, b: any) => {
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
    //this.filterDepartments();
  }

  
  sortTable(column: string): void {
    // If the same column is clicked, toggle sorting direction
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set new column and reset direction to ascending
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortList();
  }

  //filterDepartments(): void {
  //  this.filteredDepartments = this.departmentList.filter((department) =>
  //    department.departmentName.toLowerCase().includes(this.searchTerm.toLowerCase())
  //  );
  //  this.page = 1; // Reset to the first page when search term changes
  //  //this.sortList(); // Reapply sorting after filtering
  //}

 // get paginatedDepartments(): Department[] {
 //   const startIndex = (this.page - 1) * this.itemsPerPage;
 //   const endIndex = startIndex + this.itemsPerPage;
 //   return this.filteredDepartments.slice(startIndex, endIndex);
 // }



}
