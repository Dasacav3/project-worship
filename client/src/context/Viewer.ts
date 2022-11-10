import { LocalUrl } from "../api/env_vars";
import * as ViewerComponent from "../components/Viewer";

const Viewer = (urlFile: string, content: string) => {
  // Create a new window and set the URL to the viewer

  const win = window.open(`${LocalUrl}/viewer`, 'Viewer', 'width=500,height=500');

  // If the window is not open, return
  if (!win) return;

  // If the window is open, send the file to the viewer

  win.onload = () => {
    win.postMessage({ urlFile, content }, LocalUrl);
  }
}

export default Viewer
