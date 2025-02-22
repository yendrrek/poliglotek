import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { FormFieldBreakpoints } from '../enums/form-field-breakpoints';

@Directive({
  selector: '[formFieldResponsive], [formResponsive] '
})
export class TranslationFormResponsiveDirective implements OnInit {

  private formFieldsWidth: string = 'search-form--field-width-max916px';
  private formContainerLayout: string = 'search-form-container--max916px';
  private selectDistanceReset: string = 'select-distance--reset';
  private classes: string[] = [this.formFieldsWidth, this.formContainerLayout, this.selectDistanceReset];

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.adjustFormWhenLoading();
    this.adjustFormDynamically();
  }

  private adjustFormWhenLoading(): void {
    this.removeClasses();
    if (this.isBreakpointMatched(undefined)) {
      this.addClasses();
    }
  }

  private adjustFormDynamically(): void {
    this.breakpointObserver.observe(FormFieldBreakpoints.max916px)
      .subscribe((result: BreakpointState) => {
        this.removeClasses();
        if (this.isBreakpointMatched(result)) {
          this.addClasses();
        }
      });
  }

  private isBreakpointMatched(result: BreakpointState | undefined): boolean {
    return result && result.breakpoints[FormFieldBreakpoints.max916px] ||
      this.breakpointObserver.isMatched(FormFieldBreakpoints.max916px);
  }

  private addClasses(): void {
    if (this.element.nativeElement.hasAttribute('formResponsive')) {
      this.renderer.addClass(this.element.nativeElement, this.formContainerLayout);
    }
    if (this.element.nativeElement.hasAttribute('formFieldResponsive')) {
      this.renderer.addClass(this.element.nativeElement, this.formFieldsWidth);
      this.renderer.addClass(this.element.nativeElement, this.selectDistanceReset);
    }
  }

  private removeClasses(): void {
    this.classes.forEach((cls: string) => this.renderer.removeClass(this.element.nativeElement, cls));
  }
}
