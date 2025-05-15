import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ResponsiveHelper } from '../shared/responsive-helper';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ABOUT_RESPONSIVE_STYLES, AboutResponsiveStyles } from './about-responsive-styles';
import { SharedCustomBreakpoints } from '../shared/shared-custom-breakpoints';

@Directive({
  selector: '[aboutResponsive]'
})
export class AboutResponsiveDirective extends ResponsiveHelper implements OnInit {

  private styles: AboutResponsiveStyles[] = [
    ABOUT_RESPONSIVE_STYLES['about-_600px_959_98px'],
    ABOUT_RESPONSIVE_STYLES['about-max599_98px'],
    ABOUT_RESPONSIVE_STYLES['about_margin-top-modifier--600px_959_98px'],
    ABOUT_RESPONSIVE_STYLES['about_margin-top-modifier--410_5px_599_98px'],
    ABOUT_RESPONSIVE_STYLES['about_margin-top-modifier--350px_410px'],
    ABOUT_RESPONSIVE_STYLES['about_margin-top-modifier--max349px']
  ];

  constructor(
    breakpointObserver: BreakpointObserver,
    renderer: Renderer2,
    element: ElementRef
  ) {
    super(breakpointObserver, renderer, element);
  }

  ngOnInit(): void {
    this.adjustAboutWhenLoading();
    this.adjustAboutWhenResizingDynamically();
  }

  private adjustAboutWhenLoading(): void {
    this.removeStyles(this.styles);
    this.addClasses(undefined);
  }

  private adjustAboutWhenResizingDynamically() {
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
      this.addStyleToRespectiveElement(
        [ABOUT_RESPONSIVE_STYLES['about-_600px_959_98px'],
          ABOUT_RESPONSIVE_STYLES['about_margin-top-modifier--600px_959_98px']],
        'aboutResponsive');
    }
    if (this.isBreakpointMatched(SharedCustomBreakpoints._410_5px_599_98px, result)) {
      this.addStyleToRespectiveElement(
        [ABOUT_RESPONSIVE_STYLES['about-max599_98px'],
          ABOUT_RESPONSIVE_STYLES['about_margin-top-modifier--410_5px_599_98px']],
        'aboutResponsive');
    }
    if (this.isBreakpointMatched(SharedCustomBreakpoints._350px_410px, result)) {
      this.addStyleToRespectiveElement(
        [ABOUT_RESPONSIVE_STYLES['about-max599_98px'],
          ABOUT_RESPONSIVE_STYLES['about_margin-top-modifier--350px_410px']],
        'aboutResponsive');
    }
    if (this.isBreakpointMatched(SharedCustomBreakpoints.Max349_5px, result)) {
      this.addStyleToRespectiveElement(
        [ABOUT_RESPONSIVE_STYLES['about-max599_98px'],
          ABOUT_RESPONSIVE_STYLES['about_margin-top-modifier--max349px']],
        'aboutResponsive');
    }
  }
}
