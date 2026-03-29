export const layerConfig = {
  styleContext: {},
  styleRules: [
    {
      predicate: (properties: any) => properties.styleName === "styleNode",
      style: {
        pointRadius: 4,
        fillColor: '#ffffff',
        strokeColor: '#14e2d9',
        strokeWidth: 3,
        strokeLinecap: 'round',
        // graphicName: 'x',
        graphicZIndex: 9999,
      },
    },
    {
      predicate: (properties: any) => properties.styleName === "styleLine",
      style: {
        strokeWidth: 3,
        strokeColor: '#14e2d9',
        strokeLinecap: 'round',
        graphicZIndex: 9999,
      }
    },
    {
      predicate: (properties: any) => properties.styleName === "styleSecondaryLine",
      style: {
        strokeWidth: 2,
        strokeColor: '#ffffff',
        strokeLinecap: 'round',
        graphicZIndex: 9999,
      }
    },
    {
      predicate: (properties: any) => properties.styleName === "styleDashedLine",
      style: {
        strokeWidth: 2,
        strokeColor: '#ffffff',
        strokeLinecap: 'round',
        strokeDashstyle: 'dash',
        graphicZIndex: 9999,
      }
    },
    {
      predicate: (properties: any) => properties.styleName === "styleDashedSecondaryLine",
      style: {
        strokeWidth: 1,
        strokeColor: '#ffffff',
        strokeLinecap: 'round',
        strokeDashstyle: 'dash',
        graphicZIndex: 9999,
      }
    }
  ],
}
