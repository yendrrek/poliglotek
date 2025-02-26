import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ResponsiveHelper } from './helpers/responsive-helper';
import { LogoCustomBreakpoints } from '../enums/logo-custom-breakpoints';

@Directive({
  selector: '[logoResponsive]'
})

export class LogoResponsiveDirective extends ResponsiveHelper implements OnInit {

  private min599_98px: string = 'logo-min599_98px';
  private max599_98px: string = 'logo-max599_98px';
  private _350px_410px: string = 'logo-_350px_410px';
  private max349px: string = 'logo-max-349px';
  private classes: string[] = [this.min599_98px, this.max599_98px, this._350px_410px, this.max349px];

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
    this.breakpointObserver.observe([Breakpoints.XSmall, LogoCustomBreakpoints._350px_410px])
      .subscribe((result: BreakpointState) => {
        this.removeClasses(this.classes);
        this.addClasses(result);
      });
  }

  private addClasses(result: BreakpointState | undefined): void {
    if (this.isBreakpointMatched(Breakpoints.XSmall, result)) {
      this.addClassToRespectiveElement([this.max599_98px], 'logoResponsive');
    }
    if (this.isBreakpointMatched(LogoCustomBreakpoints._350px_410px, result)) {
      this.addClassToRespectiveElement([this._350px_410px], 'logoResponsive');
    }
    if (this.isBreakpointMatched(LogoCustomBreakpoints.Max349px, result)) {
      this.addClassToRespectiveElement([this.max349px], 'logoResponsive');
    }
    this.addClassToRespectiveElement([this.min599_98px], 'logoResponsive');
  }
}
