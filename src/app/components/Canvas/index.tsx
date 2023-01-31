export default function Canvas({
  width,
  height,
  canvasStyle,
}: {
  width: number;
  height: number;
  canvasStyle: any;
}) {
  return <canvas width={width} height={height} style={canvasStyle} />;
}
