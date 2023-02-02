import fabric from "fabric/fabric-impl";
import React, { useEffect } from "react";

type Props = {
  canvasEl: React.RefObject<HTMLCanvasElement | null>;
};

let Fabric: typeof fabric;

const useFabric = ({ canvasEl }: Props) => {
  const [canvas, setCanvas] = React.useState<fabric.Canvas | undefined>();
  const [selectedTextProps, setSelectedTextProps] = React.useState<{
    fontSize?: number;
    underline?: boolean;
    fontStyle?: string;
    fontWeight?: string;
    fontFamily?: string;
  }>();

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

    _canvas?.on("mouse:down", (e: any) => {
      if (!e.target) return;

      setSelectedObject(e.target);
    });

    _canvas?.on("object:added", (e: any) => {
      if (!e.target) return;
      setSelectedObject(e.target);
    });

    setCanvas(_canvas);

    return () => {
      _canvas.dispose();
    };
  }, [canvasEl]);

  useEffect(() => {
    if (!canvas) return;

    document.addEventListener("keydown", (e: any) => {
      if (e.key === "Delete" && e.which === 46) {
        if (!canvas) return;

        canvas.getActiveObjects().forEach((activeObject) => {
          canvas.remove(activeObject);
        });
      }
    });
  }, [canvas]);

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
      lockUniScaling: true,
      lockScalingY: true,
      lockSkewingY: true,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    setSelectedTextProps({
      ...selectedTextProps,
      fontSize: 20,
      fontFamily: "helvetica",
    });
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
    canvas?.renderTop();
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
      setSelectedTextProps({
        ...selectedTextProps,
        fontSize: text.fontSize + 2,
      });
    } else {
      if (text.fontSize <= 2) return;
      text.fontSize = text.fontSize - 2;
      setSelectedTextProps({
        ...selectedTextProps,
        fontSize: text.fontSize - 2,
      });
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
    selectedTextProps,
    textActions,
    selectedObject,
  };
};

export default useFabric;
