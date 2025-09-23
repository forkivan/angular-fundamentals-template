import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseForm: FormGroup;
  submitted = false;

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      author: ['', [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      authors: this.fb.array([this.fb.control('Author One'), this.fb.control('Author Two')]),
      courseAuthors: this.fb.array([]),
      duration: [0, [Validators.required, Validators.min(0)]],
    });
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors(): FormArray {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  get authorsControls(): FormControl[] {
    return this.authors.controls as FormControl[];
  }

  get courseAuthorsControls(): FormControl[] {
    return this.courseAuthors.controls as FormControl[];
  }

  get authorControl(): FormControl {
    return this.courseForm.get('author') as FormControl;
  }


  addAuthor(): void {
    this.authorControl.markAsTouched();

    if (!this.authorControl.value || this.authorControl.invalid) return;

    this.authors.push(this.fb.control(this.authorControl.value.trim()));
    this.authorControl.reset();
  }

  removeAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  addAuthorToCourse(index: number): void {
    const ctrl = this.authors.at(index) as FormControl;
    if (!ctrl) return;
    this.courseAuthors.push(this.fb.control(ctrl.value));
    this.authors.removeAt(index);
  }

  removeAuthorFromCourse(index: number): void {
    const ctrl = this.courseAuthors.at(index) as FormControl;
    if (!ctrl) return;
    this.authors.push(this.fb.control(ctrl.value));
    this.courseAuthors.removeAt(index);
  }

  deleteAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  onSubmit(): void {
    this.submit();
  }

  submit(): void {
    this.submitted = true;
    if (this.courseForm.valid) {
      const payload = {
        title: this.courseForm.get('title')?.value,
        description: this.courseForm.get('description')?.value,
        duration: this.courseForm.get('duration')?.value,
        authors: this.courseAuthorsControls.map(c => c.value),
      };
      console.log('Course saved:', payload);
      
    }
  }
}
