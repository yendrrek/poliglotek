const ABOUT_RESPONSIVE_STYLES_ARRAY = [
  'about-_600px_959_98px',
  'about-max599_98px',
  'about_margin-top-modifier--600px_959_98px',
  'about_margin-top-modifier--410_5px_599_98px',
  'about_margin-top-modifier--350px_410px',
  'about_margin-top-modifier--max349px'
] as const;

export const ABOUT_RESPONSIVE_STYLES = Object.freeze(
  Object.fromEntries(
    ABOUT_RESPONSIVE_STYLES_ARRAY.map(
      (style: AboutResponsiveStyles): AboutResponsiveStyles[] => [style, style]))
) as Record<AboutResponsiveStyles, AboutResponsiveStyles>;

export type AboutResponsiveStyles = typeof ABOUT_RESPONSIVE_STYLES_ARRAY[number];
