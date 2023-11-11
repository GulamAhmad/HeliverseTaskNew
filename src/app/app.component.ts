import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';
import { PaginationComponent } from './pagination/pagination.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TeamsModalComponent } from './component/teams-modal/teams-modal.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PaginationComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'User Data';
  data: any[] = [];
  currentPage: number = 0;
  pageSize: number = 20;
  filteredData: any[] = [];
  filterForm: FormGroup;
  selectedData: any | null = null;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.filterForm = this.fb.group({
      filterValue: [''],
      gender: [''],
      domain: [''],
      available: [''],
    });
  }

  ngOnInit() {
    this.loadData();
  }

  openDialog() {
    const dialogRef = this.dialog.open(TeamsModalComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.dataService.clearSelectedData()
    });
  }

  loadData() {
    this.dataService.getData().subscribe((result) => {
      this.data = result;
      this.updateFilteredData();
      this.getPaginatedData();
    });
  }

  onSelectData(data: any) {
    this.dataService.addSelectedData(data);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getTotalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  updateFilteredData() {
    const filterControl = this.filterForm.get('filterValue');
    const genderControl = this.filterForm.get('gender');
    const domainControl = this.filterForm.get('domain');
    const availableControl = this.filterForm.get('available');

    if (filterControl || genderControl || domainControl || availableControl) {
      const filterValue = filterControl!.value.toLowerCase();
      const genderValue = genderControl!.value;
      const domainValue = domainControl!.value;
      const availableValue = availableControl!.value;
      this.filteredData = this.data.filter(
        (item) =>
          (filterValue
            ? item.first_name
                .concat(item.last_name)
                .toLowerCase()
                .includes(filterValue)
            : true) &&
          (genderValue ? item.gender == genderValue : true) &&
          (domainValue ? item.domain == domainValue : true) &&
          (availableValue ? String(item.available) == availableValue : true)
      );
    }
  }

  getPaginatedData(): any[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.filteredData.slice(startIndex, startIndex + this.pageSize);
  }

  onFilterChange() {
    this.updateFilteredData();
    this.getPaginatedData();
  }
}
