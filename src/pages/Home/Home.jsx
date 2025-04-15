import Footer from "../../components/shared/Footer/Footer";

const Home = () => {
  return (
    <div className="full-wrap">
      <div id="centerColumn" className="col-center gamehall">
        {/* Message */}
        <div id="message" className="message-wrap success">
          <a className="btn-close">Close</a>
          <p />
        </div>

        <div
          id="overWrap"
          className="over-wrap"
          style={{ height: "calc(100% - 0px)" }}
        >
          <div className="gamehall-wrap-simple">
            <a style={{ cursor: "pointer" }}>
              <dl id="onLiveBoard" className="on_live">
                <dt>
                  <p className="live_icon">
                    <span /> LIVE
                  </p>
                </dt>
                <dd id="onLiveCount_CRICKET">
                  <p>Cricket</p>
                  <span id="count">2</span>
                </dd>
                <dd id="onLiveCount_SOCCER">
                  <p>Soccer</p>
                  <span id="count">8</span>
                </dd>
                <dd id="onLiveCount_TENNIS">
                  <p>Tennis</p>
                  <span id="count">12</span>
                </dd>
                <dd id="onLiveCount_E_SOCCER">
                  <p>E-Soccer</p>
                  <span id="count">1</span>
                </dd>
              </dl>
              <dl className="entrance-title">
                <dt>Sports</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_sports.png"
                alt=""
                draggable="false"
              />
            </a>
            {/* SABA sports */}
            {/* skyexchange blog */}
            <a className="entrance">
              <img
                src="/images/mobile/gamehall/banner_skyexchangeBlog.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>Virtual Cricket</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_virtualsports.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>EVO</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_evo-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>EZUGI</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_ezugi-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>Royal Gaming</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_royalgaming.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>Live Casino</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_casino-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>Spribe</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_spribe.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>Blackjack</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_blackjack-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>7 Up Down</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/royalgaming/banner_7up7down-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>Andar Bahar VR</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/royalgaming/banner_andarBaharVR-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>Supernowa</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_supernowa-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>7mojos</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_7mojos-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>HORSEBOOK</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_horsebook-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>Minesweeper</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_minesweeper-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>Teen Patti</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/royalgaming/banner_teenPatti-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>Super Over VR</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/royalgaming/banner_superOverVR-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>TeenPatti 20-20</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_TeenPatti2020-half.png"
                alt=""
                draggable="false"
              />
            </a>
            {/* JILI NUMBERKING  */}
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>NumberKing</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_NumberKing-half.png"
                alt=""
                draggable="false"
              />
            </a>
            {/* JILI Big small  */}
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>Big small</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_BigSmall-half.png"
                alt=""
                draggable="false"
              />
            </a>
            {/* JILI TeenPatti Joker  */}
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>TeenPatti Joker</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_TeenPattiJoker-half.png"
                alt=""
                draggable="false"
              />
            </a>
            {/* JILI 7up7down  */}
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', '7up7down',
                'JILI', '', 'JILI_7UP_7DOWN', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>7up7down</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_7up7down-half.png"
                alt=""
                draggable="false"
              />
            </a>
            {/* JILI Dragon & Tiger  */}
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', 'Dragon & Tiger',
         'JILI', '', 'JILI_DRAGON_TIGER', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Dragon &amp; Tiger</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_DragonNTiger-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>Auto Roulette</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/royalgaming/banner_autoRoulette-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a className="entrance-half" style={{ cursor: "pointer" }}>
              <dl className="entrance-title">
                <dt>Dus Ka Dum (Cards) VR</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/royalgaming/banner_DusKaDumVR-half.png"
                alt=""
                draggable="false"
              />
            </a>
            {/* JILI Callbreak Quick  */}
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', 'Callbreak Quick',
        'JILI', '', 'JILI_CALLBREAK_QUICK', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Callbreak Quick</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_CallbreakQuick-half.png"
                alt=""
                draggable="false"
              />
            </a>
            {/* JILI Sic Bo  */}
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', 'Sic Bo',
        'JILI', '', 'JILI_SIC_BO', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Sic Bo</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_SicBo-Jili-half.png"
                alt=""
                draggable="false"
              />
            </a>
            {/* JILI Baccarat  */}
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', 'Baccarat',
        'JILI', '', 'JILI_BACCARAT', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Baccarat</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_Baccarat-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', 'Bonus Dice',
        'KINGMAKER', '', 'KM_BONUS_DICE', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Bonus Dice</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_BonusDice-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', 'Heist',
        'KINGMAKER', '', 'KM_HEIST', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Heist</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_Heist-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', '5 Card Poker',
        'KINGMAKER', '', 'KM_5_CARD_POKER', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>5 Card Poker</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_5CardPoker-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', 'Color Game',
        'KINGMAKER', '', 'KM_COLOR_GAME', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Color Game</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_ColorGame-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', '32 Cards', 'KINGMAKER', '', 'KM_32_CARDS', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>32 Cards</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_32card-half.png"
                alt=""
                draggable="false"
              />
            </a>
            {/* JILI Rummy */}
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', 'Rummy', 'JILI', '', 'JILI_RUMMY', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Rummy</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_rummy-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('6', 'Royal Dragon Tiger', 'ROYAL', '', '900005', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Dragon Tiger</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/royalgaming/banner_dragonTiger-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('6', 'Royal Worli Matka VR', 'ROYAL', '', '901010', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Worli Matka VR</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/royalgaming/banner_worliMatkaVR-half.png"
                alt=""
                draggable="false"
              />
            </a>
            {/* BetGames */}
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', 'BetGames', 'BETGAMES', 'LIVE', 'BETGAME_BACCARAT', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>BetGames</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_betgames-half.png"
                alt=""
                draggable="false"
              />
            </a>
            {/* KM Andar Bahar */}
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', 'Andar Bahar', 'KINGMAKER', '', 'KM_ANDAR_BAHAR', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Andar Bahar</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_andarBahar-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', 'Sicbo', 'KINGMAKER', '', 'KM_SICBO', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Sicbo</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_sicbo-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', '7 UP 7 Down', 'KINGMAKER', '', 'KM_7UP_7DOWN', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>7 UP 7 Down</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_sevenUpDown-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', 'Coin Toss', 'KINGMAKER', '', 'KM_COIN_TOSS', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Coin Toss</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_CoinToss-half.png"
                alt=""
                draggable="false"
              />
            </a>
            {/* Teen Patti */}
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', 'Teen Patti', 'JILI', '', 'JILI_TEEN_PATTI', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Teen Patti</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_teenPatti-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', 'KingMaker', 'KINGMAKER', '', 'KM_CARD_MATKA', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Card Matka</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_cardMatka-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a
              className="entrance-half"
              href="javascript:CommonTransferWalletHandler.openDepositPage('1', 'KingMaker', 'KINGMAKER', '', 'KM_NUMBER_MATKA', '', true)"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Number Matka</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_numberMatka-half.png"
                alt=""
                draggable="false"
              />
            </a>
            <a
              className="entrance-half"
              id="pokerLoginBtn"
              style={{ cursor: "pointer" }}
            >
              <dl className="entrance-title">
                <dt>Bpoker</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src="/images/mobile/gamehall/banner_bpoker-half.png"
                alt=""
                draggable="false"
              />
            </a>
            {/*     SABA sports kabaddi */}
            {/*             <dl class="entrance-title"> */}
            {/*                 <dt>Kabaddi</dt> */}
            {/*                 <dd>Play Now</dd> */}
            {/*             </dl> */}
            {/*             <img src="//images/mobile/gamehall/banner_Kabadi-half.png" alt="" draggable="false"> */}
            {/*         </a> */}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
