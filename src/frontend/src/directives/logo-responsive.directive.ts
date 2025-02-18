import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Directive({
  selector: '[logoResponsive]'
})
export class LogoResponsiveDirective implements OnInit {

  private classes: string[] = ['logo-bigger', 'logo-smaller', 'logo-400px'];

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.adjustLogoSize([Breakpoints.XSmall, '(max-width: 400px)']);
    this.observeBreakpointsForLogo([Breakpoints.XSmall, '(max-width: 400px)']);
  }

  private adjustLogoSize(breakpoints: string[]): void {
    this.classes.forEach((cls: string) => this.renderer.removeClass(this.element.nativeElement,cls));
    if (this.breakpointObserver.isMatched(breakpoints[0])) {
      this.renderer.addClass(this.element.nativeElement, 'logo-smaller');
      return;
    }
    if (this.breakpointObserver.isMatched(breakpoints[1])) {
      this.renderer.addClass(this.element.nativeElement, 'logo-400px');
      return;
    }
    this.renderer.addClass(this.element.nativeElement, 'logo-bigger');
  }

  private observeBreakpointsForLogo(breakpoints: string[]): void {
    console.log('breakpoints', breakpoints);
    this.breakpointObserver.observe(breakpoints).subscribe((result: BreakpointState) => {
      this.classes.forEach((cls: string) => this.renderer.removeClass(this.element.nativeElement,cls));
      if (!result.matches) {
        this.renderer.addClass(this.element.nativeElement, 'logo-bigger');
        return;
      }
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.renderer.addClass(this.element.nativeElement, 'logo-smaller');
      }

      if (result.breakpoints['(max-width: 400px)']) {
        this.renderer.addClass(this.element.nativeElement, 'logo-400px');
        this.renderer.removeClass(this.element.nativeElement, 'logo-smaller');
      }
    });
  }
}
