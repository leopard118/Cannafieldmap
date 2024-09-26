import { useControls } from "react-zoom-pan-pinch";

const Control = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div>
      <button
        onClick={() => {
          zoomIn();
        }}
      >
        +
      </button>
      <button onClick={() => zoomOut()}>-</button>
      <button onClick={() => resetTransform()}>*</button>
    </div>
  );
};

export default Control;
