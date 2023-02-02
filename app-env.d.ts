declare global {
  interface Window {
    fabric: typeof import("fabric/fabric-impl");
  }
}
