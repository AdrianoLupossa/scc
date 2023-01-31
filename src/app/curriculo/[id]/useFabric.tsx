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

  useEffect(() => {
    if (!canvasEl.current) return;
    setCanvas(
      new window.fabric.Canvas(canvasEl.current, {
        width: 595,
        height: 842,
        selection: true,
      })
    );
  }, [canvasEl]);

  const addText = () => {
    if (!canvas) return;

    const text = new window.fabric.Textbox("Hello world", {
      left: 100,
      top: 100,
      fontFamily: "helvetica",
      angle: 0,
      fill: "#000000",
      fontSize: 20,
      selectable: true,
    });

    canvas.add(text);
  };

  return {
    canvas,
    addText,
  };
};

export default useFabric;
