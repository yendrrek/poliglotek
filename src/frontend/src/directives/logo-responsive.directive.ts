import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ResponsiveHelper } from './helpers/responsive-helper';
import { LogoCustomBreakpoints } from '../enums/logo-custom-breakpoints';

@Directive({
  selector: '[logoResponsive]'
})

export class LogoResponsiveDirective extends ResponsiveHelper implements OnInit {

  private logoBigger: string = 'logo-bigger';
  private logoSmaller: string = 'logo-smaller';
  private logo400px: string = 'logo-400px';
  private classes: string[] = [this.logoBigger, this.logoSmaller, this.logo400px];

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
    this.removeClasses(this.classes);
    this.addClasses(undefined);
  }

  private adjustLogoWhenResizingDynamically(): void {
    this.breakpointObserver.observe([Breakpoints.XSmall, LogoCustomBreakpoints.Max400px])
      .subscribe((result: BreakpointState) => {
        this.removeClasses(this.classes);
        this.addClasses(result);
      });
  }

  private addClasses(result: BreakpointState | undefined): void {
    if (this.isBreakpointMatched(Breakpoints.XSmall, result)) {
      this.addClassToRespectiveElement([this.logoSmaller], 'logoResponsive');
    }
    if (this.isBreakpointMatched(LogoCustomBreakpoints.Max400px, result)) {
      this.addClassToRespectiveElement([this.logo400px], 'logoResponsive');
    }
    this.addClassToRespectiveElement([this.logoBigger], 'logoResponsive');
  }
}
