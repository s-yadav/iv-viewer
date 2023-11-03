declare module "iv-viewer" {
    type Callback = (data: {
        container: HTMLElement;
        snapView: HTMLElement;
        zoomValue: number;
        reachedMin: number;
        reachedMax: number;
        instance: ImageViewer;
    }) => void | null;

    export type Config = {
        zoomValue: number;
        snapView: boolean;
        maxZoom: number;
        refreshOnResize: boolean;
        zoomOnMouseWheel: boolean;
        hasZoomButtons: boolean;
        zoomStep: number;
        listeners: {
            onInit?: Callback;
            onDestroy?: () => void | null;
            onImageLoaded?: Callback;
            onZoomChange?: Callback;
        };
    };

    export class ImageViewer {
        constructor(element: HTMLElement, options?: Partial<Config>);

        destroy(): void;

        resetZoom(animate?: boolean): void;

        zoom(percent: number, point?: { x: number, y: number }): void;

        showSnapView(noTimeout?: boolean): void;

        hideSnapView(): void;

        refresh(animate?: boolean): void;

        load(imageSrc: string, hiResImageSrc?: string): void;
    }

    export class FullScreenViewer extends ImageViewer {
        constructor(options?: Partial<Config>);

        show(imageSrc?: string, hiResImageSrc?: string): void;

        hide(): void;
    }

    export default ImageViewer;
}
