import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]',
  exportAs: 'togglePassword'
})
export class TogglePasswordDirective implements OnInit {
  private _visible = false;

  constructor(private el: ElementRef<HTMLInputElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    const current = this.el.nativeElement.getAttribute('type');
    if (current !== 'password' && current !== 'text') {
      this.renderer.setAttribute(this.el.nativeElement, 'type', 'password');
    }
  }

  toggle(): void {
    this._visible = !this._visible;
    this.renderer.setAttribute(this.el.nativeElement, 'type', this._visible ? 'text' : 'password');
  }

  get visible(): boolean {
    return this._visible;
  }
}
