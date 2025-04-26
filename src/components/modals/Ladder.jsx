import { useRef } from "react";
import useCloseModalClickOutside from "../../hooks/closeModal";

const Ladder = ({ ladderData, setLadderData }) => {
  const ref = useRef();

  useCloseModalClickOutside(ref, () => {
    setLadderData([]);
  });
  return (
    <div
      id="logWrap"
      className="log-wrap"
      style={{
        width: "600px",
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 9999,
        margin: "0 auto",
        height: "auto",
      }}
      ref={ref}
    >
      <table className="game-team">
        <tbody>
          <tr>
            <td className="game-name">
              Runs Position
              <a onClick={() => setLadderData([])} className="pop-close">
                Close
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="pop-content" style={{ height: "100%" }}>
        <table id="table" className="table01 tab-depth">
          <tbody>
            <tr>
              <th width="50%" className="align-L">
                Runs
              </th>
              <th width="50%" className="border-l">
                Amount
              </th>
            </tr>
            {ladderData?.map((item, i) => (
              <tr key={i} id="trTemp" style={{ display: "table-row" }}>
                <td id="runs" className="align-L ">
                  {item?.start}-{item?.end}
                </td>
                <td
                  id="exposure"
                  className={`${item?.exposure > 0 ? "green" : "red"}`}
                >
                  <span className=""> {item?.exposure}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ladder;
