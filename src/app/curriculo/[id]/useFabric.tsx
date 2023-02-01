import { useTheme } from "@mui/material/styles";
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
  const [fontSize, setFontSize] = React.useState(20);
  const [color, setColor] = React.useState("#000000");
  const [fontFamily, setFontFamily] = React.useState("helvetica");
  const [isBold, setIsBold] = React.useState(false);

  const theme = useTheme();

  const format = {
    fontSize,
    setFontSize,
    color,
    setColor,
    fontFamily,
    setFontFamily,
    setIsBold,
  };

  useEffect(() => {
    if (!canvasEl.current) return;
    const canvas = new window.fabric.Canvas(canvasEl.current, {
      selectionLineWidth: 2,
      width: 794,
      height: 1123.33,
      selection: true,
    });
    setCanvas(canvas);
  }, [canvasEl]);

  const addText = () => {
    if (!canvas) return;

    const text = new window.fabric.Textbox("Meu Titulo", {
      left: 100,
      top: 100,
      fontFamily,
      width: 100,
      height: 100,
      fontWeight: isBold ? "bold" : "normal",
      selectionColor: theme.palette.primary.main,
      angle: 0,
      fill: color,
      fontSize,
      selectable: true,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
  };

  return {
    canvas,
    addText,
    format,
  };
};

export default useFabric;
