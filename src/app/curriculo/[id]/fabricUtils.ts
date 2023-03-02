export const preventObjectOverflowCanvas = (e: fabric.IEvent<MouseEvent>) => {
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
