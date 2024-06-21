// src/types.ts
export enum ImageViewerMode {
    inline = "inline",
    fullScreen = "fullScreen",
  }
  
  export interface ImageViewerProps {
    img: string;
    hiResImg?: string;
    width?: string;
    height?: string;
    zoom?: number;
    defaultZoom: number;
    maxZoom?: number;
    snapView?: boolean;
    refreshOnResize?: boolean;
    zoomOnMouseWheel?: boolean;
    hasZoomButtons?: boolean;
    zoomStep?: number;
    onLoad?: (viewer: any) => void;
    onZoomChange?: (data: any) => void;
  }
  