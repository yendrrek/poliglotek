const TRANSLATION_FORM_RESPONSIVE_STYLES_ARRAY = [
  'search-form--field-width-max916px',
  'search-form-container-column',
  'search-form-container-column_margin-top-modifier--600px_916px',
  'search-form-container-column_margin-top-modifier--410_5px_599_98px',
  'search-form-container-column_margin-top-modifier--350px_410px',
  'search-form-container-column_margin-top-modifier--max349px',
  'select-distance--reset',
  'search-button--column-layout'
] as const;

export const TRANSLATION_FORM_RESPONSIVE_STYLES = Object.freeze(
  Object.fromEntries(
    TRANSLATION_FORM_RESPONSIVE_STYLES_ARRAY.map(
      (style: TranslationResponsiveStyles): TranslationResponsiveStyles[] => [style, style]))
) as Record<TranslationResponsiveStyles, TranslationResponsiveStyles>;

export type TranslationResponsiveStyles = typeof TRANSLATION_FORM_RESPONSIVE_STYLES_ARRAY[number];
