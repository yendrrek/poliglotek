import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ElementRef, Renderer2 } from '@angular/core';

export class ResponsiveHelper {

  constructor(
    protected breakpointObserver: BreakpointObserver,
    protected renderer: Renderer2,
    protected element: ElementRef) {}

  protected isBreakpointMatched(breakpoint: string, result: BreakpointState | undefined): boolean {
    return result && result.breakpoints[breakpoint] || this.breakpointObserver.isMatched(breakpoint);
  }

  protected removeStyles(classes: string[]): void {
    classes.forEach((cls: string) => this.renderer.removeClass(this.element.nativeElement, cls));
  }

  protected addStyleToRespectiveElement(classes: string[], attribute: string | undefined): void {
    if (this.element.nativeElement.hasAttribute(attribute)) {
      classes.forEach((cls: string) => this.renderer.addClass(this.element.nativeElement, cls));
    }
  }
}
