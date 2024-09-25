import { useAtom } from "jotai";
import { selectedNum } from "../store";

const Purcharge = () => {
  const [tileNum] = useAtom(selectedNum);
  return (
    <div className="absolute right-3 top-3 w-60 border-2 p-3  shadow-md shadow-slate-800">
      <div className="text-2xl text-blue-600 text-center py-2">
        <b>Purcharge</b>
      </div>
      <hr />
      <div className="py-3">{tileNum ? tileNum : "No"} Tiles Selected</div>

      {tileNum ? (
        <div className="flex h-8 items-center justify-center rounded-lg bg-blue-500 px-4  text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 select-none cursor-pointer">
          BUY
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Purcharge;
