declare module "iv-viewer" {
    export type Point = {
        x: number;
        y: number;
    };
    export type CallbackData = {
        container: HTMLElement;
        snapView: HTMLElement;
        zoomValue: number;
        reachedMin: number;
        reachedMax: number;
        instance: ImageViewer;
    };
    export type Callback = (data: CallbackData) => void | null;
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
            onDestroy?: Callback;
            onImageLoaded?: Callback;
            onZoomChange?: Callback;
        };
    };

    export class ImageViewer {
        constructor(element: HTMLElement, options?: Partial<Config>);

        destroy(): void;

        resetZoom(animate?: boolean): void;

        zoom(percent: number, point?: Point): void;

        showSnapView(noTimeout?: boolean): void;

        hideSnapView(): void;

        refresh(): void;

        load(imageSrc: string, hiResImageSrc?: string): void;
    }

    export class FullScreenViewer extends ImageViewer {
        constructor(options?: Partial<Config>);

        show(imageSrc?: string, hiResImageSrc?: string): void;

        hide(): void;
    }

    export default ImageViewer;
}
