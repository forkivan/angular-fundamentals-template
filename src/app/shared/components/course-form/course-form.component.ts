import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from '@app/services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  submitted = false;
  isEdit = false;
  courseId: string | null = null;
  isSubmitting = false;
  private currentCourse?: Course;

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private route: ActivatedRoute,
    private router: Router,
    private coursesStore: CoursesStoreService
  ) {
    library.addIconPacks(fas);

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      author: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      duration: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.isEdit = true;
      this.coursesStore.getCourse(this.courseId).subscribe({
        next: course => {
          this.currentCourse = course;
          const title = course?.title ?? '';
          const description = course?.description ?? '';
          const duration = course?.duration ?? 0;
          const authors = course?.authors ?? [];

          this.courseForm.patchValue({ title, description, duration });

          const ca = this.courseAuthors;
          while (ca.length) ca.removeAt(0);
          for (const a of authors) ca.push(this.fb.control(a));
        },
        error: () => {}
      });
    }
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

    const value = (this.authorControl.value as string).trim();
    if (!value) return;

    this.authors.push(this.fb.control(value));
    this.authorControl.reset();
  }

  removeAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  addAuthorToCourse(index: number): void {
    const ctrl = this.authors.at(index) as FormControl;
    if (!ctrl) return;

    const val = ctrl.value;
    const already = this.courseAuthorsControls.some(c => c.value === val);
    if (!already) {
      this.courseAuthors.push(this.fb.control(val));
    }
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
    if (this.courseForm.invalid) return;

    this.isSubmitting = true;

    const authorsList = this.courseAuthorsControls.map(c => c.value);
    const durationVal = Number(this.courseForm.get('duration')?.value) || 0;

    if (this.isEdit && this.courseId) {
      const payload: Course = {
        id: this.courseId,
        title: this.courseForm.get('title')?.value,
        description: this.courseForm.get('description')?.value,
        duration: durationVal,
        authors: authorsList,
        creationDate: this.currentCourse?.creationDate ?? new Date().toISOString(),
      };

      this.coursesStore.editCourse(this.courseId, payload).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/courses']);
        },
        error: () => {
          this.isSubmitting = false;
          alert('Update failed');
        }
      });
    } else {
      const payload: Course = {
        id: String(Date.now()),
        title: this.courseForm.get('title')?.value,
        description: this.courseForm.get('description')?.value,
        duration: durationVal,
        authors: authorsList,
        creationDate: new Date().toISOString(),
      };

      this.coursesStore.createCourse(payload).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/courses']);
        },
        error: () => {
          this.isSubmitting = false;
          alert('Create failed');
        }
      });
    }
  }
}
