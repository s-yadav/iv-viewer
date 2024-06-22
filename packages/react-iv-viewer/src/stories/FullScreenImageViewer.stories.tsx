import { Meta, StoryObj } from '@storybook/react';
import { FullScreenViewer } from '../FullScreenViewer';
import image1 from './assets/img.jpg';
import image2 from './assets/hiResImg.jpg';


const meta: Meta<typeof FullScreenViewer> = {
  title: 'Example/FullScreenViewer',
  component: FullScreenViewer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    img: { control: 'text' },
    hiResImg: { control: 'text' },
    defaultZoom: { control: 'number' },
    maxZoom: { control: 'number' },
    snapView: { control: 'boolean' },
    refreshOnResize: { control: 'boolean' },
    zoomOnMouseWheel: { control: 'boolean' },
    hasZoomButtons: { control: 'boolean' },
    zoomStep: { control: 'number' },
    onLoad: { action: 'loaded' },
  },
};

export default meta;
type Story = StoryObj<typeof FullScreenViewer>;

export const Default: Story = {
  args: {
    img: image1,
    hiResImg: image2,
    defaultZoom: 100,
    maxZoom: 500,
    snapView: true,
    refreshOnResize: true,
    zoomOnMouseWheel: true,
    hasZoomButtons: true,
    zoomStep: 10,
  },
};
