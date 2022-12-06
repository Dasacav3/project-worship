import { LocalUrl } from '../api/env_vars';

class WindowVisor {
  windowObj: Window | null;
  windowHeight: number;
  windowWidth: number;
  marginTop: number | undefined;
  marginBottom: number | undefined;
  marginRigth: number | undefined;
  marginLeft: number | undefined;

  constructor(width: number, height: number) {
    this.windowObj = window;
    this.windowHeight = height;
    this.windowWidth = width;
  }

  getWinObj() {
    return this.windowObj;
  }

  openObj() {
    let windowObj = this.windowObj?.open(
      `${LocalUrl}/viewer`,
      'Viewer',
      `width=${this.windowWidth},height=${this.windowHeight}`
    );

    if (windowObj) {
      this.windowObj = windowObj;
    }

    this.windowObj = window.open(
      `${LocalUrl}/viewer`,
      'Viewer',
      `width=${this.windowWidth},height=${this.windowHeight}`
    );
  }

  close() {
    this.windowObj?.close();
  }

  resize(width: number, height: number): void {
    this.windowObj?.resizeTo(width, height);
  }

  setMarginTop(margin: number) {
    this.marginTop = margin;
  }

  setMarginBottom(margin: number) {
    this.marginBottom = margin;
  }

  setMarginRight(margin: number) {
    this.marginRigth = margin;
  }

  setMarginLeft(margin: number) {
    this.marginLeft = margin;
  }

  sendMessage(message: object) {
    this.windowObj?.postMessage(message, `${LocalUrl}/viewer`);
  }

  checkIfClosed() {
    return this.windowObj?.closed;
  }
}

export default WindowVisor;
