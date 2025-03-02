import "./App.scss";
import "./gh-fork-ribbon.css";
import React from "react";
import BN from "bn.js";
import * as nearAPI from "near-api-js";
import { AlphaPicker, HuePicker, GithubPicker } from "react-color";
import Switch from "react-switch";
import { Weapons } from "./Weapons";
import Timer from "react-compound-timer";
import Big from 'big.js';
import ReactSnackBar from "react-js-snackbar";
import { checkRedirectSearchParams } from './checkRedirectSearchParams';


//const PixelPrice = new BN("10000000000000000000000");
const IsMainnet = window.location.hostname === "localhost";
const TestNearConfig = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  contractName: "farm-draw4.cheddar.testnet",
  tokenContractName: "token-v3.cheddar.testnet",
  walletUrl: "https://wallet.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org"
};
const MainNearConfig = {
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
  contractName: "farm-draw.cheddar.near",
  tokenContractName: "token.cheddar.near",
  walletUrl: "https://wallet.near.org",
  explorerUrl: "https://explorer.near.org"
};
const NearConfig = IsMainnet ? MainNearConfig : TestNearConfig;

const Milk = (
  <span role="img" aria-label="milk" className="berry">
    🥛
  </span>
);
const Cheddar = (
  <span role="img" aria-label="cheddar" className="berry">
    🧀
  </span>
);
// const Cucumber = (
//   <span role="img" aria-label="cucumber" className="berry">
//     🥒
//   </span>
// );
// const Pepper = (
//   <span role="img" aria-label="pepper" className="berry">
//     🌶️
//   </span>
// );

const Berry = {
  Milk: "Milk",
  Cheddar: "Cheddar",
};

const BoardHeight = 80;
const BoardWidth = 80;
const NumLinesPerFetch = 80;
const ExpectedLineLength = 4 + 8 * BoardWidth;
const CellWidth = 12;
const CellHeight = 12;
const MaxNumColors = 31;
const BatchOfPixels = 100;
// 500 ms
const BatchTimeout = 500;
const RefreshBoardTimeout = 1000;
const MaxWorkTime = 10 * 60 * 1000;
const OneDayMs = 24 * 60 * 60 * 1000;

const intToColor = (c) => `#${c.toString(16).padStart(6, "0")}`;
const intToColorWithAlpha = (c, a) =>
  `#${c.toString(16).padStart(6, "0")}${Math.round(255 * a)
    .toString(16)
    .padStart(2, "0")}`;

const rgbaToInt = (cr, cg, cb, ca, bgColor) => {
  const bb = bgColor & 255;
  const bg = (bgColor >> 8) & 255;
  const br = (bgColor >> 16) & 255;

  const r = Math.round(cr * ca + br * (1 - ca));
  const g = Math.round(cg * ca + bg * (1 - ca));
  const b = Math.round(cb * ca + bb * (1 - ca));
  return (r << 16) + (g << 8) + b;
};

const imgColorToInt = (c, bgColor) => {
  const cr = c & 255;
  const cg = (c >> 8) & 255;
  const cb = (c >> 16) & 255;
  const ca = ((c >> 24) & 255) / 255;
  return rgbaToInt(cr, cg, cb, ca, bgColor);
};

const int2hsv = (cInt) => {
  cInt = intToColor(cInt).substr(1);
  const r = parseInt(cInt.substr(0, 2), 16) / 255;
  const g = parseInt(cInt.substr(2, 2), 16) / 255;
  const b = parseInt(cInt.substr(4, 2), 16) / 255;
  let v = Math.max(r, g, b),
    c = v - Math.min(r, g, b);
  let h =
    c && (v === r ? (g - b) / c : v === g ? 2 + (b - r) / c : 4 + (r - g) / c);
  return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
};
const transparentColor = (c, a) =>
  `rgba(${c >> 16}, ${(c >> 8) & 0xff}, ${c & 0xff}, ${a})`;
const generateGamma = (hue) => {
  const gammaColors = [];
  for (let i = 0; i < MaxNumColors; ++i) {
    gammaColors.push(`hsl(${hue}, 100%, ${(100 * i) / (MaxNumColors - 1)}%)`);
  }
  return gammaColors;
};
const decodeLine = (line) => {
  let buf = Buffer.from(line, "base64");
  if (buf.length !== ExpectedLineLength) {
    throw new Error("Unexpected encoded line length");
  }
  let pixels = [];
  for (let i = 4; i < buf.length; i += 8) {
    let color = buf.readUInt32LE(i);
    let ownerIndex = buf.readUInt32LE(i + 4);
    pixels.push({
      color,
      ownerIndex,
    });
  }
  return pixels;
};

const WeaponsCheat = "idkfa";

