import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ResponsiveHelper } from '../shared/responsive-helper';
import { TRANSLATION_FORM_RESPONSIVE_STYLES } from './translation-responsive-styles';
import { SharedCustomBreakpoints } from '../shared/shared-custom-breakpoints';

@Directive({
  selector: '[formFieldResponsive], [formResponsive], [searchButtonResponsive]'
})
export class TranslationResponsiveDirective extends ResponsiveHelper implements OnInit {

  private styles: string[] = [
    TRANSLATION_FORM_RESPONSIVE_STYLES['search-form--field-width-max916px'],
    TRANSLATION_FORM_RESPONSIVE_STYLES['search-form-container-column'],
    TRANSLATION_FORM_RESPONSIVE_STYLES['search-form-container-column_margin-top-modifier--600px_916px'],
    TRANSLATION_FORM_RESPONSIVE_STYLES['search-form-container-column_margin-top-modifier--410_5px_599_98px'],
    TRANSLATION_FORM_RESPONSIVE_STYLES['search-form-container-column_margin-top-modifier--350px_410px'],
    TRANSLATION_FORM_RESPONSIVE_STYLES['search-form-container-column_margin-top-modifier--max349px'],
    TRANSLATION_FORM_RESPONSIVE_STYLES['select-distance--reset'],
    TRANSLATION_FORM_RESPONSIVE_STYLES['search-button--column-layout']
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
    this.removeStyles(this.styles);
    this.addClasses(undefined);
  }

  private adjustFormWhenResizingDynamically(): void {
    this.breakpointObserver.observe(
      [
        SharedCustomBreakpoints._600px_916px,
        SharedCustomBreakpoints._410_5px_599_98px,
        SharedCustomBreakpoints._350px_410px,
        SharedCustomBreakpoints.Max349_5px
      ]
    )
      .subscribe((result: BreakpointState) => {
        this.removeStyles(this.styles);
        this.addClasses(result);
      });
  }

  private addClasses(result: BreakpointState | undefined): void {
    if (this.isBreakpointMatched(SharedCustomBreakpoints._600px_916px, result)) {
      this.addStylesToRespectiveElements(
        TRANSLATION_FORM_RESPONSIVE_STYLES['search-form-container-column_margin-top-modifier--600px_916px']);
    }
    if (this.isBreakpointMatched(SharedCustomBreakpoints._410_5px_599_98px, result)) {
      this.addStylesToRespectiveElements(
        TRANSLATION_FORM_RESPONSIVE_STYLES['search-form-container-column_margin-top-modifier--410_5px_599_98px']);
    }
    if (this.isBreakpointMatched(SharedCustomBreakpoints._350px_410px, result)) {
      this.addStylesToRespectiveElements(
        TRANSLATION_FORM_RESPONSIVE_STYLES['search-form-container-column_margin-top-modifier--350px_410px']);
    }
    if (this.isBreakpointMatched(SharedCustomBreakpoints.Max349_5px, result)) {
      this.addStylesToRespectiveElements(
        TRANSLATION_FORM_RESPONSIVE_STYLES['search-form-container-column_margin-top-modifier--max349px']);
    }
  }

  private addStylesToRespectiveElements(marginTopModifierStyle: string): void {
    this.addStyleToRespectiveElement(
      [TRANSLATION_FORM_RESPONSIVE_STYLES['search-form-container-column'],
        marginTopModifierStyle],
      'formResponsive'
    );
    this.addStyleToRespectiveElement(
      [TRANSLATION_FORM_RESPONSIVE_STYLES['search-form--field-width-max916px'],
        TRANSLATION_FORM_RESPONSIVE_STYLES['select-distance--reset']],
      'formFieldResponsive'
    );
    this.addStyleToRespectiveElement(
      [TRANSLATION_FORM_RESPONSIVE_STYLES['search-button--column-layout']],
      'searchButtonResponsive'
    );
  }
}
