import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';
import { FullScreenViewer } from '../FullScreenViewer';
import '../../dist/react-iv-viewer.css';
import image1 from './assets/img.jpg';
import image2 from './assets/hiResImg.jpg';

const meta: Meta<typeof FullScreenViewer> = {
  title: 'Example/FullScreenViewer',
  component: FullScreenViewer,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '300vh', padding: '2rem' }}>
        <p style={{ marginBottom: '1rem' }}>Scroll down to see page overflow. Open the image, then check if &lt;html&gt; overflow is cleared after closing.</p>
        <Story />
      </div>
    ),
  ],
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

const viewerArgs = {
  img: image1,
  hiResImg: image2,
  defaultZoom: 100,
  maxZoom: 500,
  snapView: true,
  refreshOnResize: true,
  zoomOnMouseWheel: true,
  hasZoomButtons: true,
  zoomStep: 10,
};

const nav: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  gap: '1rem',
  padding: '1rem',
  background: '#333',
  color: '#fff',
  zIndex: 1001,
};

const RouterExample = () => (
  <MemoryRouter initialEntries={['/viewer']}>
    <nav style={nav}>
      <Link to="/viewer" style={{ color: '#fff' }}>Viewer page</Link>
      <Link to="/other" style={{ color: '#fff' }}>Other page</Link>
    </nav>
    <Routes>
      <Route path="/viewer" element={
        <div style={{ height: '300vh', padding: '2rem', paddingBottom: '5rem' }}>
          <p>Open the image, then click "Other page" to navigate away. The page should scroll normally afterwards.</p>
          <FullScreenViewer {...viewerArgs} />
        </div>
      } />
      <Route path="/other" element={
        <div style={{ padding: '2rem', paddingBottom: '5rem' }}>
          <p>You navigated away. Page scroll should work here — the &lt;html&gt; element should have no inline overflow style.</p>
        </div>
      } />
    </Routes>
  </MemoryRouter>
);

export const WithRouter: Story = {
  render: () => <RouterExample />,
  parameters: { layout: 'fullscreen' },
  decorators: [],
};

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
