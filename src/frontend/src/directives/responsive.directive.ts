import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { CssClassToggle } from '../types/css-class-toggle';
import { LogoSizeToggle } from '../types/logo-size-toggle';

@Directive({
  selector: '[responsiveNavigation], [responsiveLogo]'
})
export class ResponsiveDirective implements OnInit {

  @Input() responsiveNavigation!: CssClassToggle;
  @Input() responsiveLogo!: 'logo-smaller';

  ngOnInit() {
    this.toggleNavigation(this.isMatchingBreakpoint([Breakpoints.Small, Breakpoints.XSmall]));
    this.observeBreakpointsForNavigation([Breakpoints.Small, Breakpoints.XSmall]);
    this.adjustLogoSize(this.isMatchingBreakpoint([Breakpoints.XSmall]));
    this.observeBreakpointsForLogo(Breakpoints.XSmall);
  }

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver
  ) {}

  private toggleNavigation(isSmallScreen: boolean): void {
    const showClass = 'show';
    const hideClass = 'hide';
    const shouldHamburgerMenuBeActive: boolean = this.responsiveNavigation === showClass;
    const addClass: CssClassToggle = isSmallScreen === shouldHamburgerMenuBeActive ? showClass : hideClass;
    const removeClass: CssClassToggle = isSmallScreen === shouldHamburgerMenuBeActive ? hideClass : showClass;
    this.toggleCSSClass(addClass, removeClass, 'responsiveNavigation');
  }

  private adjustLogoSize(isSmallScreen: boolean): void {
    const biggerLogo = 'logo-bigger';
    const smallerLogo = 'logo-smaller';
    const shouldLogoBeSmaller: boolean = this.responsiveLogo === smallerLogo;
    const addClass: LogoSizeToggle = isSmallScreen === shouldLogoBeSmaller ? smallerLogo : biggerLogo;
    const removeClass: LogoSizeToggle = isSmallScreen === shouldLogoBeSmaller ? biggerLogo : smallerLogo;
    this.toggleCSSClass(addClass, removeClass, 'responsiveLogo');
  }

  private toggleCSSClass(addClass: string, removeClass: string, attribute: string): void {
    if (this.element.nativeElement.hasAttribute(attribute)) {
      this.renderer.addClass(this.element.nativeElement, addClass);
      this.renderer.removeClass(this.element.nativeElement, removeClass);
    }
  }

  private isMatchingBreakpoint(breakpoints: string[]): boolean {
    return this.breakpointObserver.isMatched(breakpoints);
  }

  private observeBreakpointsForNavigation(breakpoints: string[]): void {
    this.breakpointObserver.observe(breakpoints).subscribe((result: BreakpointState) => {
      this.toggleNavigation(result.matches);
    });
  }
  private observeBreakpointsForLogo(breakpoint: string): void {
    this.breakpointObserver.observe(breakpoint).subscribe((result: BreakpointState) => {
      this.adjustLogoSize(result.matches);
    });
  }
}
