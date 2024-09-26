import { useEffect, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
// import blocksData from "../data/blocksData";
import Block from "./Block";
import { useAtom } from "jotai";
import { initialTransform, panstate } from "../store";
import axios from "axios";
import Loading from "./Loading";

function CannaFiledMap() {
  const [blocks, setBlocks] = useState([]);
  const [isPan, setIsPan] = useAtom(panstate);
  const [transformvalue, setTransformvalue] = useAtom(initialTransform);
  const bwidth = 10;
  const bheight = 10;
  const w_num = 125;
  const h_num = 72;
  const limitscale = 15;

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.post(
          "http://192.168.142.145:5000/api/cannafield",
          transformvalue
        );
        setBlocks(response.data.cannafield);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, [transformvalue]);

  const handleZoomChange = (ref) => {
    console.log("pan", isPan);
    const { scale, positionX, positionY } = ref.state;
    let x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0; // Initialize coordinates

    console.log("scale:", scale, positionX, positionY);

    if (scale > limitscale) {
      // Calculate starting points x1 and y1 based on positionX and positionY
      if (positionX < 0) y1 = Math.floor(-positionX / (bwidth * scale));
      if (positionY < 0) x1 = Math.floor(-positionY / (bheight * scale));

      // Calculate ending points x2 and y2 by adding the visible portion based on scale
      x2 = Math.ceil(h_num / scale) + x1;
      y2 = Math.ceil(w_num / scale) + y1;

      // Adjust x1 and y1 if they exceed the grid boundaries
      if (h_num - x2 <= 0) {
        x1 += h_num - 1 - x2;
        x2 = h_num - 1;
      }
      if (w_num - y2 <= 0) {
        y1 += w_num - 1 - y2;
        y2 = w_num - 1;
      }
    } else {
      if (isPan) setIsPan(false);
      x1 = 0;
      y1 = 0;
      x2 = 0;
      y2 = 0;
    }

    // Update the transform values only if they have changed
    if (
      transformvalue.x1 !== x1 ||
      transformvalue.y1 !== y1 ||
      transformvalue.x2 !== x2 ||
      transformvalue.y2 !== y2
    ) {
      setTransformvalue({
        x1,
        y1,
        x2,
        y2,
      });
      console.log("aiddyr", x1, y1, x2, y2);
    }
  };

  const handlePan = () => {
    console.log("pan1", isPan);
    if (!isPan) {
      setIsPan(true);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      {!blocks.length && <Loading />}
      <TransformWrapper
        options={{
          doubleClick: { disabled: true }, // Typo fixed here
          wheel: { step: 2 }, // Correct property name
        }}
        initialScale={10}
        minScale={1}
        maxScale={30}
        onZoomStop={handleZoomChange}
        onPanningStop={handleZoomChange}
        onPanning={handlePan}
      >
        <TransformComponent>
          <div
            id="board"
            className={isPan ? "cursor-grabbing" : "cursor-pointer"}
          >
            {blocks.length ? (
              blocks.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-[10px] h-[10px]  text-[1.5px] !aspect-[1/1]"
                  >
                    <Block
                      isShow={item.isShow}
                      num={index}
                      data={item?.pieces}
                      buyNum={item?.selectedNum}
                    />
                  </div>
                );
              })
            ) : (
              <div className="bg-white"></div>
            )}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

export default CannaFiledMap;
