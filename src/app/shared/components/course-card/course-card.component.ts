import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() title: string = '';
  @Input() description?: string;
  @Input() authors?: string;
  @Input() duration?: string;
  @Input() creationDate?: string;

  @Output() show = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onShow() { this.show.emit(); }
  onEdit() { this.edit.emit(); }
  onDelete() { this.delete.emit(); }
}
