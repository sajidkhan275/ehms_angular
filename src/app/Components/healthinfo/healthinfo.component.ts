import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Healthinfomodel } from '../../Models/healthinfomodel';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HealthinfoService } from '../../Services/healthinfo.service';

@Component({
  selector: 'app-healthinfo',
  imports: [CommonModule,FormsModule,HttpClientModule,NgxPaginationModule],
  templateUrl: './healthinfo.component.html',
  styleUrl: './healthinfo.component.css',
  providers: [HealthinfoService] ,
})
export class HealthinfoComponent {
  showModal: boolean = false;
  isEdit: boolean = false;
  list: Healthinfomodel[] = [];
  currentData: Healthinfomodel= this.getEmpty(); 

  page: number = 1;
  itemsPerPage: number = 5;  
  sortColumn: string = 'employeeName'; 
  sortDirection: string = 'asc';
  searchTerm: string = ''; 
  selectedFile: File | null = null;
  fileError: string | null = null; 

  constructor(private helathInfoService: HealthinfoService) {}

  ngOnInit(): void {
    this.getHealthInfo();
  }

   openAddDialog(){
      this.isEdit = false;
      this.showModal = true;
      this.currentData = this.getEmpty();
    }
  
    openEditDialog(data: Healthinfomodel): void {
      this.isEdit = true;
      this.showModal = true;
      this.currentData = { ...data };
    }

    saveHealthInfo(data: any): void {
      if (data.valid && this.selectedFile) {
        this.fileError ="";
      
  
      if (this.isEdit) {
        this.helathInfoService.UpdateEmployeeHealthInfo(this.currentData,this.selectedFile).subscribe({
          next: () => {
            this.getHealthInfo();
            this.closeModal();
          },
          error: (err) => console.error('Error updating department', err),
        });
      } else {
          this.helathInfoService.CreateEmployeeHealthInfo(this.currentData,this.selectedFile).subscribe({
            next: () => {
              this.getHealthInfo();
              this.closeModal();
            },
            error: (err) => console.error('Error add department', err),
          });
      }
    }
     else{
      this.fileError = 'Data Require || File not selected';
     }
    }

    deleteHealthInfo(id: number, filename: string  | undefined): void {
      const safeFileName = filename ?? '';
      this.helathInfoService.deleteEmployeeHealthInfo(id,safeFileName).subscribe({
        next: () => this.getHealthInfo(),
        error: (err) => console.error('Error deleting department', err),
      });
    }

    
  getHealthInfo() {
    this.helathInfoService.GetAllEmployeeHealthInfo().subscribe((res) => {
      this.list = res;
      //this.filterDepartments(); 
      //this.sortByDefault();
    })
  }

    closeModal() {
      this.showModal = false;
      this.isEdit = false;
      this.currentData = this.getEmpty();
      this.selectedFile = null;
    }
  

    getEmpty(): Healthinfomodel {
      return {
        employeeHealthInfoId: 0,
        bloodGroup: '',
        empId:1
      };
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  downloadReport(fileName: string  | undefined, MedicalReportFileName: string  | undefined) {
    const safeFileName = fileName ?? '';
    const safeFileName1 = MedicalReportFileName ?? '';
    this.helathInfoService.downloadMedicalReport(safeFileName).subscribe(
      (base64File: string) => {
        this.downloadFile(base64File, safeFileName1);
      },
      error => {
        console.error('Error downloading medical report', error);
      }
    );
  }

   downloadFile(base64File: string, fileName: string) {
    const link = document.createElement('a');
    link.href = base64File;
    link.download = fileName; // Specify the name for the downloaded file
    link.click();
  }


}


