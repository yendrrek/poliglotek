import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { CssClassToggle } from '../types/css-class-toggle';

@Directive({
  selector: '[menuResponsive]'
})
export class MenuResponsiveDirective implements OnInit {

  @Input() menuResponsive!: CssClassToggle;

  ngOnInit(): void {
    this.toggleNavigation(this.breakpointObserver.isMatched([Breakpoints.Small, Breakpoints.XSmall]));
    this.observeBreakpointsForNavigation([Breakpoints.Small, Breakpoints.XSmall]);
  }

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver
  ) {}

  private toggleNavigation(isSmallScreen: boolean): void {
    const showClass = 'show';
    const hideClass = 'hide';
    const shouldHamburgerMenuBeActive: boolean = this.menuResponsive === showClass;
    const addClass: CssClassToggle = isSmallScreen === shouldHamburgerMenuBeActive ? showClass : hideClass;
    const removeClass: CssClassToggle = isSmallScreen === shouldHamburgerMenuBeActive ? hideClass : showClass;
    this.toggleCSSClass(addClass, removeClass);
  }

  private toggleCSSClass(addClass: string, removeClass: string): void {
    this.renderer.addClass(this.element.nativeElement, addClass);
    this.renderer.removeClass(this.element.nativeElement, removeClass);
  }

  private observeBreakpointsForNavigation(breakpoints: string[]): void {
    this.breakpointObserver.observe(breakpoints).subscribe((result: BreakpointState) => {
      this.toggleNavigation(result.matches);
    });
  }
}
