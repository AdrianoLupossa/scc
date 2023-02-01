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
    const canvas = new window.fabric.Canvas(canvasEl.current, {
      backgroundColor: "#fff",
      selectionLineWidth: 1,
      width: 794,
      height: 1123.33,
      selection: true,
    });
    setCanvas(canvas);
  }, [canvasEl]);

  const addTitle = () => {
    if (!canvas) return;

    const text = new window.fabric.Textbox("Meu Titulo", {
      left: 100,
      top: 100,
      fontFamily: "helvetica",
      width: 120,
      angle: 0,
      fill: "#000000",
      fontSize: 20,
      selectable: true,
    });

    canvas.add(text);
    canvas.setActiveObject(text).bringToFront(text);
  };

  const setTextProperty = (key: string, value: string | number) => {
    if (!canvas) return;
    // const text =
  };

  const makeTextBold = () => {
    setTextProperty("fontSize", 12);
  };

  const format = {
    addTitle,
    makeTextBold,
  };

  return {
    canvas,
    format,
  };
};

export default useFabric;
