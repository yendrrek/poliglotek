export const LOGO_RESPONSIVE_STYLES_ARRAY = [
  'logo-min599_98px',
  'logo-_410_5px_599_5px',
  'logo-_350px_410px',
  'logo-max-349px'
] as const;

export const LOGO_RESPONSIVE_STYLES = Object.freeze(
  Object.fromEntries(
    LOGO_RESPONSIVE_STYLES_ARRAY.map(
      (style: LogoResponsiveStyles): LogoResponsiveStyles[] => [style, style]))
) as Record<LogoResponsiveStyles, LogoResponsiveStyles>;

export type LogoResponsiveStyles = typeof LOGO_RESPONSIVE_STYLES_ARRAY[number];
