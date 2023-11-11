import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-teams-modal',
  standalone: true,
  imports: [CommonModule,MatDialogModule, MatButtonModule,MatCardModule ],
  templateUrl: './teams-modal.component.html',
  styleUrl: './teams-modal.component.css'
})
export class TeamsModalComponent {
  selectedData: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.selectedData = this.dataService.getSelectedData();
  }

}
