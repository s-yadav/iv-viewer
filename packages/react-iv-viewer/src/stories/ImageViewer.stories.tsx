import { Meta, StoryObj } from '@storybook/react';
import { ImageViewer } from '../ImageViewer';
import image1 from './assets/img.jpg';
import image2 from './assets/hiResImg.jpg';

const meta: Meta<typeof ImageViewer> = {
  title: 'Example/ImageViewer',
  component: ImageViewer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    img: { control: 'text' },
    hiResImg: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    zoom: { control: 'number' },
    defaultZoom: { control: 'number' },
    maxZoom: { control: 'number' },
    snapView: { control: 'boolean' },
    refreshOnResize: { control: 'boolean' },
    zoomOnMouseWheel: { control: 'boolean' },
    hasZoomButtons: { control: 'boolean' },
    zoomStep: { control: 'number' },
    onZoomChange: { action: 'zoomChanged' },
    onLoad: { action: 'loaded' },
  },
};

export default meta;
type Story = StoryObj<typeof ImageViewer>;

const handleViewerLoad = (viewer: any) => {
  console.log('On viewer load', viewer);
};
const handleZoomChange = (viewer: any) => {
  console.log('OnZoom Change:', viewer);
};

export const Default: Story = {
  args: {
    img: image1,
    hiResImg: image2,
    width: '600px',
    height: '400px',
    zoom: 100,
    defaultZoom: 100,
    maxZoom: 500,
    snapView: true,
    refreshOnResize: true,
    zoomOnMouseWheel: true,
    hasZoomButtons: true,
    zoomStep: 10,
    onLoad: handleViewerLoad,
    onZoomChange: handleZoomChange,
  },
};
