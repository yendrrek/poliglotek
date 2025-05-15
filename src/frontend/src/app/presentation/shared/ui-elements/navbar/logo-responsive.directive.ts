import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ResponsiveHelper } from '../../responsive-helper';
import { LogoCustomBreakpoints } from './logo-custom-breakpoints';
import { LOGO_RESPONSIVE_STYLES } from './logo-responsive-styles';

@Directive({
  selector: '[logoResponsive]'
})

export class LogoResponsiveDirective extends ResponsiveHelper implements OnInit {

  private styles: string[] = [
    LOGO_RESPONSIVE_STYLES['logo-min599_98px'],
    LOGO_RESPONSIVE_STYLES['logo-_410_5px_599_5px'],
    LOGO_RESPONSIVE_STYLES['logo-_350px_410px'],
    LOGO_RESPONSIVE_STYLES['logo-max-349px']
  ];

  constructor(
    breakpointObserver: BreakpointObserver,
    renderer: Renderer2,
    element: ElementRef,
  ) {
    super(breakpointObserver, renderer, element);
  }

  ngOnInit(): void {
    this.adjustLogoWhenLoading();
    this.adjustLogoWhenResizingDynamically();
  }

  private adjustLogoWhenLoading(): void {
    this.removeStyles(this.styles);
    this.addClasses(undefined);
  }

  private adjustLogoWhenResizingDynamically(): void {
    this.breakpointObserver.observe([Breakpoints.XSmall, LogoCustomBreakpoints._350px_410px])
      .subscribe((result: BreakpointState) => {
        this.removeStyles(this.styles);
        this.addClasses(result);
      });
  }

  private addClasses(result: BreakpointState | undefined): void {
    this.addStyleToRespectiveElement([LOGO_RESPONSIVE_STYLES['logo-min599_98px']], 'logoResponsive');
    if (this.isBreakpointMatched(LogoCustomBreakpoints._410_5px_599_5px, result)) {
      this.addStyleToRespectiveElement([LOGO_RESPONSIVE_STYLES['logo-_410_5px_599_5px']], 'logoResponsive');
    }
    if (this.isBreakpointMatched(LogoCustomBreakpoints._350px_410px, result)) {
      this.addStyleToRespectiveElement([LOGO_RESPONSIVE_STYLES['logo-_350px_410px']], 'logoResponsive');
    }
    if (this.isBreakpointMatched(LogoCustomBreakpoints.Max349px, result)) {
      this.addStyleToRespectiveElement([LOGO_RESPONSIVE_STYLES['logo-max-349px']], 'logoResponsive');
    }
  }
}
