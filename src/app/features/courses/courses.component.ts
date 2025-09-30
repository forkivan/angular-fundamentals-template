import { Component, OnInit } from "@angular/core";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { UserStoreService } from "@app/user/services/user-store.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  courses$ = this.coursesStore.courses$;
  isLoading$ = this.coursesStore.isLoading$;
  isAdmin$ = this.userStore.isAdmin$;

  searchValue: string = "";

  constructor(
    private coursesStore: CoursesStoreService,
    private userStore: UserStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.coursesStore.getAll();
  }
  onSearch() {
    const value = this.searchValue.trim();
    if (value) {
      this.coursesStore.filterCourses(value);
    } else {
      this.coursesStore.getAll();
    }
  }
  editCourse(courseId: string) {
    this.router.navigate([`/courses/edit/${courseId}`]);
  }
  showCourse(courseId: string) {
    this.router.navigate([`/courses/${courseId}`]);
  }
  deleteCourse(courseId: string) {
    this.coursesStore.deleteCourse(courseId);
  }
}