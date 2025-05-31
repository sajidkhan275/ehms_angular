import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Healthinfomodel } from '../Models/healthinfomodel';

@Injectable({
  providedIn: 'root'
})
export class HealthinfoService {
  private apiUrl = 'https://localhost:7197/EmployeeHealthInfo';
  constructor(private http: HttpClient) {}

  CreateEmployeeHealthInfo(data: Healthinfomodel,file: File) {
    const formData = new FormData();
    formData.append('BloodGroup', data.bloodGroup?.toString() || '');
    formData.append('EmpId',"11");
    formData.append('Disability', data.disability?.toString() || 'false');
    formData.append('file', file, file.name);
       return this.http.post(this.apiUrl+'/CreateEmployeeHealthInfo', formData);
  }

  UpdateEmployeeHealthInfo(data: Healthinfomodel,file: File) {
    const formData = new FormData();
    formData.append('employeeHealthInfoId', data.employeeHealthInfoId?.toString() || '');
    formData.append('BloodGroup', data.bloodGroup?.toString() || '');
    formData.append('EmpId',"11");
    formData.append('Disability', data.disability?.toString() || 'false');
    formData.append('file', file, file.name);
    return this.http.put(this.apiUrl+'/UpdateEmployeeHealthInfo', formData);
  }

  GetAllEmployeeHealthInfo() {
     return this.http.get<Healthinfomodel[]>(`${this.apiUrl}/GetAllEmployeeHealthInfo`);
  }

  getEmployeeHealthInfoByEmpId(empId: number) {
    return this.http.get<Healthinfomodel[]>(`${this.apiUrl}/GetAllEmployeeHealthInfoByEmpId/${empId}`);
  }

  deleteEmployeeHealthInfo(id: number, medicalReportFileName: string) {
    const requestUrl = `${this.apiUrl}/DeleteEmployeeHealthInfo?id=${id}&medicalReportFileName=${medicalReportFileName}`;
    return this.http.delete(requestUrl);
  }

  downloadMedicalReport(fileName: string){
    return this.http.get(`${this.apiUrl}/DownloadMedicalReport?fileName=${fileName}`, { responseType: 'text' });
    //const requestUrl = `${this.apiUrl}/DownloadMedicalReport?fileName=${fileName}`;
    //return this.http.get(requestUrl);
  }
}
