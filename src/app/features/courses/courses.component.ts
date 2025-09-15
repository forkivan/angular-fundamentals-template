import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  @Input() courses: Array<any> = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onShow(id: string) { this.showCourse.emit(id); }
  onEdit(id: string) { this.editCourse.emit(id); }
  onDelete(id: string) { this.deleteCourse.emit(id); }
}
