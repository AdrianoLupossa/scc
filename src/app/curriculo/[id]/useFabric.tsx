import fabric from "fabric/fabric-impl";
import React, { useEffect } from "react";

type Props = {
  canvasEl: React.RefObject<HTMLCanvasElement | null>;
};

let Fabric: typeof fabric;

// const UndoAndRedo = (canvas: fabric.Canvas) => {
//   let current: any;
//   let list: any[] = [];
//   let state: any[] = [];
//   let index = 0;
//   let index2 = 0;
//   let action = false;
//   let refresh = true;
//   if (!canvas) return {};

//   canvas.on("object:added", function (e) {
//     const object: any = e.target;
//     console.log("object:modified");

//     if (action) {
//       state = [state[index2]];
//       list = [list[index2]];

//       action = false;
//       console.log(state);
//       index = 1;
//     }
//     object.saveState();

//     console.log(object.originalState);
//     state[index] = JSON.stringify(object.originalState);
//     list[index] = object;
//     index++;
//     index2 = index - 1;

//     refresh = true;
//   });

//   canvas.on("object:modified", function (e) {
//     const object: any = e.target;
//     console.log("object:modified");

//     if (action === true) {
//       state = [state[index2]];
//       list = [list[index2]];

//       action = false;
//       console.log(state);
//       index = 1;
//     }

//     object.saveState();

//     state[index] = JSON.stringify(object.originalState);
//     list[index] = object;
//     index++;
//     index2 = index - 1;

//     console.log(state);
//     refresh = true;
//   });

//   function undo() {
//     if (index <= 0) {
//       index = 0;
//       return;
//     }

//     if (refresh === true) {
//       index--;
//       refresh = false;
//     }

//     console.log("undo");

//     index2 = index - 1;
//     current = list[index2];
//     current.setOptions(JSON.parse(state[index2]));

//     index--;
//     current.setCoords();
//     canvas.renderAll();
//     action = true;
//   }

//   function redo() {
//     action = true;
//     if (index >= state.length - 1) {
//       return;
//     }

//     console.log("redo");

//     index2 = index + 1;
//     current = list[index2];
//     current.setOptions(JSON.parse(state[index2]));

//     index++;
//     current.setCoords();
//     canvas.renderAll();
//   }

//   return {
//     undo,
//     redo,
//   };
// };

const useFabric = ({ canvasEl }: Props) => {
  const [canvas, setCanvas] = React.useState<fabric.Canvas | undefined>();
  const [selectedTextProps, setSelectedTextProps] = React.useState<{
    fontSize?: number;
    underline?: boolean;
    fontStyle?: string;
    fontWeight?: string;
    fontFamily?: string;
  }>();

  const textPos = React.useRef(100);

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

    document.addEventListener("keydown", (event: any) => {
      if (!canvas.getActiveObject()) return;
      if (event.key === "Delete" && event.which === 46) {
        if (!canvas) return;

        canvas.getActiveObjects().forEach((activeObject) => {
          canvas.remove(activeObject);
        });
      } else if (event.keyCode == 90 && event.ctrlKey) {
        console.log("Control Z");
      }
    });
  }, [canvas]);

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
