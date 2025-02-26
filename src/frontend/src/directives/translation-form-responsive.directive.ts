import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { TranslationFormCustomBreakpoints } from '../enums/translation-form-custom-breakpoints';
import { ResponsiveHelper } from './helpers/responsive-helper';

@Directive({
  selector: '[formFieldResponsive], [formResponsive], [searchButtonResponsive]'
})
export class TranslationFormResponsiveDirective extends ResponsiveHelper implements OnInit {

  private fieldsWidth: string = 'search-form--field-width-max916px';
  private formColumn: string = 'search-form-container-column';
  private modifierMax916px: string = 'search-form-container-column_margin-top-modifier--max916px';
  private modifierMax599_98px: string = 'search-form-container-column_margin-top-modifier--max599_98px';
  private modifier_350px_410px: string = 'search-form-container-column_margin-top-modifier--350px_410px';
  private modifierMax349px: string = 'search-form-container-column_margin-top-modifier--max349px';
  private selectDistanceReset: string = 'select-distance--reset';
  private buttonColumn: string = 'search-button--column-layout';
  private classes: string[] = [
    this.fieldsWidth,
    this.formColumn,
    this.modifierMax916px,
    this.modifierMax599_98px,
    this.modifier_350px_410px,
    this.modifierMax349px,
    this.selectDistanceReset,
    this.buttonColumn
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
    this.breakpointObserver.observe(
      [
        TranslationFormCustomBreakpoints.Max916px,
        Breakpoints.XSmall,
        TranslationFormCustomBreakpoints._350px_410px,
        TranslationFormCustomBreakpoints.Max349px
      ]
    )
      .subscribe((result: BreakpointState) => {
        this.removeClasses(this.classes);
        this.addClasses(result);
      });
  }

  private addClasses(result: BreakpointState | undefined): void {
    if (this.isBreakpointMatched(TranslationFormCustomBreakpoints.Max916px, result)) {
      this.addClassToRespectiveElement([this.formColumn, this.modifierMax916px], 'formResponsive');
      this.addClassToRespectiveElement([this.fieldsWidth, this.selectDistanceReset], 'formFieldResponsive');
      this.addClassToRespectiveElement([this.buttonColumn], 'searchButtonResponsive');
    }
    if (this.isBreakpointMatched(Breakpoints.XSmall, result)) {
      this.addClassToRespectiveElement([this.modifierMax599_98px], 'formResponsive');
    }
    if (this.isBreakpointMatched(TranslationFormCustomBreakpoints._350px_410px, result)) {
      this.addClassToRespectiveElement([this.modifier_350px_410px], 'formResponsive');
    }
    if (this.isBreakpointMatched(TranslationFormCustomBreakpoints.Max349px, result)) {
      this.addClassToRespectiveElement([this.modifierMax349px], 'formResponsive');
    }
  }
}
