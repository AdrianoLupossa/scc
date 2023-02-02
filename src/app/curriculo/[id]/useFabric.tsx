import fabric from "fabric/fabric-impl";
import React, { useEffect } from "react";

type Props = {
  canvasEl: React.RefObject<HTMLCanvasElement | null>;
};

let Fabric: typeof fabric;

const useFabric = ({ canvasEl }: Props) => {
  const [canvas, setCanvas] = React.useState<fabric.Canvas | undefined>();

  const [selectedObject, setSelectedObject] = React.useState<
    fabric.Object | undefined
  >();

  useEffect(() => {
    Fabric = window.fabric;
    if (!canvasEl.current) return;

    const _canvas = new Fabric.Canvas(canvasEl.current, {
      backgroundColor: "#fff",
      width: 794,
      height: 1123.33,
      selection: true,
    });

    _canvas?.on("mouse:down", (e) => {
      if (!e.target) return;

      setSelectedObject(e.target);
    });

    setCanvas(_canvas);

    return () => {
      _canvas.dispose();
      // canvas?.dispose();
    };
  }, [canvasEl.current]);

  const addTitle = () => {
    if (!canvas) return;

    const text = new Fabric.Textbox("Meu Titulo", {
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

  const setTextBold = (text?: fabric.Object) => {
    if (!(text instanceof Fabric.Textbox)) return;
    text.fontWeight = text.fontWeight === "bold" ? "normal" : "bold";
    canvas?.renderAll();
  };

  const setTextItalic = (text?: fabric.Object) => {
    if (!(text instanceof Fabric.Textbox)) return;
    text.fontStyle = text.fontStyle === "italic" ? "normal" : "italic";
    canvas?.renderAll();
  };

  const setTextUnderlined = (text?: fabric.Object) => {
    if (!(text instanceof Fabric.Textbox)) return;
    text.underline = text.underline ? false : true;
    canvas?.renderAll();
  };

  const setTextAlign = ({
    align,
    text,
  }: {
    text?: fabric.Object;
    align: "left" | "center" | "right";
  }) => {
    if (!(text instanceof Fabric.Textbox)) return;
    text.textAlign = align;

    canvas?.renderAll();
  };

  const setTextFontSize = ({
    action,
    text,
  }: {
    text?: fabric.Object;
    action: "+" | "-";
  }) => {
    if (!(text instanceof Fabric.Textbox)) return;
    if (!text.fontSize) return;

    if (action === "+") {
      text.fontSize = text.fontSize + 2;
    } else {
      if (text.fontSize <= 2) return;
      text.fontSize = text.fontSize - 2;
    }

    canvas?.renderAll();
  };

  const textActions = {
    addTitle,
    setTextBold,
    setTextAlign,
    setTextItalic,
    setTextFontSize,
    setTextUnderlined,
  };

  return {
    canvas,
    textActions,
    selectedObject,
  };
};

export default useFabric;
