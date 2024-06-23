import {
  ImageViewer as BaseImageViewer,
  FullScreenViewer as BaseFullScreenViewer,
} from 'iv-viewer';
import React from 'react';

export enum ImageViewerMode {
  inline = 'inline',
  fullScreen = 'fullScreen',
}

export interface ImageViewerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onLoad'> {
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
  onLoad?: (viewer: BaseImageViewer) => void;
  onZoomChange?: (zoomValue: number) => void;
}
export interface FullScreenViewerProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onLoad'> {
  img: string;
  hiResImg?: string;
  defaultZoom: number;
  maxZoom?: number;
  snapView?: boolean;
  refreshOnResize?: boolean;
  zoomOnMouseWheel?: boolean;
  hasZoomButtons?: boolean;
  zoomStep?: number;
  onLoad?: (viewer: BaseFullScreenViewer) => void;
}
