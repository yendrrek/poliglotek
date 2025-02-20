import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { LogoBreakpoints } from '../models/logo-breakpoints';

@Directive({
  selector: '[logoResponsive]'
})

export class LogoResponsiveDirective implements OnInit {

  private logoBigger: string = 'logo-bigger';
  private logoSmaller: string = 'logo-smaller';
  private logo400px: string = 'logo-400px';
  private classes: string[] = [this.logoBigger, this.logoSmaller, this.logo400px];
  private breakpoints: LogoBreakpoints = {
    xsmall: Breakpoints.XSmall,
    _400px: '(max-width: 400px)'
  };

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.adjustLogoSize(this.breakpoints);
    this.observeBreakpointsForLogo(this.breakpoints);
  }

  private adjustLogoSize(breakpoints: LogoBreakpoints): void {
    this.classes.forEach((cls: string) => this.renderer.removeClass(this.element.nativeElement, cls));
    if (this.breakpointObserver.isMatched(breakpoints.xsmall)) {
      this.renderer.addClass(this.element.nativeElement, this.logoSmaller);
      return;
    }
    if (this.breakpointObserver.isMatched(breakpoints._400px)) {
      this.renderer.addClass(this.element.nativeElement, this.logo400px);
      return;
    }
    this.renderer.addClass(this.element.nativeElement, this.logoBigger);
  }

  private observeBreakpointsForLogo(breakpoints: LogoBreakpoints): void {
    console.log('breakpoints', breakpoints);
    this.breakpointObserver.observe([breakpoints.xsmall, breakpoints._400px])
      .subscribe((result: BreakpointState) => {
        this.classes.forEach((cls: string) => this.renderer.removeClass(this.element.nativeElement,cls));
        if (!result.matches) {
          this.renderer.addClass(this.element.nativeElement, this.logoBigger);
          return;
        }
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.renderer.addClass(this.element.nativeElement, this.logoSmaller);
        }

        if (result.breakpoints[this.breakpoints._400px]) {
          this.renderer.addClass(this.element.nativeElement, this.logo400px);
          this.renderer.removeClass(this.element.nativeElement, this.logoSmaller);
        }
      });
  }
}
