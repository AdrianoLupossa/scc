import fabric from "fabric/fabric-impl";
import { useRef, useState } from "react";

const useFabricText = ({
  canvas,
  Fabric,
}: {
  canvas?: fabric.Canvas;
  Fabric: typeof fabric;
}) => {
  const [selectedTextProps, setSelectedTextProps] = useState<{
    fontSize?: number;
    underline?: boolean;
    fontStyle?: string;
    fontWeight?: string;
    fontFamily?: string;
    textAlign?: string;
  }>();

  const textPos = useRef(100);

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
    text.set("underline", !text.underline);
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
      setSelectedTextProps({
        ...selectedTextProps,
        fontSize: text.fontSize,
      });
    } else {
      if (text.fontSize <= 2) return;
      text.fontSize = text.fontSize - 2;
      setSelectedTextProps({
        ...selectedTextProps,
        fontSize: text.fontSize,
      });
    }

    canvas?.renderAll();
  };

  const addTitle = () => {
    if (!canvas) return;

    const text = new Fabric.Textbox("Meu Titulo", {
      left: textPos.current,
      top: textPos.current,
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
    textPos.current += 20;
    setSelectedTextProps({
      ...selectedTextProps,
      fontSize: 20,
    });
  };

  return {
    addTitle,
    setTextBold,
    setTextAlign,
    setTextItalic,
    setTextFontSize,
    setTextUnderlined,
    selectedTextProps,
    setSelectedTextProps,
  };
};

export default useFabricText;
