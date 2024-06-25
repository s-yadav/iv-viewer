import React, { useRef, useEffect} from 'react';
import { ImageViewer as BaseImageViewer } from 'iv-viewer';
import 'iv-viewer/dist/iv-viewer.css';
import { ImageViewerProps } from './types';

export const ImageViewer: React.FC<ImageViewerProps> = ({
  img,
  hiResImg,
  width,
  height,
  zoom,
  defaultZoom = 100,
  maxZoom = 500,
  snapView = true,
  refreshOnResize = true,
  zoomOnMouseWheel = true,
  hasZoomButtons = true,
  zoomStep=50,
  onZoomChange,
  onLoad,
  ...rest
}) => {
  const viewerRef = useRef<BaseImageViewer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentZoom = useRef(defaultZoom);

  const _onZoomChange = useRef(onZoomChange);
  _onZoomChange.current = onZoomChange;
  const _onLoad = useRef(onLoad);
  _onLoad.current = onLoad;

  useEffect(() => {
    const viewerOptions = {
      zoom: currentZoom.current,
      maxZoom,
      snapView,
      refreshOnResize,
      zoomOnMouseWheel,
      hasZoomButtons,
      zoomStep,
      listeners: {
        onInit: ({ instance }: { instance: BaseImageViewer }) => {
          if (_onLoad.current) {
            _onLoad.current(instance);
          }
        },
        onDestroy: () => {},
        onZoomChange: ({ zoomValue }: { zoomValue: number }) => {
          if (_onZoomChange.current) {
            _onZoomChange.current(zoomValue);
          }
        },
      },
    };

    if (containerRef.current) {
      viewerRef.current = new BaseImageViewer(
        containerRef.current,
        viewerOptions
      );
      viewerRef.current.load(img, hiResImg);
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, [
    img,
    hiResImg,
    maxZoom,
    snapView,
    refreshOnResize,
    zoomOnMouseWheel,
    hasZoomButtons,
    zoomStep,
  ]);

  useEffect(() => {
    if (zoom && zoom !== currentZoom.current) {
      currentZoom.current = zoom;
      if (viewerRef.current && typeof viewerRef.current.zoom === 'function') {
        viewerRef.current.zoom(zoom);
      }
    }
  }, [zoom]);

  return (
    <div
      {...rest}
      ref={containerRef}
      style={{
        background: "black",
        ...rest.style,
        width: width,
        height: height,
      }}
    ></div>
  );
};
