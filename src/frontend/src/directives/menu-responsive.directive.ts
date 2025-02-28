import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CssClassToggle } from '../types/css-class-toggle';
import { ResponsiveHelper } from './helpers/responsive-helper';
import { RightMenuCustomBreakpoints } from '../enums/right-menu-custom-breakpoints';

@Directive({
  selector: '[menuResponsive]'
})
export class MenuResponsiveDirective extends ResponsiveHelper implements OnInit {

  @Input() menuResponsive!: CssClassToggle;

  constructor(
    breakpointObserver: BreakpointObserver,
    renderer: Renderer2,
    element: ElementRef,
  ) {
    super(breakpointObserver, renderer, element);
  }

  ngOnInit(): void {
    this.adjustRightMenuWhenLoading(this.isBreakpointMatched(RightMenuCustomBreakpoints.Max960px, undefined));
    this.adjustRightMenuWhenResizingDynamically();
  }

  private adjustRightMenuWhenLoading(isSmallScreen: boolean): void {
    const showStyle = 'showMenu';
    const hideStyle = 'hideMenu';
    const shouldHamburgerMenuBeActive: boolean = this.menuResponsive === showStyle;
    const styleToAdd: CssClassToggle = isSmallScreen === shouldHamburgerMenuBeActive ? showStyle : hideStyle;
    const styleToRemove: CssClassToggle = isSmallScreen === shouldHamburgerMenuBeActive ? hideStyle : showStyle;
    this.toggleVisibility(styleToAdd, styleToRemove);
  }

  private toggleVisibility(classToAdd: string, classToRemove: string): void {
    this.addStyleToRespectiveElement([classToAdd], 'menuResponsive');
    this.removeStyles([classToRemove]);
  }

  private adjustRightMenuWhenResizingDynamically(): void {
    this.breakpointObserver.observe(RightMenuCustomBreakpoints.Max960px)
      .subscribe((result: BreakpointState) => {
      this.adjustRightMenuWhenLoading(result.matches);
    });
  }
}
