import { useAtom } from "jotai";
import PropTypes from "prop-types";
import { useState } from "react";
import { panstate, selectedNum, selectedPieces } from "../store";

function Block({ isShow, num, data }) {
  const w_num = 125;
  const [isSelect, setIsSelect] = useState(Array(25).fill(false));
  const [isPan, setIsPan] = useAtom(panstate);
  const [tileNum, setTileNum] = useAtom(selectedNum);
  const [, setSelectedTiles] = useAtom(selectedPieces);
  return (
    <div className={isShow ? "board1 !aspect-[1/1] text-[1px]" : ""}>
      {isShow ? (
        data.map((_, index) => (
          <div
            key={index}
            className={
              isSelect[index]
                ? "bg-sky-400  flex justify-center items-center hover:cursor-pointer hover:bg-sky-500"
                : isPan
                ? "bg-cyan-200    flex justify-center items-center hover:cursor-grabbing "
                : "bg-cyan-200    flex justify-center items-center hover:cursor-pointer hover:bg-sky-400"
            }
            onClick={() => {
              console.log("isPan", isPan);
              if (isPan) {
                setIsPan(false);
                return;
              }
              console.log("click");
              if (isSelect[index]) {
                setTileNum(tileNum - 1);
                setSelectedTiles((prevSelectedTiles) =>
                  prevSelectedTiles.filter(
                    (tile) => tile.blockId !== num || tile.pieceId !== index
                  )
                );
              } else {
                setTileNum(tileNum + 1);
                setSelectedTiles((prevSelectedTiles) => [
                  ...prevSelectedTiles,
                  {
                    blockId: num,
                    pieceId: index,
                  },
                ]);
              }

              const nextSelect = isSelect.slice();
              nextSelect[index] = !isSelect[index];
              setIsSelect(nextSelect);
            }}
          >
            {index + 1}
          </div>
        ))
      ) : (
        <div className="flex justify-center  items-center !aspect-[1/1] ">{`(${Math.floor(
          num / w_num
        )},${num % w_num})${num}`}</div>
      )}
    </div>
  );
}

Block.propTypes = {
  isShow: PropTypes.bool.isRequired,
  num: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
};

export default Block;
