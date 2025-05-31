import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employeemodel } from '../Models/employeemodel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7197/Employee';

  constructor(private http: HttpClient) {}

  CreateEmployee(data:Employeemodel){
    console.log(JSON.stringify(data));
    return this.http.post(this.apiUrl+'/CreateEmployee', data);
  }

  UpdateEmployee(data:Employeemodel){
    return this.http.put(this.apiUrl+'/UpdateEmployee', data);
  }

  GetAllEmployee(){
    return this.http.get<Employeemodel[]>(this.apiUrl+'/GetAllEmployees');
  }

  DeleteEmployee(id: number){
       //return this.http.get(`${this.apiUrl}/DeleteEmployee/${id}`);
       return this.http.delete(`${this.apiUrl+'/DeleteEmployee?id='}${id}`);
  }
}
