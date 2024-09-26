import { useAtom } from "jotai";
import PropTypes from "prop-types";
import { useState } from "react";
import { panstate, selectedNum, selectedPieces } from "../store";

function Block({ isShow, num, data, buyNum }) {
  const w_num = 125;
  const [isSelect, setIsSelect] = useState(Array(25).fill(false));
  const [isPan, setIsPan] = useAtom(panstate);
  const [tileNum, setTileNum] = useAtom(selectedNum);
  const [, setSelectedTiles] = useAtom(selectedPieces);

  return (
    <div className={isShow ? "board1 !aspect-[1/1] text-[1px]" : ""}>
      {isShow ? (
        data.map((item, index) => (
          <div
            key={index}
            className={`flex justify-center items-center ${
              item.isSelected
                ? "bg-green-500"
                : isSelect[index]
                ? "bg-sky-400   hover:cursor-pointer hover:bg-sky-500"
                : "bg-cyan-200 hover:cursor-pointer hover:bg-sky-400"
            }`}
            onClick={() => {
              console.log("isPan", isPan);
              if (isPan) {
                setIsPan(false);
                return;
              }
              if (item.isSelected) {
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
        <div
          className={`bg-green-${Math.ceil(
            buyNum / 5
          )}00 flex justify-center items-center !aspect-[1/1]`}
        >{`(${Math.floor(num / w_num)},${num % w_num})${num}`}</div>
      )}
    </div>
  );
}

Block.propTypes = {
  isShow: PropTypes.bool.isRequired,
  num: PropTypes.number.isRequired,
  buyNum: PropTypes.number,
  data: PropTypes.array,
};

export default Block;
