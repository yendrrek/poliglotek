import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { FormFieldBreakpoints } from '../enums/form-field-breakpoints';
import { ResponsiveHelper } from './helpers/responsive-helper';

@Directive({
  selector: '[formFieldResponsive], [formResponsive], [searchButtonResponsive]'
})
export class TranslationFormResponsiveDirective extends ResponsiveHelper implements OnInit {

  private formFieldsWidth: string = 'search-form--field-width-max916px';
  private formContainerLayout: string = 'search-form-container--max916px';
  private selectElementDistanceReset: string = 'select-distance--reset';
  private searchButtonLayout: string = 'search-button--column-layout';
  private classes: string[] = [
    this.formFieldsWidth,
    this.formContainerLayout,
    this.selectElementDistanceReset,
    this.searchButtonLayout
  ];

  constructor(
    breakpointObserver: BreakpointObserver,
    renderer: Renderer2,
    element: ElementRef,
  ) {
    super(breakpointObserver, renderer, element);
  }

  ngOnInit(): void {
    this.adjustFormWhenLoading();
    this.adjustFormWhenResizingDynamically();
  }

  private adjustFormWhenLoading(): void {
    this.removeClasses(this.classes);
    this.addClasses(undefined);
  }

  private adjustFormWhenResizingDynamically(): void {
    this.breakpointObserver.observe(FormFieldBreakpoints.max916px)
      .subscribe((result: BreakpointState) => {
        this.removeClasses(this.classes);
        this.addClasses(result);
      });
  }

  private addClasses(result: BreakpointState | undefined): void {
    if (this.isBreakpointMatched(FormFieldBreakpoints.max916px, result)) {
      this.addClassToRespectiveElement([this.formContainerLayout], 'formResponsive');
      this.addClassToRespectiveElement([this.formFieldsWidth, this.selectElementDistanceReset], 'formFieldResponsive');
      this.addClassToRespectiveElement([this.searchButtonLayout], 'searchButtonResponsive');

    }
  }
}
