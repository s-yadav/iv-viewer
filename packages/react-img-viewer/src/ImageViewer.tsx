import React, { useRef, useEffect } from 'react';
import { FullScreenViewer, ImageViewer } from 'iv-viewer';
import 'iv-viewer/dist/iv-viewer.css';
import { ImageViewerProps } from './types';

export const NormalViewer: React.FC<ImageViewerProps> = ({
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
  zoomStep,
  onZoomChange,
  onLoad,
}) => {
  const viewerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
        onInit: (data: any) => {
          if (_onLoad.current) {
            _onLoad.current(data);
          }
        },
        onDestroy: () => {},
        onZoomChange: (data: any) => {
          if (_onZoomChange.current) {
            _onZoomChange.current(data.zoomValue);
          }
        },
      },
    };

    if (containerRef.current) {
      viewerRef.current = new ImageViewer(containerRef.current, viewerOptions);
      viewerRef.current.load(img, hiResImg || null);
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
      ref={containerRef}
      style={{
        width: width || '100%',
        height: height || '100%',
      }}
    ></div>
  );
};

export const FullScreenImageViewer: React.FC<ImageViewerProps> = ({
  img,
  hiResImg,
  defaultZoom = 100,
  maxZoom = 500,
  snapView = true,
  refreshOnResize = true,
  zoomOnMouseWheel = true,
  hasZoomButtons = true,
  zoomStep,
  onLoad,
}) => {
  const viewerRef = useRef<any>(null);
  const currentZoom = useRef(defaultZoom);

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
        onInit: (data: any) => {
          if (_onLoad.current) {
            _onLoad.current(data);
          }
        },
      },
    };

    viewerRef.current = new FullScreenViewer(viewerOptions);
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

  const handleOnClick = () => {
    if (viewerRef.current) {
      viewerRef.current.show(img, hiResImg || null);
    }
  };

  return (
    <img
      src={img}
      onClick={handleOnClick}
      style={{ cursor: 'pointer' }}
      alt="Zoomable"
    />
  );
};
