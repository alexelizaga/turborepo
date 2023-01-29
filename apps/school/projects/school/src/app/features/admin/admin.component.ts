import { AfterViewInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Course } from '../../core/models/course.model';
import { CourseService } from './../../core/services/course.service';

@Component({
  selector: 'my-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit {
  items: Observable<Course[]>;
  displayedColumns: string[] = ['cap', 'id', 'tech', 'title', 'free', 'comingSoon', 'edit'];
  columnsToDisplay = ['cap', 'id', 'tech','title', 'free', 'comingSoon'];
  dataSource!: MatTableDataSource<Course>;

  constructor(private readonly itemService: CourseService) {
    this.items = this.itemService.getCourses();
    this.items.subscribe( items => {
      this.dataSource = new MatTableDataSource(items);
    });
   }

  ngAfterViewInit(): void {

  }

}
