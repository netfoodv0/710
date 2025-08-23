declare module 'leaflet' {
  namespace L {
    function heatLayer(
      latlngs: [number, number, number][],
      options?: {
        radius?: number;
        blur?: number;
        maxZoom?: number;
        gradient?: { [key: string]: string };
      }
    ): any;
  }
}

declare module 'leaflet.heat';
