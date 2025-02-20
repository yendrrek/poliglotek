import { Directive, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { FormLabelBreakpoints } from '../models/form-label-breakpoints';

@Directive({
  selector: '[formFieldFontResponsive]'
})
export class FormLabelResponsiveDirective implements OnInit {

  private formLabelFontSize: string = 'form-label-font-size';
  private classes: string[] = [this.formLabelFontSize];

  @Output() queryLabelLayoutChange: EventEmitter<string> = new EventEmitter<string>();
  queryLabel: string = '';

  @Output() langCodeLabelLayoutChange: EventEmitter<string> = new EventEmitter<string>();
  langCodeLabel: string = '';

  @Output() countryCodeLabelLayoutChange: EventEmitter<string> = new EventEmitter<string>();
  countryCodeLabel: string = '';

  private breakpoints: FormLabelBreakpoints = {
    min1250px: '(min-width: 1250px)',
    _719_1249px: '(min-width: 719px) and (max-width: 1249px)',
    _718px: '(max-width: 718px)'
  };

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.adjustFormFieldFontSize(this.breakpoints);
    this.observeBreakpoints(this.breakpoints);
  }

  private adjustFormFieldFontSize(breakpoints: FormLabelBreakpoints): void {
    this.removeClasses();
    if (this.breakpointObserver.isMatched(breakpoints.min1250px)) {
      this.setLabelsForBreakpoint1250px();
      return;
    }
    if (this.breakpointObserver.isMatched(breakpoints._719_1249px)) {
      this.setLabelsForBreakpoint719_1249px();
      return;
    }
    if (this.breakpointObserver.isMatched(breakpoints._718px)) {
      this.setLabelsForBreakpoint719_1249px();
      this.renderer.addClass(this.element.nativeElement, this.formLabelFontSize);
    }
  }

  private setLabelsForBreakpoint1250px(): void {
    this.queryLabel = 'Szukana fraza po polsku';
    this.queryLabelLayoutChange.emit(this.queryLabel);

    this.langCodeLabel = 'Tłumacz frazę na';
    this.langCodeLabelLayoutChange.emit(this.langCodeLabel);

    this.countryCodeLabel = 'Kraj wyników';
    this.countryCodeLabelLayoutChange.emit(this.countryCodeLabel);
  }

  private setLabelsForBreakpoint719_1249px(): void {
    this.queryLabel = '<span>Szukana fraza</span><br><span>po polsku</span>';
    this.queryLabelLayoutChange.emit(this.queryLabel);

    this.langCodeLabel = '<span>Tłumacz</span><br><span>frazę na</span>';
    this.langCodeLabelLayoutChange.emit(this.langCodeLabel);

    this.countryCodeLabel = '<span>Kraj</span><br><span>wyników</span>';
    this.countryCodeLabelLayoutChange.emit(this.countryCodeLabel);
  }

  private observeBreakpoints(breakpoints: FormLabelBreakpoints): void {
    this.breakpointObserver.observe([breakpoints.min1250px, breakpoints._719_1249px, breakpoints._718px])
      .subscribe((result: BreakpointState) => {
        this.removeClasses();
        if (result.breakpoints[breakpoints.min1250px]) {
          this.setLabelsForBreakpoint1250px();
          return;
        }
        if (result.breakpoints[breakpoints._719_1249px]) {
          this.setLabelsForBreakpoint719_1249px();
          return;
        }
        if (result.breakpoints[breakpoints._718px]) {
          this.setLabelsForBreakpoint719_1249px();
          this.renderer.addClass(this.element.nativeElement, this.formLabelFontSize);
        }
      });
  }

  private removeClasses(): void {
    this.classes.forEach((cls: string) => this.renderer.removeClass(this.element.nativeElement, cls));
  }
}
