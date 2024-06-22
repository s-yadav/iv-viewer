import {ImageViewer as BaseImageViewer} from "iv-viewer";
import React from "react";

export enum ImageViewerMode {
    inline = "inline",
    fullScreen = "fullScreen",
  }
  
  export interface ImageViewerProps extends React.HtmlHTMLAttributes<HTMLDivElement>{
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
  export interface FullScreenViewerProps extends React.HTMLAttributes<HTMLImageElement> {
    img: string;
    hiResImg?: string;
    defaultZoom: number;
    maxZoom?: number;
    snapView?: boolean;
    refreshOnResize?: boolean;
    zoomOnMouseWheel?: boolean;
    hasZoomButtons?: boolean;
    zoomStep?: number;
    onLoad?: (viewer: any) => void;
  }
  
export interface ViewerState {
    container: HTMLDivElement;
    instance: BaseImageViewer;
    reachedMax: boolean;
    reachedMin: boolean;
    snapView: HTMLDivElement;
    zoomValue: number;
  }