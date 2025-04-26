import { useParams } from "react-router-dom";
import { useCurrentBets } from "../../../hooks/currentBets";

const RightSidebar = () => {
  const { eventId } = useParams();
  const { data } = useCurrentBets(eventId);

  return (
    <div className="col-right">
      <div className="slip-wrap no-open-bet_slip">
        <div className="matched-wrap" style={{ height: "calc(100% - 301px)" }}>
          <h3>
            <a className="to-expand" style={{ cursor: "pointer" }}>
              Open Bets
            </a>
          </h3>

          {data?.length > 0 && (
            <div id="matchSection" style={{ height: "calc(100% - 25px)" }}>
              <div
                id="openBetSlip"
                className="bet_slip over-wrap"
                style={{ height: "calc(100% - 35px)", display: "block" }}
              >
                <ul id="txnHead" className="slip-head" style={{}}>
                  <li className="col-bet">
                    <strong>Matched</strong>
                  </li>
                </ul>
                <div id="txnList" className="slip-list" name="txn" style={{}}>
                  <ul id="laySlipHeader" className="matched-head" style={{}}>
                    <li className="col-bet">Back (Bet For)</li>
                    <li className="col-odd">Odds</li>
                    <li className="col-stake">Stake</li>
                    <li className="col-profit">Place Date</li>
                  </ul>
                  {data?.map((bet) => (
                    <dl
                      key={bet?.betId}
                      className={`${
                        bet?.betType === "Back" ? "slip-back" : "slip-lay"
                      }`}
                    >
                      <dt>
                        <span className="slip-type">{bet?.betType}</span>
                        <p className="slip-predict">
                          <span className="short-amount">{bet?.nation}</span>
                          <span id="marketName" />
                        </p>
                      </dt>
                      <dd className="col-odd">{bet?.userRate}</dd>
                      <dd className="col-stake"> {bet?.amount}</dd>
                      <dd className="col-profit">{bet?.placeDate}</dd>
                    </dl>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