class App extends React.Component {
  constructor(props) {
    super(props);

    const colors = [
      "#000000",
      "#666666",
      "#aaaaaa",
      "#FFFFFF",
      "#F44E3B",
      "#D33115",
      "#9F0500",
      "#FE9200",
      "#E27300",
      "#C45100",
      "#FCDC00",
      "#FCC400",
      "#FB9E00",
      "#DBDF00",
      "#B0BC00",
      "#808900",
      "#A4DD00",
      "#68BC00",
      "#194D33",
      "#68CCCA",
      "#16A5A5",
      "#0C797D",
      "#73D8FF",
      "#009CE0",
      "#0062B1",
      "#AEA1FF",
      "#7B64FF",
      "#653294",
      "#FDA1FF",
      "#FA28FF",
      "#AB149E",
    ].map((c) => c.toLowerCase());
    // const currentColor = parseInt(colors[Math.floor(Math.random() * colors.length)].substring(1), 16);
    const currentColor = parseInt(colors[0].substring(1), 16);
    const defaultAlpha = 0.25;

    const timeMs = new Date().getTime();
    const freeDrawingStartMsEstimated =
      timeMs -
      ((timeMs - new Date("2021-05-09")) % (7 * OneDayMs)) +
      OneDayMs * 6;



    this.state = {
      Show: false,
      Showing: false,
      connected: false,
      signedIn: false,
      accountId: null,
      pendingPixels: 0,
      boardLoaded: false,
      selectedCell: null,
      alpha: defaultAlpha,
      currentColor,
      pickerColor: intToColorWithAlpha(currentColor, defaultAlpha),
      colors,
      gammaColors: generateGamma(0),
      pickingColor: false,
      owners: [],
      accounts: {},
      highlightedAccountIndex: -1,
      selectedOwnerIndex: false,
      viewMyBoard: false,
      weaponsOn: false,
      weaponsCodePosition: 0,
      freeDrawingStart: new Date(freeDrawingStartMsEstimated),
      freeDrawingEnd: new Date(freeDrawingStartMsEstimated + OneDayMs),
      watchMode: false,
    };

    this._buttonDown = false;
    this._oldCounts = {};
    this._numFailedTxs = 0;
    this._balanceRefreshTimer = null;
    this.canvasRef = React.createRef();
    this._context = false;
    this._lines = false;
    this._queue = [];
    this._pendingPixels = [];
    this._refreshBoardTimer = null;
    this._sendQueueTimer = null;
    this._stopRefreshTime = new Date().getTime() + MaxWorkTime;
    this._accounts = {};

    this._initNear().then(() => {
      this.setState(
        {
          connected: true,
          signedIn: !!this._accountId,
          accountId: this._accountId,
          ircAccountId: this._accountId.replace(".", "_"),
          // freeDrawingStart: this._freeDrawingStart,
          // freeDrawingEnd: this._freeDrawingEnd,
        },
        () => {
          if (window.location.hash.indexOf("watch") >= 0) {
            setTimeout(() => this.enableWatchMode(), 500);
          }
        }
      );
    });
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this._context = canvas.getContext("2d");

    const click = async () => {
      if (this.state.watchMode) {
        return;
      }
      if (this.state.rendering) {
        await this.drawImg(this.state.selectedCell);
      } else if (this.state.pickingColor) {
        this.pickColor(this.state.selectedCell);
      } else {
        this.saveColor();
        await this.drawPixel(this.state.selectedCell);
      }
    };

    const mouseMove = (e) => {
      let x, y;
      if ("touches" in e) {
        if (e.touches.length > 1) {
          return true;
        } else {
          const rect = e.target.getBoundingClientRect();
          x = e.targetTouches[0].clientX - rect.left;
          y = e.targetTouches[0].clientY - rect.top;
        }
      } else {
        x = e.offsetX;
        y = e.offsetY;
      }
      x = Math.trunc((x / e.target.clientWidth) * BoardWidth);
      y = Math.trunc((y / e.target.clientHeight) * BoardWidth);
      let cell = null;
      if (x >= 0 && x < BoardWidth && y >= 0 && y < BoardHeight) {
        cell = { x, y };
      }
      if (JSON.stringify(cell) !== JSON.stringify(this.state.selectedCell)) {
        this.setState(
          {
            selectedCell: cell,
            selectedOwnerIndex:
              this._lines &&
              cell &&
              this._lines[cell.y] &&
              this._lines[cell.y][cell.x].ownerIndex,
          },
          async () => {
            this.renderCanvas();
            if (this.state.selectedCell !== null && this._buttonDown) {
              await click();
            }
          }
        );
      }
      e.preventDefault();
      return false;
    };

    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("touchmove", mouseMove);

    const mouseDown = async (e) => {
      this._buttonDown = true;
      if (this.state.selectedCell !== null) {
        await click();
      }
    };

    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("touchstart", mouseDown);

    const unselectCell = () => {
      this.setState(
        {
          selectedCell: null,
        },
        () => this.renderCanvas()
      );
    };

    const mouseUp = async (e) => {
      this._buttonDown = false;
      if ("touches" in e) {
        unselectCell();
      }
    };

    canvas.addEventListener("mouseup", mouseUp);
    canvas.addEventListener("touchend", mouseUp);

    canvas.addEventListener("mouseleave", unselectCell);

    canvas.addEventListener("mouseenter", (e) => {
      if (this._buttonDown) {
        if (!("touches" in e) && !(e.buttons & 1)) {
          this._buttonDown = false;
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      e.altKey && this.enablePickColor();
    });

    document.addEventListener("keyup", (e) => {
      if (this.state.weaponsCodePosition < WeaponsCheat.length) {
        if (
          e.key.toLowerCase() === WeaponsCheat[this.state.weaponsCodePosition]
        ) {
          this.setState({
            weaponsCodePosition: this.state.weaponsCodePosition + 1,
            weaponsOn:
              this.state.weaponsCodePosition + 1 === WeaponsCheat.length,
          });
        } else {
          this.setState({
            weaponsCodePosition: 0,
          });
        }
      }
      !e.altKey && this.disablePickColor();
    });
  }

  enablePickColor() {
    this.setState(
      {
        pickingColor: true,
      },
      () => {
        this.renderCanvas();
      }
    );
  }

  disablePickColor() {
    this.setState(
      {
        pickingColor: false,
      },
      () => {
        this.renderCanvas();
      }
    );
  }

  pickColor(cell) {
    if (!this.state.signedIn || !this._lines || !this._lines[cell.y]) {
      return;
    }
    const color = this._lines[cell.y][cell.x].color;

    this.setState(
      {
        currentColor: color,
        alpha: 1,
        pickerColor: intToColorWithAlpha(color, 1),
        gammaColors: generateGamma(int2hsv(color)[0]),
        pickingColor: false,
      },
      () => {
        this.renderCanvas();
      }
    );
  }

  async refreshAllowance() {
    alert(
      "You're out of access key allowance. Need sign in again to refresh it"
    );
    await this.logOut();
    await this.requestSignIn();
  }

  async _sendQueue() {
    const pixels = this._queue.slice(0, BatchOfPixels);
    this._queue = this._queue.slice(BatchOfPixels);
    this._pendingPixels = pixels;

    try {

      await this._contract.draw(
        {
          pixels,
        },
        new BN("75000000000000")
      );
      this._numFailedTxs = 0;
    } catch (error) {
      const msg = error.toString();

      if (msg.indexOf("does not have enough balance") !== -1) {
        await this.refreshAllowance();
        return;
      }

      if (msg.indexOf("Game is over") !== -1 || msg.indexOf("Game didn't started yet") !== -1) {
        alert("The Game is not running or has ended.")
        this._pendingPixels = [];
        this._queue = [];
      }

      console.log("Failed to send a transaction", error);

      this._numFailedTxs += 1;

      if (this._numFailedTxs < 3) {
        this._queue = this._queue.concat(this._pendingPixels);
        this._pendingPixels = [];
      } else {
        this._pendingPixels = [];
        this._queue = [];
      }
    }
    try {
      await Promise.all([this.refreshBoard(true), this.refreshAccountStats()]);
    } catch (e) {
      // ignore
    }
    this._pendingPixels.forEach((p) => {
      if (this._pending[p.y][p.x] === p.color) {
        this._pending[p.y][p.x] = -1;
      }
    });
    this._pendingPixels = [];
  }

  async _pingQueue(ready) {
    if (this._sendQueueTimer) {
      clearTimeout(this._sendQueueTimer);
      this._sendQueueTimer = null;
    }

    if (
      this._pendingPixels.length === 0 &&
      (this._queue.length >= BatchOfPixels || ready)
    ) {
      await this._sendQueue();
    }
    if (this._queue.length > 0) {
      this._sendQueueTimer = setTimeout(async () => {
        await this._pingQueue(true);
      }, BatchTimeout);
    }
  }

  async drawImg(cell) {
    if (!this.state.signedIn || !this._lines || !this._lines[cell.y]) {
      return;
    }
    const balance = this.state.account ? this.state.account.milkBalance : 0;

    if (
      !this._isFreeDrawing() &&
      balance - this.state.pendingPixels < this.state.milkNeeded
    ) {
      return;
    }

    const img = this.imageData;
    const w = img.width;
    const h = img.height;
    const x = cell.x - Math.trunc(w / 2);
    const y = cell.y - Math.trunc(h / 2);
    const d = new Uint32Array(this.imageData.data.buffer);
    for (let i = 0; i < h; ++i) {
      for (let j = 0; j < w; ++j) {
        const imgColor = d[i * w + j];
        if (
          imgColor &&
          y + i >= 0 &&
          y + i < BoardHeight &&
          x + j >= 0 &&
          x + j < BoardWidth
        ) {
          const bgColor = this._lines[y + i]
            ? this._lines[y + i][x + j].color
            : 0;
          const color = imgColorToInt(imgColor, bgColor);
          if (color !== bgColor) {
            this._queue.push({
              x: x + j,
              y: y + i,
              color,
            });
          }
        }
      }
    }
    this.setState({
      rendering: false,
    });

    this._stopRefreshTime = new Date().getTime() + MaxWorkTime;
    await this._pingQueue(false);
  }

  async drawPixel(cell) {
    if (!this.state.signedIn || !this._lines || !this._lines[cell.y]) {
      return;
    }
    const balance = this.state.account ? this.state.account.milkBalance : 0;
    if (!this._isFreeDrawing() && balance - this.state.pendingPixels < 1) {
      return;
    }

    const bgColor = this._lines[cell.y] ? this._lines[cell.y][cell.x].color : 0;
    const cb = this.state.currentColor & 255;
    const cg = (this.state.currentColor >> 8) & 255;
    const cr = (this.state.currentColor >> 16) & 255;
    const color = rgbaToInt(cr, cg, cb, this.state.alpha, bgColor);

    if (
      this._pending[cell.y][cell.x] !== color &&
      this._lines[cell.y][cell.x].color !== color
    ) {
      this._pending[cell.y][cell.x] = color;
    } else {
      return;
    }

    this._queue.push({
      x: cell.x,
      y: cell.y,
      color,
    });

    this._stopRefreshTime = new Date().getTime() + MaxWorkTime;
    await this._pingQueue(false);
  }

  parseAccount(account, accountId) {
    if (!account) {
      account = {
        accountId,
        accountIndex: -1,
        milkBalance: 2.0,
        cheddarBalance: 0.0,
        numPixels: 0,
        farmingPreference: Berry.Cheddar,
      };
    } else {
      //console.log((account.avocado_balance))
      account = {
        accountId: account.account_id,
        accountIndex: account.account_index,
        milkBalance: parseFloat(account.avocado_balance),
        cheddarBalance: account.banana_balance,
        numPixels: account.num_pixels,
        farmingPreference: account.farming_preference,
      };
    }
    account.startTime = new Date().getTime();
    account.milkPixels =
    account.farmingPreference === Berry.Milk ? account.numPixels + 1 : 0;
    account.cheddarPixels = this.convertToDecimals(Big((account.numPixels * this._settings.reward_rate) * (24 * 60 * 60 * 1000)).toFixed(), 24,2);
    //account.cheddarRewardPerMs = account.cheddarPixels / (24 * 60 * 60 * 1000);
    //console.log(account.cheddarPixels)



    
    account.cheddarRewardPerMs = account.numPixels * this._settings.reward_rate
    
    console.log(account.numPixels * this._settings.reward_rate)

    return account;
  }

  async getAccount(accountId) {
    return this.parseAccount(
      await this._contract.get_account({ account_id: accountId }),
      accountId
    );
  }

  async getAccountByIndex(accountIndex) {
    return this.parseAccount(
      await this._contract.get_account_by_index({
        account_index: accountIndex,
      }),
      "unknown"
    );
  }

  async refreshAccountStats() {
    //console.log("refreshAccountStats");
    let account = await this.getAccount(this._accountId);
    if (this._balanceRefreshTimer) {
      clearInterval(this._balanceRefreshTimer);
      this._balanceRefreshTimer = null;
    }

    this.setState({
      pendingPixels: this._pendingPixels.length + this._queue.length,
      viewMyBoard: this.state.viewMyBoard,
      account,
    });

    this._balanceRefreshTimer = setInterval(() => {
      //console.log("_balanceRefreshTimer")
      const t = new Date().getTime() - account.startTime;

      //console.log(account.cheddarRewardPerMs)

      //console.log(Big(account.cheddarRewardPerMs).toFixed())

      let rewards = 0;

      //console.log(new Date(this._settings.end_date * 1000).getTime())
      //console.log(new Date().getTime())

      if (new Date(this._settings.end_date).getTime() <= new Date().getTime())
        rewards = t * Big(this.convertToDecimals(account.cheddarRewardPerMs, 24, 10)).toFixed();

      //console.log(this.convertToDecimals(rewards, 24))


      this.setState({
        account: Object.assign({}, account, {
          milkBalance: account.milkBalance,
          cheddarBalance: Big(this.convertToDecimals(account.cheddarBalance, 24, 5)).add(rewards).toFixed(5),
        }),
        pendingPixels: this._pendingPixels.length + this._queue.length,
      });
    }, 100);
  }

  async _initNear() {


    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
    const near = await nearAPI.connect(
      Object.assign({ deps: { keyStore } }, NearConfig)
    );
    this._keyStore = keyStore;
    this._near = near;

    this._walletConnection = new nearAPI.WalletConnection(
      near,
      NearConfig.contractName
    );

    this._accountId = this._walletConnection.getAccountId();
    this._account = this._walletConnection.account();

    this._contract = new nearAPI.Contract(
      this._account,
      NearConfig.contractName,
      {
        viewMethods: [
          "get_account",
          "get_account_by_index",
          "get_lines",
          "get_line_versions",
          "get_account_balance",
          "get_account_num_pixels",
          "get_account_id_by_index",
          "get_settings",
          "is_active",
          "stats"
        ],
        changeMethods: ["draw", "buy_tokens", "buy_milk_with_cheddar", "select_farming_preference", "withdraw_crop"],
      }
    );

    this._tokenContract = new nearAPI.Contract(
      this._account,
      NearConfig.tokenContractName,
      {
        viewMethods: [
          "ft_balance_of"
        ],
        changeMethods: ["ft_transfer_call"],
      }
    );

    const { err, data, method, finalExecutionOutcome } = await checkRedirectSearchParams(this._walletConnection, NearConfig.explorerUrl || "explorer");

    
    if(err) {
      console.log(err)
    }

    // console.log(err)
    // console.log(data)
    // console.log(method)
    // console.log(finalExecutionOutcome)

    if(method == "ft_transfer_call") {

      try {

        var response = await this._account.functionCall({
          contractId: "farm-draw.cheddar.near",
          methodName: "buy_milk_with_cheddar",
          args: {"spent_cheddar": data},
          gas: new BN("30000000000000"),
          attachedDeposit: 0,
        });


      }
      catch(err) {
        console.log(err)

        const msg = err.toString();

        if (msg.indexOf("does not have enough balance") !== -1) {
          await this.refreshAllowance();
          return;
        }

        if (msg.indexOf("Game is over") !== -1 || msg.indexOf("Game didn't started yet") !== -1) {
          alert("The Game is not running or has ended.")
          this._pendingPixels = [];
          this._queue = [];
        }
      }

      if(response){
        console.log(response)

        var outcome = response.receipts_outcome[0].outcome.logs[0];
        if(outcome.includes("Purchased")) {
          this.show(outcome);
        }

      }

    }

    this._settings = await this._contract.get_settings();

    this._isactive = await this._contract.is_active();

    this._stats = await this._contract.stats();

    console.log(this._stats)

    this._settings.end_date = "1642356000"

    //console.log(this._settings)

    //console.log(this._isactive)

    this._pixelCost = this._settings.milk_price;

    this._rewardRate = this._settings.reward_rate;
    //console.log(this._stats.starts_at / 1000000)

    var countDownDate = new Date(this._stats.starts_at / 1000000);
    //console.log(countDownDate)
    var countDownDateSeconds = new Date(countDownDate.getTime() - countDownDate.getTimezoneOffset() * 60000)

    var x = setInterval(function(stats) {

      // Get today's date and time
      //var now = new Date().getTime();
      var d = new Date();
      var dtSec = new Date(d.getTime() - d.getTimezoneOffset() * 60000)

      // Find the distance between now and the count down date
      var distance = countDownDateSeconds.getTime() - dtSec.getTime();
      //console.log(distance)

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      var timer = document.getElementById("timer")

      if(timer) {
        timer.innerHTML = "<h2><span style='color:#222'>Starts In: </span><span style='color:rgba(80,41,254,0.88)'>" + days + "d : " + hours + "h : " + minutes + "m : " + seconds + "s" + "</span></h2>";
      }
      // If the count down is finished, write some text
      //console.log(distance)
      if (distance < 0) {

        if(timer) {

          // console.log(new Date(settings.end_date * 1000).getTime())
          //console.log(stats)  

          if (new Date().getTime() > new Date(stats.ends_at / 1000000).getTime()) {
            clearInterval(x);
            timer.innerHTML = "<h2><span style='color:rgba(80,41,254,0.88)'>Board Closed</span></h2>";
          }
          else if (new Date().getTime() <= new Date(stats.ends_at / 1000000).getTime()) {

            var d = new Date();
            //var dtSec = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
            //console.log(dtSec)

            var countDownEndDate = new Date(stats.ends_at / 1000000);
            //console.log(countDownEndDate)
            //var countDownEndDateSeconds = new Date(countDownEndDate.getTime() - countDownEndDate.getTimezoneOffset() * 60000)

            // Find the distance between now and the count down date
            var distance = countDownEndDate.getTime() - d.getTime();
            //console.log(distance)

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timer.innerHTML = "<h2><span style='color:#222'>Ends In: </span><span style='color:rgba(80,41,254,0.88)'>" + days + "d : " + hours + "h : " + minutes + "m : " + seconds + "s" + "</span></h2>";
          }
          else {
            clearInterval(x);
            timer.style.display = "none";
          }

        }
      }
    }, 1000, this._stats);


    // const freeDrawingTimestamp = await this._contract.get_free_drawing_timestamp();
    // this._freeDrawingStart = new Date(freeDrawingTimestamp);
    // this._freeDrawingEnd = new Date(freeDrawingTimestamp + OneDayMs);

    if (this._accountId) {
      await this.refreshAccountStats();
    }

    this._lineVersions = Array(BoardHeight).fill(-1);
    this._lines = Array(BoardHeight).fill(false);
    this._pending = Array(BoardHeight).fill(false);
    this._pending.forEach((v, i, a) => (a[i] = Array(BoardWidth).fill(-1)));
    await this.refreshBoard(true);
  }

  async refreshBoard(forced) {
    //console.log("refreshBoard")
    if (this._refreshBoardTimer) {
      clearTimeout(this._refreshBoardTimer);
      this._refreshBoardTimer = null;
    }
    const t = new Date().getTime();
    if (this.state.watchMode || t < this._stopRefreshTime) {
      this._refreshBoardTimer = setTimeout(async () => {
        await this.refreshBoard(false);
      }, RefreshBoardTimeout);
    }

    if (!forced && document.hidden) {
      return;
    }

    let lineVersions = await this._contract.get_line_versions();
    let needLines = [];
    for (let i = 0; i < BoardHeight; ++i) {
      if (lineVersions[i] !== this._lineVersions[i]) {
        needLines.push(i);
      }
    }
    let requestLines = [];
    for (let i = 0; i < needLines.length; i += NumLinesPerFetch) {
      requestLines.push(needLines.slice(i, i + NumLinesPerFetch));
    }

    let results = await Promise.all(
      requestLines.map((lines) => this._contract.get_lines({ lines }))
    );
    results = results.flat();
    requestLines = requestLines.flat();
    for (let i = 0; i < requestLines.length; ++i) {
      let lineIndex = requestLines[i];
      let line = decodeLine(results[i]);
      this._lines[lineIndex] = line;
    }

    this._lineVersions = lineVersions;
    if (!this.state.watchMode) {
      this._refreshOwners();
    }
    this.renderCanvas();
  }

  _refreshOwners() {
    const counts = {};
    this._lines.flat().forEach((cell) => {
      counts[cell.ownerIndex] = (counts[cell.ownerIndex] || 0) + 1;
    });
    delete counts[0];
    const sortedKeys = Object.keys(counts).sort(
      (a, b) => counts[b] - counts[a]
    );
    this.setState({
      owners: sortedKeys.map((accountIndex) => {
        accountIndex = parseInt(accountIndex);
        return {
          accountIndex,
          numPixels: counts[accountIndex],
        };
      }),
    });
    sortedKeys.forEach(async (accountIndex) => {
      accountIndex = parseInt(accountIndex);
      if (
        !(accountIndex in this._accounts) ||
        counts[accountIndex] !== (this._oldCounts[accountIndex] || 0)
      ) {
        try {
          this._accounts[accountIndex] = await this.getAccountByIndex(
            accountIndex
          );

          this._accounts[accountIndex].cheddarBalance = this.convertToDecimals(this._accounts[accountIndex].cheddarBalance, 24, 5);

        } catch (err) {
          console.log("Failed to fetch account index #", accountIndex, err);
        }
        this.setState({
          accounts: Object.assign({}, this._accounts),
        });
      }
    });
    this.setState({
      accounts: Object.assign({}, this._accounts),
    });
    this._oldCounts = counts;
  }

  renderCanvas() {
    if (!this._context || !this._lines) {
      return;
    }

    const ctx = this._context;

    for (let i = 0; i < BoardHeight; ++i) {
      const line = this._lines[i];
      if (!line) {
        continue;
      }
      for (let j = 0; j < BoardWidth; ++j) {
        const p = line[j];
        ctx.fillStyle = intToColor(p.color);
        ctx.fillRect(j * CellWidth, i * CellHeight, CellWidth, CellHeight);
        if (this.state.highlightedAccountIndex >= 0) {
          if (p.ownerIndex !== this.state.highlightedAccountIndex) {
            ctx.fillStyle = "rgba(32, 32, 32, 0.8)";
            ctx.fillRect(
              j * CellWidth,
              i * CellHeight,
              CellWidth / 2,
              CellHeight / 2
            );
            ctx.fillRect(
              (j + 0.5) * CellWidth,
              (i + 0.5) * CellHeight,
              CellWidth / 2,
              CellHeight / 2
            );
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillRect(
              j * CellWidth,
              (i + 0.5) * CellHeight,
              CellWidth / 2,
              CellHeight / 2
            );
            ctx.fillRect(
              (j + 0.5) * CellWidth,
              i * CellHeight,
              CellWidth / 2,
              CellHeight / 2
            );
          } else {
            ctx.beginPath();
            ctx.strokeStyle = ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.lineWidth = 0.5;
            ctx.rect(
              j * CellWidth + 0.5,
              i * CellHeight + 0.5,
              CellWidth - 1,
              CellHeight - 1
            );
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }

    this._pendingPixels.concat(this._queue).forEach((p) => {
      ctx.fillStyle = intToColor(p.color);
      ctx.fillRect(p.x * CellWidth, p.y * CellHeight, CellWidth, CellHeight);
    });

    if (this.state.selectedCell && !this.state.watchMode) {
      const c = this.state.selectedCell;
      if (this.state.rendering) {
        const img = this.imageData;
        const w = img.width;
        const h = img.height;
        const x = c.x - Math.trunc(w / 2);
        const y = c.y - Math.trunc(h / 2);
        const d = new Uint32Array(this.imageData.data.buffer);
        for (let i = 0; i < h; ++i) {
          for (let j = 0; j < w; ++j) {
            const color = d[i * w + j];
            if (
              color &&
              y + i >= 0 &&
              y + i < BoardHeight &&
              x + j >= 0 &&
              x + j < BoardWidth
            ) {
              const bgColor = this._lines[y + i]
                ? this._lines[y + i][x + j].color
                : 0;
              ctx.fillStyle = intToColor(imgColorToInt(color, bgColor));
              ctx.fillRect(
                (x + j) * CellWidth,
                (y + i) * CellHeight,
                CellWidth,
                CellHeight
              );
            }
          }
        }
      } else if (this.state.pickingColor) {
        const color = this._lines[c.y] ? this._lines[c.y][c.x].color : 0;
        ctx.beginPath();
        ctx.strokeStyle = ctx.fillStyle = transparentColor(color, 0.5);
        ctx.lineWidth = CellWidth * 4;
        ctx.arc(
          (c.x + 0.5) * CellWidth,
          (c.y + 0.5) * CellHeight,
          CellWidth * 4,
          0,
          2 * Math.PI
        );
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = ctx.fillStyle = transparentColor(color, 1);
        ctx.lineWidth = CellWidth * 2;
        ctx.arc(
          (c.x + 0.5) * CellWidth,
          (c.y + 0.5) * CellHeight,
          CellWidth * 4,
          0,
          2 * Math.PI
        );
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.fillStyle = transparentColor(this.state.currentColor, 0.2);
        ctx.fillRect(c.x * CellWidth, 0, CellWidth, c.y * CellHeight);
        ctx.fillRect(
          c.x * CellWidth,
          (c.y + 1) * CellHeight,
          CellWidth,
          (BoardHeight - c.y - 1) * CellHeight
        );
        ctx.fillRect(0, c.y * CellHeight, c.x * CellWidth, CellHeight);
        ctx.fillRect(
          (c.x + 1) * CellWidth,
          c.y * CellHeight,
          (BoardWidth - c.x - 1) * CellWidth,
          CellHeight
        );

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.fillStyle = intToColor(this.state.currentColor);
        ctx.strokeStyle = intToColor(this.state.currentColor);
        ctx.rect(c.x * CellWidth, c.y * CellHeight, CellWidth, CellHeight);
        ctx.stroke();
        ctx.closePath();
      }
    }

    if (!this.state.boardLoaded) {
      this.setState({
        boardLoaded: true,
      });
    }
  }

  async requestSignIn() {
    const appTitle = "Cheddar BOARD";
    await this._walletConnection.requestSignIn(
      NearConfig.contractName,
      appTitle
    );
  }

  async logOut() {
    this._walletConnection.signOut();
    this._accountId = null;
    this.setState({
      signedIn: !!this._accountId,
      accountId: this._accountId,
    });
  }

  async alphaColorChange(c) {
    this.setState(
      {
        alpha: c.rgb.a,
      },
      () => {
        this.changeColor(c, c.rgb.a);
      }
    );
  }

  hueColorChange(c) {
    this.setState({
      gammaColors: generateGamma(c.hsl.h),
    });
    this.changeColor(c);
  }

  saveColor() {
    const newColor = intToColor(this.state.currentColor);
    const index = this.state.colors.indexOf(newColor);
    if (index >= 0) {
      this.state.colors.splice(index, 1);
    }
    this.setState({
      colors: [newColor].concat(this.state.colors).slice(0, MaxNumColors),
    });
  }

  changeColor(c, alpha) {
    alpha = alpha || 1.0;
    const currentColor = c.rgb.r * 0x010000 + c.rgb.g * 0x000100 + c.rgb.b;
    c.hex = intToColorWithAlpha(currentColor, alpha);
    c.rgb.a = alpha;
    c.hsl.a = alpha;
    c.hsv.a = alpha;
    this.setState(
      {
        pickerColor: c,
        alpha,
        currentColor,
      },
      () => {
        this.renderCanvas();
      }
    );
  }

  async harvest() {

    //this.spinner();
    const theButton = document.querySelector(".btn.btn-primary.harvest");
    theButton.classList.add("button--loading");
    theButton.style.background = "gold";

    try {

      var response = await this._account.functionCall({
        contractId: "farm-draw.cheddar.near",
        methodName: "withdraw_crop",
        args: {},
        gas: "300000000000000",
        attachedDeposit: 0,
      });

    } catch (error) {
        
        theButton.classList.remove("button--loading");
        theButton.style.background = "white";

        const msg = error.toString();

        if (msg.indexOf("does not have enough balance") !== -1) {
          await this.refreshAllowance();
          return;
        }

        console.log("Failed to send a transaction", error);
     }

    await this.refreshAccountStats();

    if(response){
      
      theButton.classList.remove("button--loading");
      theButton.style.background = "white";

      var outcome = response.receipts_outcome[3].outcome.logs[0];
      if(outcome.includes("cheddar withdrew successfully")) {
        //alert("Cheddar Harvested Successfully!")

        this.show(outcome);
      }
    }
  }

  spinner() {
    document.getElementsByClassName("loader")[0].style.display = "block";
  }

  async buyTokens(amount) {
    const requiredBalance = Big(amount).mul(this._pixelCost).toFixed();
    //console.log(requiredBalance)
    await this._contract.buy_tokens(
      {},
      new BN("30000000000000"),
      requiredBalance
    );
  }

  async buyTokensCheddar(amount) {
    //const requiredBalance = Big(amount).mul(this._pixelCost).toFixed();

    let cheddarWalletBalance = await this._tokenContract.ft_balance_of({"account_id": this.state.accountId})
    cheddarWalletBalance = this.convertToDecimals(cheddarWalletBalance, 24, 2)
    let account = await this._contract.get_account({ account_id: this.state.accountId });
    let cheddarBalance = this.convertToDecimals(account.banana_balance, 24, 5);

    //console.log(this.convertToDecimals(cheddarWalletBalance, 24, 2));
    //console.log(amount);
    //console.log(cheddarBalance)

    if(cheddarBalance >= amount) {

      try {
        const requiredBalance = this.convertToBase(amount.toString(), 24);
        //console.log(requiredBalance)
        //console.log(requiredBalance)
        var response = await this._account.functionCall({
          contractId: "farm-draw.cheddar.near",
          methodName: "buy_milk_with_cheddar",
          args: {"spent_cheddar": requiredBalance},
          gas: new BN("30000000000000"),
          attachedDeposit: 0,
        });
      }
      catch(err) {
        console.log(err);
      }

      if(response){
        console.log(response)

        var outcome = response.receipts_outcome[0].outcome.logs[0];
        if(outcome.includes("Purchased")) {
          this.show(outcome);
        }

      }

      await this.refreshAccountStats();

    }
    else if(cheddarWalletBalance >= amount) {

      console.log(cheddarWalletBalance)

      const yoctoAmount = this.convertToBase(amount.toString(), 24);
      const contractName = NearConfig.contractName;
      const memo = "to buy milk";

      try {
        await this._tokenContract.ft_transfer_call(
          {'receiver_id': contractName,'amount': yoctoAmount, 'memo': memo, 'msg' : memo },
          new BN("50000000000000"),
          "1"
        );
      } catch(e) {
        console.log(e)
      } 
      //console.log(this.state.account.cheddarBalance)
    }
    else {
      alert("Cheddar balance too low.")
    }

  }

  setHover(accountIndex, v) {
    //console.log(accountIndex)
    if (v) {
      this.setState(
        {
          highlightedAccountIndex: accountIndex,
        },
        () => {
          this.renderCanvas();
        }
      );
    } else if (this.state.highlightedAccountIndex === accountIndex) {
      this.setState(
        {
          highlightedAccountIndex: -1,
        },
        () => {
          this.renderCanvas();
        }
      );
    }
  }

  async switchMyBoard(viewMyBoard) {
    this.setState({
      viewMyBoard,
    });
    this.setHover(this.state.account.accountIndex,viewMyBoard)
    //await this.refreshAccountStats();
  }

  async renderImg(img, milkNeeded) {
    this.imageData = img;
    this.setState({
      weaponsOn: false,
      weaponsCodePosition: 0,
      rendering: true,
      pickingColor: false,
      milkNeeded,
    });
  }

  _isFreeDrawing() {
    //const date = new Date();
    return (false);
    // return (
    //   this.state.freeDrawingStart <= date && date < this.state.freeDrawingEnd
    // );
  }

  enableWatchMode() {
    this.setState({
      watchMode: true,
      weaponsOn: false,
      weaponsCodePosition: 0,
    });
    document.body.style.transition = "3s";
    document.body.style.backgroundColor = "#333";
  }

  convertToDecimals(str:string, decimals:string, truncate:number) {
    str = str.toString() // convert numbers and bigint
    // clear leading zeros
    let i = 0
    for(; i<str.length && str[i]==="0"; ++i) {}
    if (i !== 0)
      str = str.substring(i);
    if (str === 0 || str === "0")
      return "0";

    let decimals_n = Number(decimals);
    if(decimals_n === 0)
      return str;

    // Pad zeros at the beginning.
    // We add 1 to make sure the integer digit is included as well)
    str = String(str).padStart(decimals_n + 1, "0");

    let integer = str.slice(0, -decimals_n);
    let fractional = str.slice(integer.length);
    if(integer === "")
      integer = "0";

    if(fractional === "")
      return integer;
    if (truncate === undefined) {
      return integer + "." + fractional;
    }
    else if(fractional > 0) {
      return integer + "." + fractional.substring(0, truncate);
    }
    return integer;
  }

  convertToBase(n:string, decimals:string) {
    let decimals_n = Number(decimals);
    // clear leading zeros
    let i = 0
    for(; i<n.length && n[i]==="0"; ++i) {}
    if (i !== 0)
      n = n.substring(i);

    let dotIdx = n.indexOf(".");
    if (dotIdx < 0)  // no decimal part
      return n + "0".padEnd(decimals, "0");

    let integer = n.substring(0, dotIdx);
    if(decimals_n === 0)
      return integer;

    let fractional = n.substring(dotIdx + 1, dotIdx + 1 + decimals).padEnd(decimals, "0");
    if (integer.length === 0)
      return fractional;
    return integer + fractional;
}

show = (outcome) => {

    //console.log(outcome)

    if (this.state.Showing) return;

    this.setState({ Show: true, Showing: true });
    var el = document.querySelector(".sc-bxivhb.inAQjx")
    var message = outcome.split(' ');

    if(outcome.includes("withdrew")) {
      el.innerText = this.convertToDecimals(message[3], 24, 5) + " Cheddar Harvested!";
    }
    else if(outcome.includes("Purchased")) {
      el.innerText = "Bought " + message[1] + "🥛" + " for " + "🧀" + "   " + message[5].split(".")[0];
    }

    setTimeout(() => {
      this.setState({ Show: false, Showing: false });
    }, 3000);
  };

  render() {
    const watchClass = this.state.watchMode ? " hidden" : "";
    const isFreeDrawing = this._isFreeDrawing();
    const freeDrawing = (
      <div
        className={`free-drawing ${
          isFreeDrawing ? "free" : "wait"
        }${watchClass}`}
      >
        {isFreeDrawing
          ? "BANANZA!!! Draw for free "
          : ""}
        <Timer
          initialTime={
            isFreeDrawing
              ? this.state.freeDrawingEnd - new Date()
              : ''
          }
          direction="backward"
          timeToUpdate={100}
          lastUnit="d"
          checkpoints={[
            {
              time: 0,
            },
          ]}
        >
          {() => (
            <React.Fragment>
              <Timer.Days
                formatValue={(v) => (v > 1 ? `${v} days ` : v ? `1 day ` : "")}
              />
              <Timer.Hours />:
              <Timer.Minutes formatValue={(v) => `${v}`.padStart(2, "0")} />:
              <Timer.Seconds formatValue={(v) => `${v}`.padStart(2, "0")} />.
              <Timer.Milliseconds
                formatValue={(v) => `${v}`.padStart(3, "0")}
              />
            </React.Fragment>
          )}
        </Timer>
      </div>
    );

    const content = !this.state.connected ? (
      <div className='tools'>
        Connecting...{" "}
        <span
          className="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        />
      </div>
    ) : this.state.signedIn ? (
      <div className='tools'>
        <div className={`float-right${watchClass}`}>
          <button
            className="btn btn-outline-secondary"
            onClick={() => this.logOut()}
          >
            Log out ({this.state.accountId})
          </button>
        </div>
        {freeDrawing}
        <div className={`your-balance${watchClass}`}>
          Balance:{" "}
          <Balance
            account={this.state.account}
            cheddarBalance={this.convertToDecimals(this.state.account.cheddarBalance, 24, 5)}
            pendingPixels={this.state.pendingPixels}
            isFreeDrawing={isFreeDrawing}
            detailed={true}
          />
        </div>
        <div className={`buttons${watchClass}`}>
          <button
            className="btn btn-primary"
            onClick={() => this.buyTokens(40)}
          >
            Buy <span className="font-weight-bold">40{Milk}</span> for{" "}
            <span className="font-weight-bold">Ⓝ0.1</span>
          </button>{" "}
          <button
            className="btn btn-primary"
            onClick={() => this.buyTokens(160)}
          >
            Buy <span className="font-weight-bold">160{Milk}</span> for{" "}
            <span className="font-weight-bold">Ⓝ0.4</span>
          </button>{" "}
          <button
            className="btn btn-primary"
            onClick={() => this.buyTokens(400)}
          >
            Buy <span className="font-weight-bold">400{Milk}</span> for{" "}
            <span className="font-weight-bold">Ⓝ1</span>
          </button>{" "}
          <button
            className="btn btn-success"
            onClick={() => this.buyTokens(2000)}
          >
            DEAL: Buy <span className="font-weight-bold">2400{Milk}</span>{" "}
            for <span className="font-weight-bold">Ⓝ5</span>
          </button>{" "}
        </div>
        <div className={`cheddar-buttons${watchClass}`}>
          <button
            className="btn btn-primary"
            onClick={() => this.buyTokensCheddar(24)}
          >
            Buy <span className="font-weight-bold">75{Milk}</span> for{" "}
            <span className="font-weight-bold">🧀&nbsp;24</span>
          </button>{" "}
          <button
            className="btn btn-primary"
            onClick={() => this.buyTokensCheddar(240)}
          >
            Buy <span className="font-weight-bold">750{Milk}</span> for{" "}
            <span className="font-weight-bold">🧀&nbsp;240</span>
          </button>{" "}
          <button
            className="btn btn-primary"
            onClick={() => this.buyTokensCheddar(2400)}
          >
            Buy <span className="font-weight-bold">7500{Milk}</span> for{" "}
            <span className="font-weight-bold">🧀 2400</span>
          </button>{" "}
        </div>
        <div className={`color-picker${watchClass}`}>
          <HuePicker
            color={this.state.pickerColor}
            width="100%"
            onChange={(c) => this.hueColorChange(c)}
          />
          <AlphaPicker
            color={this.state.pickerColor}
            width="100%"
            onChange={(c) => this.alphaColorChange(c)}
          />
          <div
            className={this.state.alpha >= 0.75 ? "display-warning" : "hidden"}
          >
            <span role="img" aria-label="warning">
              ⚠️
            </span>
            ️ Please! Don't destroy art! If you just want to farm {Cheddar}, just
            draw with low opacity.
            <span role="img" aria-label="pray">
              🙏
            </span>
            ️
          </div>
          <GithubPicker
            className="circle-picker"
            colors={this.state.gammaColors}
            color={this.state.pickerColor}
            triangle="hide"
            width="100%"
            onChangeComplete={(c) => this.changeColor(c)}
          />
          <GithubPicker
            className="circle-picker"
            colors={this.state.colors}
            color={this.state.pickerColor}
            triangle="hide"
            width="100%"
            onChangeComplete={(c) => this.hueColorChange(c)}
          />
        </div>

        <div id="harvest">
          <br/>
          <div className="row">
            <div id="actions" style={{ 'maxWidth': "680px"}}>
              <div id="timer"></div>
              <div className="banner"><span>🤖 NO Bots! 🥺 NO Board Hogs! 🎨 HAVE FUN!!</span><br/><span className="warning">We reserve the right to ban players.</span></div>
              
              <span className="myBoardLabel">View My Board: </span>
              <Switch
                onChange={(e) => this.switchMyBoard(e)}
                checked={this.state.viewMyBoard}
                className="react-switch"
                height={30}
                width={70}
                offColor="#666"
                onColor="#666"
                uncheckedIcon={
                  <div className=""></div>
                }
                checkedIcon={<div className="switch-berry banana">{Cheddar}</div>}
              />

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button
                className="btn btn-primary harvest"
                onClick={() => this.harvest()}
                style={{visibility: this.state.account.cheddarBalance > 0 ? 'visible' : 'hidden' }}
              >
                <span className="font-weight-bold"></span>
                <span className="font-weight-bold">Harvest {Cheddar}</span>
              </button>

            </div>
            <div style={{ width: "325.75px" }}>
            </div>
          </div>
        </div>
      </div>

    ) : (
      <div style={{ marginBottom: "10px" }}>
        {freeDrawing}
        <div style={{padding: "0 1rem"}}>
          <button
            className="btn btn-primary"
            onClick={() => this.requestSignIn()}
          >
            Log in with NEAR Wallet
          </button>
        </div>
      </div>
    );
    const weapons = this.state.weaponsOn ? (
      <div>
        <Weapons
          account={this.state.account}
          isFreeDrawing={isFreeDrawing}
          renderIt={(img, milkNeeded) => this.renderImg(img, milkNeeded)}
          enableWatchMode={() => this.enableWatchMode()}
        />
      </div>
    ) : (
      ""
    );
    return (
      <div>
        <div className="loader">
          <div className="loading"></div>
        </div>
        <div className={`header${watchClass}`}>
          <h2>
            {Milk} Cheddar BOARD {Cheddar}
          </h2>{" "}
          <a
            className="btn btn-outline-none"
            href="https://app.cheddar.farm"
          >
            Cheddar Farm {Cheddar}
          </a>
          {content}
        </div>
        <div className="container">
          <div className="row">
            <div>
              <div style={{'textAlign': "right"}}>

              </div>
              <div>
                <ReactSnackBar Icon={<span>🧀</span>} Show={this.state.Show}>
                  Cheddar Successfully Harvested!
                </ReactSnackBar>
              </div>
              <div>
                <canvas
                  ref={this.canvasRef}
                  width={960}
                  height={960}
                  className={
                    this.state.boardLoaded
                      ? `pixel-board${
                          this.state.watchMode ? " watch-mode" : ""
                        }`
                      : "pixel-board c-animated-background"
                  }
                />
              </div>
            </div>
            <div className={`leaderboard${watchClass}`}>
            <p style={{ 'fontSize': "11px", 'marginTop': "0", 'color': "#cc3300", 'text-align':"center"}}><i><b>⚠️Warning this is a GAME, with potential REWARDS<br/>Pixels can be Overwritten by other Players!</b></i></p> 
              <div>
                <Leaderboard
                  account={this.state.account}
                  owners={this.state.owners}
                  accounts={this.state.accounts}
                  setHover={(accountIndex, v) => this.setHover(accountIndex, v)}
                  selectedOwnerIndex={this.state.selectedOwnerIndex}
                  highlightedAccountIndex={this.state.highlightedAccountIndex}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`padded${watchClass}`}>
          
        </div>
        {/*<div className={`padded${watchClass}`}>*/}
        {/*  <div className="video-container">*/}
        {/*    <iframe*/}
        {/*      title="youtube3"*/}
        {/*      className="youtube"*/}
        {/*      src="https://www.youtube.com/embed/wfTa-Kgw2DM"*/}
        {/*      frameBorder="0"*/}
        {/*      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
        {/*      allowFullScreen*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className={`padded${watchClass}`}>*/}
        {/*  <div className="video-container">*/}
        {/*    <iframe*/}
        {/*      title="youtube2"*/}
        {/*      className="youtube"*/}
        {/*      src="https://www.youtube.com/embed/PYF6RWd7ZgI"*/}
        {/*      frameBorder="0"*/}
        {/*      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
        {/*      allowFullScreen*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className={`padded${watchClass}`}>*/}
        {/*  <div className="video-container">*/}
        {/*    <iframe*/}
        {/*      title="youtube"*/}
        {/*      className="youtube"*/}
        {/*      src="https://www.youtube.com/embed/lMSWhCwstLo"*/}
        {/*      frameBorder="0"*/}
        {/*      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
        {/*      allowFullScreen*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
        {weapons}
      </div>
    );
  }
}

const Balance = (props) => {
  const account = props.account;
  if (!account) {
    return "";
  }
  const fraction = props.detailed ? 3 : 1;
  const avacadoBalance =
    account.milkBalance -
    (props.isFreeDrawing ? 0 : props.pendingPixels || 0);
  const milkFarm =
    account.milkPixels > 0 ? (
      <span>
        {"(+"}
        <span className="font-weight-bold">{account.milkPixels}</span>
        {Milk}
        {"/day)"}
      </span>
    ) : (
      ""
    );
  const cheddarFarm =
    account.cheddarPixels > 0 ? (
      <span>
        {"(+"}
        <span className="font-weight-bold">{account.cheddarPixels}</span>
        {Cheddar}
        {"/day)"}
      </span>
    ) : (
      ""
    );
  return (
    <span className="balances font-small">
      <span className="font-weight-bold">
        {avacadoBalance.toFixed(fraction)}
      </span>
      {Milk}{" "}
      <span className="font-weight-bold">
        {account.cheddarBalance}
      </span>
      {Cheddar} {milkFarm}
      {cheddarFarm}
      {props.pendingPixels ? <span> ({props.pendingPixels} pending)</span> : ""}
    </span>
  );
};

const Leaderboard = (props) => {
  const owners = props.owners.map((owner) => {
    if (owner.accountIndex in props.accounts) {
      owner.account = props.accounts[owner.accountIndex];
    }
    return (
      <Owner
        key={owner.accountIndex}
        {...owner}
        isSelected={owner.accountIndex === props.selectedOwnerIndex}
        setHover={(v) => props.setHover(owner.accountIndex, v)}
        isHighlighted={owner.accountIndex === props.highlightedAccountIndex}
      />
    );
  });
  return (
    <table className="table table-hover table-sm">
      <tbody>{owners}</tbody>
    </table>
  );
};

const Owner = (props) => {
  const account = props.account;
  return (
    <tr
      onMouseEnter={() => props.setHover(true)}
      onMouseLeave={() => props.setHover(false)}
      className={props.isSelected ? "selected" : ""}
    >
      <td>{account ? <Account accountId={account.accountId} /> : "..."}</td>
      <td className="text-nowrap">
        <small>
          <Balance account={account} />
        </small>
      </td>
    </tr>
  );
};

const Account = (props) => {
  const accountId = props.accountId;
  const shortAccountId =
    accountId.length > 6 + 6 + 3
      ? accountId.slice(0, 6) + "..." + accountId.slice(-6)
      : accountId;
  return (
    <>
      {shortAccountId}
      </>
  );
};

export default App;
