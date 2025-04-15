import { useCurrentBets } from "../../hooks/currentBets";

const OpenBets = () => {
  const { data: myBets } = useCurrentBets();
  return (
    <div className="mian-wrap">
      {myBets?.length > 0 ? (
        <div className="mat-expansion-panel-content ng-trigger ng-trigger-bodyExpansion">
          <div
            className="mat-expansion-panel-body"
            style={{ padding: "0 10px" }}
          >
            <div className="allbet-datawrap">
              <div className="allbet-header">
                <div className="allbet-title">
                  <h2>Selection</h2>
                </div>
                <div className="allbet-headcol">
                  <h2></h2>
                  <h2></h2>
                  <h2>Odds</h2>
                  <h2>Stake</h2>
                </div>
              </div>
              {myBets?.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`allbet-datalist ${
                      item?.betType === "Back" ? "forback " : "forlay "
                    }`}
                  >
                    <div className="allbet-gameinfo">
                      <div className="allbet-content">
                        <h2> {item?.nation}</h2>
                        <p> {item?.placeDate} </p>
                      </div>
                    </div>
                    <div className="allbet-odds-stake-wrap">
                      <h2> </h2>
                      <h2></h2>
                      <h2> {item?.userRate}</h2>
                      <h2> {item?.amount}</h2>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="profile-menu-box">
          <div className="card-blank">
            <span>
              You {"don't"} have any {"bet's"} matched
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenBets;
