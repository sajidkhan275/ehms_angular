import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../Models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = 'https://localhost:7197/Department';

  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http.get<Department[]>(`${this.apiUrl}/GetAllDepartments`);
  }

   addDepartment(data: Department) {
    console.log(JSON.stringify(data));
     return this.http.post(this.apiUrl+'/CreateDepartments', data);
   }
   updateDepartment(employee: Department) {
     return this.http.put(this.apiUrl+'/UpdateDepartments', employee);
   }
   deleteDepartment(id: number) {
    return this.http.delete(`${this.apiUrl+'/DeleteDepartments?id='}${id}`);
    //  return this.http.delete(`${this.apiUrl+'/DeleteDepartments?id='}/${id}`);
   }
}
