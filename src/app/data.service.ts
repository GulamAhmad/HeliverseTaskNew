import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data = 'assets/heliverse_mock_data.json';
  private selectedDataSubject = new BehaviorSubject<any[]>([]);
  selectedData$ = this.selectedDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  addSelectedData(data: any) {
    const currentSelectedData = this.selectedDataSubject.value;
     // Check if the domain already exists in the selected data
     const isDuplicateDomain = currentSelectedData.some(item => item.domain === data.domain);

     if (isDuplicateDomain) {
       // Display an alert or show a pop-up indicating that the domain is already added
       alert("Member from this domain is already added")
     } else {
       // Add the data to selectedDataSubject
       this.selectedDataSubject.next([...currentSelectedData, data]);
       alert("Member Addded Successfully")        
     }
  }

  getSelectedData(): any[] {
    return this.selectedDataSubject.value;
  }

  clearSelectedData() {
    this.selectedDataSubject.next([]);
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.data);
  }
}
