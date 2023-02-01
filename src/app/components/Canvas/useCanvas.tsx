import React, { useEffect } from "react";

declare global {
  interface Window {
    fabric: any;
    // fabric: typeof fabric;
  }
}

export default function useCanvas(canvasRef: any) {
  const canvas = React.useRef<fabric.Canvas | null>(null);
  function setCanvasRef(ref: HTMLCanvasElement) {
    if (!ref) return;
    canvasRef.current = ref;
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    canvas.current = new window.fabric.Canvas(canvasRef.current, {
      selectionLineWidth: 2,
      width: 794,
      height: 1123.33,
      selection: true,
    });
  }, [canvasRef]);

  // const addTextToCanvas = () => {
  //   if (!canvas.current) return;

  //   const text = new window.fabric.Textbox("Meu Titulo", {
  //     left: 100,
  //     top: 100,
  //     fontFamily: "helvetica",
  //     angle: 0,
  //     fill: "#000000",
  //     fontSize: 20,
  //     selectable: true,
  //   });

  //   canvas.current.add(text);
  //   canvas.current.bringToFront(text);
  // };

  return { setCanvasRef, canvas: canvas.current };
}
