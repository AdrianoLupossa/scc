import React, { useEffect } from "react";
// import type { fabric } from "fabric";

type Props = {
  canvasEl: React.RefObject<HTMLCanvasElement | null>;
};

declare global {
  interface Window {
    fabric: any;
    // fabric: typeof fabric;
  }
}

const useFabric = ({ canvasEl }: Props) => {
  const [canvas, setCanvas] = React.useState<fabric.Canvas | null>(null);
  const [fontSize, setFontSize] = React.useState(12);
  const [color, setColor] = React.useState("#000000");
  const [fontFamily, setFontFamily] = React.useState("helvetica");

  useEffect(() => {
    if (!canvasEl.current) return;
    setCanvas(
      new window.fabric.Canvas(canvasEl.current, {
        width: 794,
        height: 1123.33,
        selection: true,
      })
    );
  }, [canvasEl]);

  const addText = () => {
    if (!canvas) return;

    const text = new window.fabric.Textbox("Hello world", {
      left: 100,
      top: 100,
      fontFamily,
      angle: 0,
      fill: color,
      fontSize,
      selectable: true,
    });

    canvas.add(text);
  };

  return {
    canvas,
    addText,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    color,
    setColor
  };
};

export default useFabric;
