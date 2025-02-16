import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Directive({
  selector: '[responsive]'
})
export class ResponsiveDirective implements OnInit {

  @Input() responsive!: 'show' | 'hide';

  ngOnInit() {
    const breakPoints: string[] = [Breakpoints.Small, Breakpoints.XSmall];
    const currentBreakpoint: boolean = this.breakpointObserver.isMatched(breakPoints);
    this.showOrHideNavigation(currentBreakpoint);

    this.breakpointObserver.observe(breakPoints).subscribe((result: BreakpointState) => {
      this.showOrHideNavigation(result.matches);
    });
  }

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver
  ) {}

  private showOrHideNavigation(isSmallScreen: boolean): void {
    const showClass = 'show';
    const hideClass = 'hide';
    const addClass: 'show' | 'hide' = isSmallScreen === (this.responsive === 'show') ? showClass : hideClass;
    const removeClass: 'show' | 'hide' = isSmallScreen === (this.responsive === 'show') ? hideClass : showClass;
    this.renderer.addClass(this.element.nativeElement, addClass);
    this.renderer.removeClass(this.element.nativeElement, removeClass);
  }
}
