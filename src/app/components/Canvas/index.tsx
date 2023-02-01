import { CSSProperties, RefObject } from "react";

export default function Canvas({
  width,
  height,
  style,
  ref,
  canvas,
}: {
  width: number;
  height: number;
  style: CSSProperties;
  ref: any;
  canvas: any;
}) {
  return <canvas width={width} height={height} ref={ref} style={style} />;
}
