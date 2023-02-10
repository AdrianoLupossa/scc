import fabric from "fabric/fabric-impl";
import React, { useEffect } from "react";
import useFabricText from "./useFabricText";

type Props = {
  canvasEl: React.RefObject<HTMLCanvasElement | null>;
  objectAdded?: () => void;
  mouseDown?: () => void;
  actions?: any;
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

const prevent = (e: fabric.IEvent<MouseEvent>) => {
  var obj = e.target;
  if (!obj || !obj.canvas) return;

  obj.setCoords();
  var curZoom = obj.canvas.getZoom();

  // if object is too big ignore
  if (
    obj.getScaledHeight() > obj.canvas.getHeight() ||
    obj.getScaledWidth() > obj.canvas.getWidth()
  ) {
    return;
  }

  // top-left  corner
  if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
    obj.set(
      "top",
      Math.max(
        obj.get("top")! * curZoom,
        obj.get("top")! * curZoom - obj.getBoundingRect().top
      ) / curZoom
    );
    obj.set(
      "left",
      Math.max(
        obj.get("left")! * curZoom,
        obj.get("left")! * curZoom - obj.getBoundingRect().left
      ) / curZoom
    );
  }
  // bot-right corner
  if (
    obj.getBoundingRect().top + obj.getBoundingRect().height >
      obj.canvas.getHeight() ||
    obj.getBoundingRect().left + obj.getBoundingRect().width >
      obj.canvas.getWidth()
  ) {
    obj.set(
      "top",
      Math.min(
        obj.get("top")! * curZoom,
        obj.canvas.getHeight() -
          obj.getBoundingRect().height +
          obj.get("top")! * curZoom -
          obj.getBoundingRect().top
      ) / curZoom
    );

    obj.set(
      "left",
      Math.min(
        obj.get("left")! * curZoom,
        obj.canvas.getWidth() -
          obj.getBoundingRect().width +
          obj.get("left")! * curZoom -
          obj.getBoundingRect().left
      ) / curZoom
    );
  }
};

const useFabric = ({ canvasEl, objectAdded, mouseDown, actions }: Props) => {
  const [canvas, setCanvas] = React.useState<fabric.Canvas | undefined>();

  const { selectedTextProps, setSelectedTextProps, ...fabricText } =
    useFabricText({ canvas, Fabric });

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
      imageSmoothingEnabled: true,
    });

    _canvas.on("object:moving", (e) => {
      prevent(e);
      // if (!e.target) return;
      // const obj = e.target;

      // const isOnScreen = obj.isPartiallyOnScreen(true);

      // if (!isOnScreen) {
      //   // obj.centerH();
      //   // obj.centerV();
      //   obj.viewportCenterV();
      //   obj.adjustPosition("center");
      //   // obj.set("left", 250);
      //   // obj.set("top", 400)
      // }
    });

    _canvas?.on("object:selected", (e: any) => {
      if (!e.target) return;
      setSelectedObject(e.target);
      setSelectedTextProps({
        ...selectedTextProps,
        fontSize: e.target.fontSize,
        fontStyle: e.target.fontStyle,
        underline: e.target.underline,
        fontWeight: e.target.fontWeight,
        textAlign: e.target.textAlign,
      });
    });

    _canvas?.on("mouse:down", (e: any) => {
      if (!e.target) return;
      setSelectedObject(e.target);
      setSelectedTextProps({
        ...selectedTextProps,
        fontSize: e.target.fontSize,
        fontStyle: e.target.fontStyle,
        underline: e.target.underline,
        fontWeight: e.target.fontWeight,
        textAlign: e.target.textAlign,
      });
    });

    _canvas?.on("object:added", (e: any) => {
      if (!e.target) return;
      setSelectedObject(e.target);
      setSelectedTextProps({
        ...selectedTextProps,
        fontSize: e.target.fontSize,
        fontStyle: e.target.fontStyle,
        underline: e.target.underline,
        fontWeight: e.target.fontWeight,
        textAlign: e.target.textAlign,
      });
    });

    _canvas.on("before:selection:cleared", () => {
      setSelectedObject(undefined);
      actions && actions.clearButtonSelection();
    });

    setCanvas(_canvas);

    return () => {
      _canvas.dispose();
    };
  }, [canvasEl]);

  const shapes = {
    line: () =>
      new Fabric.Line([50, 100, 200, 200], {
        left: 170,
        top: 250,
        angle: 0,
        stroke: "black",
      }),
    circle: () =>
      new Fabric.Circle({
        radius: 100,
        top: 250,
        left: 200,
        fill: "",
        stroke: "black",
        strokeWidth: 0.5,
        originX: "center",
        originY: "center",
        lockRotation: true,
      }),
    rect: () =>
      new Fabric.Rect({
        fill: "",
        left: 200,
        stroke: "black",
        width: 200,
        height: 100,
        strokeWidth: 0.5,
        originX: "center",
        originY: "center",
      }),
  };

  const addShape = (shape: keyof typeof shapes) => {
    if (!canvas) return;
    canvas.add(shapes[shape]());
  };

  const textActions = {
    ...fabricText,
  };

  const canvasAction = {
    addShape,
  };

  return {
    canvas,
    selectedTextProps,
    setSelectedTextProps,
    textActions,
    canvasAction,
    selectedObject,
  };
};

export default useFabric;
