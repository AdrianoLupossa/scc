import fabric from "fabric/fabric-impl";
import React, { useEffect } from "react";
import { preventObjectOverflowCanvas } from "./fabricUtils";
import useFabricText from "./useFabricText";

type Props = {
  canvasEl: React.RefObject<HTMLCanvasElement | null>;
  objectAdded?: () => void;
  mouseDown?: () => void;
  actions?: any;
};

let Fabric: typeof fabric;

type FabricType = typeof fabric;

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
      preventObjectOverflowCanvas(e);
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

  function ungroup(params?: { group: fabric.Group }) {
    if (!canvas) return;
    const activeObject = params?.group || canvas.getActiveObject();

    if (activeObject && activeObject instanceof Fabric.Group) {
      const items = activeObject._objects;
      activeObject._restoreObjectsState();
      canvas.remove(activeObject);
      for (let i = 0; i < items.length; i++) {
        // console.log({ obj: items[i], type: items[i].type });
        let obj = items[i] as any;

        if (obj.type === "text") {
          const textObj = items[i] as any;
          obj = new Fabric.Textbox(textObj?.text || "", {
            ...textObj,
            selectable: true,
            hasControls: true,
          });
        }

        canvas.add(obj);

        obj.dirty = true; //set object dirty true
      }

      canvas.renderAll();
    }
  }

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

  useEffect(() => {
    if (!canvas) return;

    Fabric.loadSVGFromURL(
      "/assets/curriculum/curriculum-1.svg",
      function (objects, options) {
        options.group = false;

        const svgData = Fabric.util.groupSVGElements(objects, options);
        svgData.top = 30;
        svgData.left = 50;

        canvas.add(svgData);

        if (svgData instanceof Fabric.Group) {
          ungroup({ group: svgData });
        }

        canvas.renderAll();
      }
    );
  }, [canvas]);

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
    ungroup,
  };
};

export default useFabric;
