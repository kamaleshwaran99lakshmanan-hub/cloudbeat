export const typography = {
  display: {
    fontSize: 34,
    fontWeight: '700' as const,
    lineHeight: 41,
  },
  headline: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
  },
  title: {
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  body: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  button: {
    fontSize: 17,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  code: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
    fontFamily: 'monospace',
  },
} as const;

export type TypographyVariant = keyof typeof typography;
