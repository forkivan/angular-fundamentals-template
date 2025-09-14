import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseForm: FormGroup;

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);

    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      author: [''],
      authors: this.fb.array([]),
      duration: [null, Validators.required]
    });
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  addAuthor() {
    const value = this.courseForm.get('author')?.value;
    if (value && value.trim()) {
      this.authors.push(this.fb.control(value.trim()));
      this.courseForm.get('author')?.setValue('');
    }
  }

  removeAuthor(index: number) {
    this.authors.removeAt(index);
  }

  submit() {
    if (this.courseForm.valid) {
      // 
    }
  }
}
