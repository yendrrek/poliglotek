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
    const showClass = 'show';
    const hideClass = 'hide';
    const shouldHamburgerMenuBeActive: boolean = this.menuResponsive === showClass;
    const classToAdd: CssClassToggle = isSmallScreen === shouldHamburgerMenuBeActive ? showClass : hideClass;
    const classToRemove: CssClassToggle = isSmallScreen === shouldHamburgerMenuBeActive ? hideClass : showClass;
    this.toggleVisibility(classToAdd, classToRemove);
  }

  private toggleVisibility(classToAdd: string, classToRemove: string): void {
    this.addClassToRespectiveElement([classToAdd], 'menuResponsive');
    this.removeClasses([classToRemove]);
  }

  private adjustRightMenuWhenResizingDynamically(): void {
    this.breakpointObserver.observe(RightMenuCustomBreakpoints.Max960px)
      .subscribe((result: BreakpointState) => {
      this.adjustRightMenuWhenLoading(result.matches);
    });
  }
}
