import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export default function HomepageFeatures(): JSX.Element {
  return (
    <>
      <section className={styles.intro}>
        <div className={styles.container}>
          <div style={{ maxWidth: "70%" }}>
            <p><span><strong>iv-viewer</strong></span>
              {' : A zooming and panning plugin inspired by Google Photos for your web images. It comes in two different variants. First, a react-based zooming and panning component and 2nd vanilla JS-based zooming and panning library.'}
            </p>
          </div>
          <div className={styles.box}>
            <Link to="docs/iv-viewer/intro-iv">
              <h1>iv-viewer</h1>
              <p className="para">
                A zooming and panning plugin inspired by Google Photos for your
                web images ....
              </p>
            </Link>
          </div>
          <div className={styles.box}>
            <Link to="docs/react-iv-viewer/intro-riv">
              <h1>react-iv-viewer</h1>
              <p className="para">
                react-iv-viewer is a React-based library for viewing images with
                advanced features like zooming ....
              </p>
            </Link>
          </div>
          <div className={styles.features}>
            <h3>Features :-</h3>
            <ul>
              <li>Smooth dragging and panning of images</li>
              <li>Support for touch devices</li>
              <li>Double tap to zoom in/zoom out</li>
              <li>Pinch in/out to control zoom</li>
              <li>Snap view for better panning and zooming experience</li>
              <li>
                Quick display of loaded images with progressive loading of
                high-quality images
              </li>
              <li>Exposed API to control zoom programmatically</li>
              <li>Custom events to listen for state changes</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
