(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{193:function(e,t,n){"use strict";(function(e){var a=n(1),r=n.n(a),c=n(3),i=n(68),s=n(69),o=n(71),l=n(70),u=n(72),h=(n(208),n(209),n(0)),d=n.n(h),f=n(73),m=n.n(f),p=n(44),g=n(45),b=n(194),v=n.n(b),w=n(195),y=n(32),x=n.n(y),_=new m.a("10000000000000000000000"),k="berryclub.io"===window.location.hostname?{networkId:"mainnet",nodeUrl:"https://rpc.mainnet.near.org",contractName:"berryclub.ek.near",walletUrl:"https://wallet.near.org"}:{networkId:"testnet",nodeUrl:"https://rpc.testnet.near.org",contractName:"berryclub.testnet",walletUrl:"https://wallet.testnet.near.org"},E=d.a.createElement("span",{role:"img","aria-label":"avocado",className:"berry"},"\ud83e\udd51"),C=d.a.createElement("span",{role:"img","aria-label":"banana",className:"berry"},"\ud83c\udf4c"),I=d.a.createElement("span",{role:"img","aria-label":"cucumber",className:"berry"},"\ud83e\udd52"),N=d.a.createElement("span",{role:"img","aria-label":"pepper",className:"berry"},"\ud83c\udf36\ufe0f"),S="Avocado",P="Banana",D=function(e){return"#".concat(e.toString(16).padStart(6,"0"))},F=function(e,t){return"#".concat(e.toString(16).padStart(6,"0")).concat(Math.round(255*t).toString(16).padStart(2,"0"))},B=function(e,t,n,a,r){var c=255&r,i=r>>8&255,s=r>>16&255;return(Math.round(e*a+s*(1-a))<<16)+(Math.round(t*a+i*(1-a))<<8)+Math.round(n*a+c*(1-a))},O=function(e,t){return B(255&e,e>>8&255,e>>16&255,(e>>24&255)/255,t)},M=function(e){e=D(e).substr(1);var t=parseInt(e.substr(0,2),16)/255,n=parseInt(e.substr(2,2),16)/255,a=parseInt(e.substr(4,2),16)/255,r=Math.max(t,n,a),c=r-Math.min(t,n,a),i=c&&(r===t?(n-a)/c:r===n?2+(a-t)/c:4+(t-n)/c);return[60*(i<0?i+6:i),r&&c/r,r]},A=function(e,t){return"rgba(".concat(e>>16,", ").concat(e>>8&255,", ").concat(255&e,", ").concat(t,")")},T=function(e){for(var t=[],n=0;n<31;++n)t.push("hsl(".concat(e,", 100%, ").concat(100*n/30,"%)"));return t},j=function(t){var n=e.from(t,"base64");if(404!==n.length)throw new Error("Unexpected encoded line length");for(var a=[],r=4;r<n.length;r+=8){var c=n.readUInt32LE(r),i=n.readUInt32LE(r+4);a.push({color:c,ownerIndex:i})}return a},R=function(e){function t(e){var n;Object(i.a)(this,t),n=Object(o.a)(this,Object(l.a)(t).call(this,e));var a=["#000000","#666666","#aaaaaa","#FFFFFF","#F44E3B","#D33115","#9F0500","#FE9200","#E27300","#C45100","#FCDC00","#FCC400","#FB9E00","#DBDF00","#B0BC00","#808900","#A4DD00","#68BC00","#194D33","#68CCCA","#16A5A5","#0C797D","#73D8FF","#009CE0","#0062B1","#AEA1FF","#7B64FF","#653294","#FDA1FF","#FA28FF","#AB149E"].map((function(e){return e.toLowerCase()})),r=parseInt(a[0].substring(1),16),c=(new Date).getTime(),s=c-(c-new Date("2021-05-09"))%6048e5+5184e5;return n.state={connected:!1,signedIn:!1,accountId:null,pendingPixels:0,boardLoaded:!1,selectedCell:null,alpha:.25,currentColor:r,pickerColor:F(r,.25),colors:a,gammaColors:T(0),pickingColor:!1,owners:[],accounts:{},highlightedAccountIndex:-1,selectedOwnerIndex:!1,farmingBanana:!1,weaponsOn:!1,weaponsCodePosition:0,freeDrawingStart:new Date(s),freeDrawingEnd:new Date(s+864e5),watchMode:!1},n._buttonDown=!1,n._oldCounts={},n._numFailedTxs=0,n._balanceRefreshTimer=null,n.canvasRef=d.a.createRef(),n._context=!1,n._lines=!1,n._queue=[],n._pendingPixels=[],n._refreshBoardTimer=null,n._sendQueueTimer=null,n._stopRefreshTime=(new Date).getTime()+6e5,n._accounts={},n._initNear().then((function(){n.setState({connected:!0,signedIn:!!n._accountId,accountId:n._accountId,ircAccountId:n._accountId.replace(".","_"),freeDrawingStart:n._freeDrawingStart,freeDrawingEnd:n._freeDrawingEnd},(function(){window.location.hash.indexOf("watch")>=0&&setTimeout((function(){return n.enableWatchMode()}),500)}))})),n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.canvasRef.current;this._context=t.getContext("2d");var n=function(){var t=Object(c.a)(r.a.mark((function t(){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.state.watchMode){t.next=2;break}return t.abrupt("return");case 2:if(!e.state.rendering){t.next=7;break}return t.next=5,e.drawImg(e.state.selectedCell);case 5:t.next=14;break;case 7:if(!e.state.pickingColor){t.next=11;break}e.pickColor(e.state.selectedCell),t.next=14;break;case 11:return e.saveColor(),t.next=14,e.drawPixel(e.state.selectedCell);case 14:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),a=function(t){var a,i;if("touches"in t){if(t.touches.length>1)return!0;var s=t.target.getBoundingClientRect();a=t.targetTouches[0].clientX-s.left,i=t.targetTouches[0].clientY-s.top}else a=t.offsetX,i=t.offsetY;a=Math.trunc(a/t.target.clientWidth*50),i=Math.trunc(i/t.target.clientHeight*50);var o=null;return a>=0&&a<50&&i>=0&&i<50&&(o={x:a,y:i}),JSON.stringify(o)!==JSON.stringify(e.state.selectedCell)&&e.setState({selectedCell:o,selectedOwnerIndex:e._lines&&o&&e._lines[o.y]&&e._lines[o.y][o.x].ownerIndex},Object(c.a)(r.a.mark((function t(){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.renderCanvas(),null===e.state.selectedCell||!e._buttonDown){t.next=4;break}return t.next=4,n();case 4:case"end":return t.stop()}}),t)})))),t.preventDefault(),!1};t.addEventListener("mousemove",a),t.addEventListener("touchmove",a);var i=function(){var t=Object(c.a)(r.a.mark((function t(a){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e._buttonDown=!0,null===e.state.selectedCell){t.next=4;break}return t.next=4,n();case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();t.addEventListener("mousedown",i),t.addEventListener("touchstart",i);var s=function(){e.setState({selectedCell:null},(function(){return e.renderCanvas()}))},o=function(){var t=Object(c.a)(r.a.mark((function t(n){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e._buttonDown=!1,"touches"in n&&s();case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();t.addEventListener("mouseup",o),t.addEventListener("touchend",o),t.addEventListener("mouseleave",s),t.addEventListener("mouseenter",(function(t){e._buttonDown&&("touches"in t||1&t.buttons||(e._buttonDown=!1))})),document.addEventListener("keydown",(function(t){t.altKey&&e.enablePickColor()})),document.addEventListener("keyup",(function(t){e.state.weaponsCodePosition<"idkfa".length&&(t.key.toLowerCase()==="idkfa"[e.state.weaponsCodePosition]?e.setState({weaponsCodePosition:e.state.weaponsCodePosition+1,weaponsOn:e.state.weaponsCodePosition+1==="idkfa".length}):e.setState({weaponsCodePosition:0})),!t.altKey&&e.disablePickColor()}))}},{key:"enablePickColor",value:function(){var e=this;this.setState({pickingColor:!0},(function(){e.renderCanvas()}))}},{key:"disablePickColor",value:function(){var e=this;this.setState({pickingColor:!1},(function(){e.renderCanvas()}))}},{key:"pickColor",value:function(e){var t=this;if(this.state.signedIn&&this._lines&&this._lines[e.y]){var n=this._lines[e.y][e.x].color;this.setState({currentColor:n,alpha:1,pickerColor:F(n,1),gammaColors:T(M(n)[0]),pickingColor:!1},(function(){t.renderCanvas()}))}}},{key:"_sendQueue",value:function(){var e=Object(c.a)(r.a.mark((function e(){var t,n=this;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this._queue.slice(0,100),this._queue=this._queue.slice(100),this._pendingPixels=t,e.prev=3,e.next=6,this._contract.draw({pixels:t},new m.a("75000000000000"));case 6:this._numFailedTxs=0,e.next=14;break;case 9:e.prev=9,e.t0=e.catch(3),console.log("Failed to send a transaction",e.t0),this._numFailedTxs+=1,this._numFailedTxs<3?(this._queue=this._queue.concat(this._pendingPixels),this._pendingPixels=[]):(this._pendingPixels=[],this._queue=[]);case 14:return e.prev=14,e.next=17,Promise.all([this.refreshBoard(!0),this.refreshAccountStats()]);case 17:e.next=21;break;case 19:e.prev=19,e.t1=e.catch(14);case 21:this._pendingPixels.forEach((function(e){n._pending[e.y][e.x]===e.color&&(n._pending[e.y][e.x]=-1)})),this._pendingPixels=[];case 23:case"end":return e.stop()}}),e,this,[[3,9],[14,19]])})));return function(){return e.apply(this,arguments)}}()},{key:"_pingQueue",value:function(){var e=Object(c.a)(r.a.mark((function e(t){var n=this;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this._sendQueueTimer&&(clearTimeout(this._sendQueueTimer),this._sendQueueTimer=null),0!==this._pendingPixels.length||!(this._queue.length>=100||t)){e.next=4;break}return e.next=4,this._sendQueue();case 4:this._queue.length>0&&(this._sendQueueTimer=setTimeout(Object(c.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n._pingQueue(!0);case 2:case"end":return e.stop()}}),e)}))),500));case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"drawImg",value:function(){var e=Object(c.a)(r.a.mark((function e(t){var n,a,c,i,s,o,l,u,h,d,f,m;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.state.signedIn&&this._lines&&this._lines[t.y]){e.next=2;break}return e.abrupt("return");case 2:if(n=this.state.account?this.state.account.avocadoBalance:0,this._isFreeDrawing()||!(n-this.state.pendingPixels<this.state.avocadoNeeded)){e.next=5;break}return e.abrupt("return");case 5:for(a=this.imageData,c=a.width,i=a.height,s=t.x-Math.trunc(c/2),o=t.y-Math.trunc(i/2),l=new Uint32Array(this.imageData.data.buffer),u=0;u<i;++u)for(h=0;h<c;++h)(d=l[u*c+h])&&o+u>=0&&o+u<50&&s+h>=0&&s+h<50&&(f=this._lines[o+u]?this._lines[o+u][s+h].color:0,(m=O(d,f))!==f&&this._queue.push({x:s+h,y:o+u,color:m}));return this.setState({rendering:!1}),this._stopRefreshTime=(new Date).getTime()+6e5,e.next=16,this._pingQueue(!1);case 16:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"drawPixel",value:function(){var e=Object(c.a)(r.a.mark((function e(t){var n,a,c,i,s,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.state.signedIn&&this._lines&&this._lines[t.y]){e.next=2;break}return e.abrupt("return");case 2:if(n=this.state.account?this.state.account.avocadoBalance:0,this._isFreeDrawing()||!(n-this.state.pendingPixels<1)){e.next=5;break}return e.abrupt("return");case 5:if(a=this._lines[t.y]?this._lines[t.y][t.x].color:0,c=255&this.state.currentColor,i=this.state.currentColor>>8&255,s=this.state.currentColor>>16&255,o=B(s,i,c,this.state.alpha,a),this._pending[t.y][t.x]===o||this._lines[t.y][t.x].color===o){e.next=14;break}this._pending[t.y][t.x]=o,e.next=15;break;case 14:return e.abrupt("return");case 15:return this._queue.push({x:t.x,y:t.y,color:o}),this._stopRefreshTime=(new Date).getTime()+6e5,e.next=19,this._pingQueue(!1);case 19:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"parseAccount",value:function(e,t){return(e=e?{accountId:e.account_id,accountIndex:e.account_index,avocadoBalance:parseFloat(e.avocado_balance)/this._pixelCost,bananaBalance:parseFloat(e.banana_balance)/this._pixelCost,numPixels:e.num_pixels,farmingPreference:e.farming_preference}:{accountId:t,accountIndex:-1,avocadoBalance:25,bananaBalance:0,numPixels:0,farmingPreference:S}).startTime=(new Date).getTime(),e.avocadoPixels=e.farmingPreference===S?e.numPixels+1:0,e.bananaPixels=e.farmingPreference===P?e.numPixels:0,e.avocadoRewardPerMs=e.avocadoPixels/864e5,e.bananaRewardPerMs=e.bananaPixels/864e5,e}},{key:"getAccount",value:function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.next=3,this._contract.get_account({account_id:t});case 3:return e.t1=e.sent,e.t2=t,e.abrupt("return",e.t0.parseAccount.call(e.t0,e.t1,e.t2));case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getAccountByIndex",value:function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.next=3,this._contract.get_account_by_index({account_index:t});case 3:return e.t1=e.sent,e.abrupt("return",e.t0.parseAccount.call(e.t0,e.t1,"unknown"));case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"refreshAccountStats",value:function(){var e=Object(c.a)(r.a.mark((function e(){var t,n=this;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getAccount(this._accountId);case 2:t=e.sent,this._balanceRefreshTimer&&(clearInterval(this._balanceRefreshTimer),this._balanceRefreshTimer=null),this.setState({pendingPixels:this._pendingPixels.length+this._queue.length,farmingBanana:t.farmingPreference===P,account:t}),this._balanceRefreshTimer=setInterval((function(){var e=(new Date).getTime()-t.startTime;n.setState({account:Object.assign({},t,{avocadoBalance:t.avocadoBalance+e*t.avocadoRewardPerMs,bananaBalance:t.bananaBalance+e*t.bananaRewardPerMs}),pendingPixels:n._pendingPixels.length+n._queue.length})}),100);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"_initNear",value:function(){var e=Object(c.a)(r.a.mark((function e(){var t,n,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new p.keyStores.BrowserLocalStorageKeyStore,e.next=3,p.connect(Object.assign({deps:{keyStore:t}},k));case 3:return n=e.sent,this._keyStore=t,this._near=n,this._walletConnection=new p.WalletConnection(n,k.contractName),this._accountId=this._walletConnection.getAccountId(),this._account=this._walletConnection.account(),this._contract=new p.Contract(this._account,k.contractName,{viewMethods:["get_account","get_account_by_index","get_lines","get_line_versions","get_pixel_cost","get_account_balance","get_account_num_pixels","get_account_id_by_index","get_free_drawing_timestamp"],changeMethods:["draw","buy_tokens","select_farming_preference"]}),e.t0=parseFloat,e.next=13,this._contract.get_pixel_cost();case 13:return e.t1=e.sent,this._pixelCost=(0,e.t0)(e.t1),e.next=17,this._contract.get_free_drawing_timestamp();case 17:if(a=e.sent,this._freeDrawingStart=new Date(a),this._freeDrawingEnd=new Date(a+864e5),!this._accountId){e.next=23;break}return e.next=23,this.refreshAccountStats();case 23:return this._lineVersions=Array(50).fill(-1),this._lines=Array(50).fill(!1),this._pending=Array(50).fill(!1),this._pending.forEach((function(e,t,n){return n[t]=Array(50).fill(-1)})),e.next=29,this.refreshBoard(!0);case 29:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"refreshBoard",value:function(){var e=Object(c.a)(r.a.mark((function e(t){var n,a,i,s,o,l,u,h,d,f,m=this;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this._refreshBoardTimer&&(clearTimeout(this._refreshBoardTimer),this._refreshBoardTimer=null),n=(new Date).getTime(),(this.state.watchMode||n<this._stopRefreshTime)&&(this._refreshBoardTimer=setTimeout(Object(c.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.refreshBoard(!1);case 2:case"end":return e.stop()}}),e)}))),1e3)),t||!document.hidden){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,this._contract.get_line_versions();case 7:for(a=e.sent,i=[],s=0;s<50;++s)a[s]!==this._lineVersions[s]&&i.push(s);for(o=[],l=0;l<i.length;l+=10)o.push(i.slice(l,l+10));return e.next=14,Promise.all(o.map((function(e){return m._contract.get_lines({lines:e})})));case 14:for(u=(u=e.sent).flat(),o=o.flat(),h=0;h<o.length;++h)d=o[h],f=j(u[h]),this._lines[d]=f;this._lineVersions=a,this._refreshOwners(),this.renderCanvas();case 21:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"_refreshOwners",value:function(){var e=this,t={};this._lines.flat().forEach((function(e){t[e.ownerIndex]=(t[e.ownerIndex]||0)+1})),delete t[0];var n=Object.keys(t).sort((function(e,n){return t[n]-t[e]}));this.setState({owners:n.map((function(e){return{accountIndex:e=parseInt(e),numPixels:t[e]}}))}),n.forEach(function(){var n=Object(c.a)(r.a.mark((function n(a){return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if((a=parseInt(a))in e._accounts&&t[a]===(e._oldCounts[a]||0)){n.next=12;break}return n.prev=2,n.next=5,e.getAccountByIndex(a);case 5:e._accounts[a]=n.sent,n.next=11;break;case 8:n.prev=8,n.t0=n.catch(2),console.log("Failed to fetch account index #",a,n.t0);case 11:e.setState({accounts:Object.assign({},e._accounts)});case 12:case"end":return n.stop()}}),n,null,[[2,8]])})));return function(e){return n.apply(this,arguments)}}()),this.setState({accounts:Object.assign({},this._accounts)}),this._oldCounts=t}},{key:"renderCanvas",value:function(){if(this._context&&this._lines){for(var e=this._context,t=0;t<50;++t){var n=this._lines[t];if(n)for(var a=0;a<50;++a){var r=n[a];e.fillStyle=D(r.color),e.fillRect(12*a,12*t,12,12),this.state.highlightedAccountIndex>=0&&(r.ownerIndex!==this.state.highlightedAccountIndex?(e.fillStyle="rgba(32, 32, 32, 0.8)",e.fillRect(12*a,12*t,6,6),e.fillRect(12*(a+.5),12*(t+.5),6,6),e.fillStyle="rgba(0, 0, 0, 0.8)",e.fillRect(12*a,12*(t+.5),6,6),e.fillRect(12*(a+.5),12*t,6,6)):(e.beginPath(),e.strokeStyle=e.fillStyle="rgba(255, 255, 255, 0.8)",e.lineWidth=.5,e.rect(12*a+.5,12*t+.5,11,11),e.stroke(),e.closePath()))}}if(this._pendingPixels.concat(this._queue).forEach((function(t){e.fillStyle=D(t.color),e.fillRect(12*t.x,12*t.y,12,12)})),this.state.selectedCell&&!this.state.watchMode){var c=this.state.selectedCell;if(this.state.rendering)for(var i=this.imageData,s=i.width,o=i.height,l=c.x-Math.trunc(s/2),u=c.y-Math.trunc(o/2),h=new Uint32Array(this.imageData.data.buffer),d=0;d<o;++d)for(var f=0;f<s;++f){var m=h[d*s+f];if(m&&u+d>=0&&u+d<50&&l+f>=0&&l+f<50){var p=this._lines[u+d]?this._lines[u+d][l+f].color:0;e.fillStyle=D(O(m,p)),e.fillRect(12*(l+f),12*(u+d),12,12)}}else if(this.state.pickingColor){var g=this._lines[c.y]?this._lines[c.y][c.x].color:0;e.beginPath(),e.strokeStyle=e.fillStyle=A(g,.5),e.lineWidth=48,e.arc(12*(c.x+.5),12*(c.y+.5),48,0,2*Math.PI),e.stroke(),e.closePath(),e.beginPath(),e.strokeStyle=e.fillStyle=A(g,1),e.lineWidth=24,e.arc(12*(c.x+.5),12*(c.y+.5),48,0,2*Math.PI),e.stroke(),e.closePath()}else e.fillStyle=A(this.state.currentColor,.2),e.fillRect(12*c.x,0,12,12*c.y),e.fillRect(12*c.x,12*(c.y+1),12,12*(50-c.y-1)),e.fillRect(0,12*c.y,12*c.x,12),e.fillRect(12*(c.x+1),12*c.y,12*(50-c.x-1),12),e.beginPath(),e.lineWidth=3,e.fillStyle=D(this.state.currentColor),e.strokeStyle=D(this.state.currentColor),e.rect(12*c.x,12*c.y,12,12),e.stroke(),e.closePath()}this.state.boardLoaded||this.setState({boardLoaded:!0})}}},{key:"requestSignIn",value:function(){var e=Object(c.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"Berry Club",e.next=3,this._walletConnection.requestSignIn(k.contractName,"Berry Club");case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"logOut",value:function(){var e=Object(c.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this._walletConnection.signOut(),this._accountId=null,this.setState({signedIn:!!this._accountId,accountId:this._accountId});case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"alphaColorChange",value:function(){var e=Object(c.a)(r.a.mark((function e(t){var n=this;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.setState({alpha:t.rgb.a},(function(){n.changeColor(t,t.rgb.a)}));case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"hueColorChange",value:function(e){this.setState({gammaColors:T(e.hsl.h)}),this.changeColor(e)}},{key:"saveColor",value:function(){var e=D(this.state.currentColor),t=this.state.colors.indexOf(e);t>=0&&this.state.colors.splice(t,1),this.setState({colors:[e].concat(this.state.colors).slice(0,31)})}},{key:"changeColor",value:function(e,t){var n=this;t=t||1;var a=65536*e.rgb.r+256*e.rgb.g+e.rgb.b;e.hex=F(a,t),e.rgb.a=t,e.hsl.a=t,e.hsv.a=t,this.setState({pickerColor:e,alpha:t,currentColor:a},(function(){n.renderCanvas()}))}},{key:"buyTokens",value:function(){var e=Object(c.a)(r.a.mark((function e(t){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=_.muln(t),e.next=3,this._contract.buy_tokens({},new m.a("30000000000000"),n);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"setHover",value:function(e,t){var n=this;t?this.setState({highlightedAccountIndex:e},(function(){n.renderCanvas()})):this.state.highlightedAccountIndex===e&&this.setState({highlightedAccountIndex:-1},(function(){n.renderCanvas()}))}},{key:"switchBerry",value:function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({farmingBanana:t}),e.next=3,this._contract.select_farming_preference({berry:t?P:S});case 3:return e.next=5,this.refreshAccountStats();case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"renderImg",value:function(){var e=Object(c.a)(r.a.mark((function e(t,n){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.imageData=t,this.setState({weaponsOn:!1,weaponsCodePosition:0,rendering:!0,pickingColor:!1,avocadoNeeded:n});case 2:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"_isFreeDrawing",value:function(){var e=new Date;return this.state.freeDrawingStart<=e&&e<this.state.freeDrawingEnd}},{key:"enableWatchMode",value:function(){this.setState({watchMode:!0,weaponsOn:!1,weaponsCodePosition:0}),document.body.style.transition="3s",document.body.style.backgroundColor="#333"}},{key:"render",value:function(){var e=this,t=this.state.watchMode?" hidden":"",n=this._isFreeDrawing(),a=d.a.createElement("div",{className:"free-drawing ".concat(n?"free":"wait").concat(t)},n?"BANANZA!!! Draw for free ":"Time until free drawing ",d.a.createElement(x.a,{initialTime:n?this.state.freeDrawingEnd-new Date:this.state.freeDrawingStart-new Date,direction:"backward",timeToUpdate:100,lastUnit:"d",checkpoints:[{time:0}]},(function(){return d.a.createElement(d.a.Fragment,null,d.a.createElement(x.a.Days,{formatValue:function(e){return e>1?"".concat(e," days "):e?"1 day ":""}}),d.a.createElement(x.a.Hours,null),":",d.a.createElement(x.a.Minutes,{formatValue:function(e){return"".concat(e).padStart(2,"0")}}),":",d.a.createElement(x.a.Seconds,{formatValue:function(e){return"".concat(e).padStart(2,"0")}}),".",d.a.createElement(x.a.Milliseconds,{formatValue:function(e){return"".concat(e).padStart(3,"0")}}))}))),r=this.state.connected?this.state.signedIn?d.a.createElement("div",null,d.a.createElement("div",{className:"float-right".concat(t)},d.a.createElement("button",{className:"btn btn-outline-secondary",onClick:function(){return e.logOut()}},"Log out (",this.state.accountId,")")),a,d.a.createElement("div",{className:"your-balance".concat(t)},"Balance:"," ",d.a.createElement(L,{account:this.state.account,pendingPixels:this.state.pendingPixels,isFreeDrawing:n,detailed:!0}),d.a.createElement("div",null,"Farming preference:",d.a.createElement(v.a,{onChange:function(t){return e.switchBerry(t)},checked:this.state.farmingBanana,className:"react-switch",height:30,width:70,offColor:"#666",onColor:"#666",uncheckedIcon:d.a.createElement("div",{className:"switch-berry avocado"},E),checkedIcon:d.a.createElement("div",{className:"switch-berry banana"},C)}))),d.a.createElement("div",{className:"buttons".concat(t)},d.a.createElement("button",{className:"btn btn-primary",onClick:function(){return e.buyTokens(10)}},"Buy ",d.a.createElement("span",{className:"font-weight-bold"},"25",E)," for"," ",d.a.createElement("span",{className:"font-weight-bold"},"\u24c30.1"))," ",d.a.createElement("button",{className:"btn btn-primary",onClick:function(){return e.buyTokens(40)}},"Buy ",d.a.createElement("span",{className:"font-weight-bold"},"100",E)," for"," ",d.a.createElement("span",{className:"font-weight-bold"},"\u24c30.4"))," ",d.a.createElement("button",{className:"btn btn-primary",onClick:function(){return e.buyTokens(100)}},"Buy ",d.a.createElement("span",{className:"font-weight-bold"},"250",E)," for"," ",d.a.createElement("span",{className:"font-weight-bold"},"\u24c31"))," ",d.a.createElement("button",{className:"btn btn-success",onClick:function(){return e.buyTokens(500)}},"DEAL: Buy ",d.a.createElement("span",{className:"font-weight-bold"},"1500",E)," ","for ",d.a.createElement("span",{className:"font-weight-bold"},"\u24c35"))),d.a.createElement("div",{className:"color-picker".concat(t)},d.a.createElement(g.HuePicker,{color:this.state.pickerColor,width:"100%",onChange:function(t){return e.hueColorChange(t)}}),d.a.createElement(g.AlphaPicker,{color:this.state.pickerColor,width:"100%",onChange:function(t){return e.alphaColorChange(t)}}),d.a.createElement("div",{className:this.state.alpha>=.75?"display-warning":"hidden"},d.a.createElement("span",{role:"img","aria-label":"warning"},"\u26a0\ufe0f"),"\ufe0f Please! Don't destroy art! If you just want to farm ",C,", just draw with low opacity.",d.a.createElement("span",{role:"img","aria-label":"pray"},"\ud83d\ude4f"),"\ufe0f"),d.a.createElement(g.GithubPicker,{className:"circle-picker",colors:this.state.gammaColors,color:this.state.pickerColor,triangle:"hide",width:"100%",onChangeComplete:function(t){return e.changeColor(t)}}),d.a.createElement(g.GithubPicker,{className:"circle-picker",colors:this.state.colors,color:this.state.pickerColor,triangle:"hide",width:"100%",onChangeComplete:function(t){return e.hueColorChange(t)}}))):d.a.createElement("div",{style:{marginBottom:"10px"}},d.a.createElement("button",{className:"btn btn-primary",onClick:function(){return e.requestSignIn()}},"Log in with NEAR Wallet")):d.a.createElement("div",null,"Connecting..."," ",d.a.createElement("span",{className:"spinner-grow spinner-grow-sm",role:"status","aria-hidden":"true"})),c=this.state.weaponsOn?d.a.createElement("div",null,d.a.createElement(w.a,{account:this.state.account,isFreeDrawing:n,renderIt:function(t,n){return e.renderImg(t,n)},enableWatchMode:function(){return e.enableWatchMode()}})):"";return d.a.createElement("div",null,d.a.createElement("div",{className:"header".concat(t)},d.a.createElement("h2",null,E," Berry Club ",C)," ",d.a.createElement("a",{className:"btn btn-outline-none",href:"https://farm.berryclub.io"},"Berry Farm ",I),d.a.createElement("a",{className:"btn btn-outline-none",href:"https://app.ref.finance/#wrap.near|berryclub.ek.near"},"REF Finance ",C),d.a.createElement("a",{className:"btn btn-outline-none",href:"https://berry.cards"},"[BETA] Berry Cards ",N),r),d.a.createElement("div",{className:"container"},d.a.createElement("div",{className:"row"},d.a.createElement("div",null,d.a.createElement("div",null,d.a.createElement("canvas",{ref:this.canvasRef,width:600,height:600,className:this.state.boardLoaded?"pixel-board".concat(this.state.watchMode?" watch-mode":""):"pixel-board c-animated-background"}))),d.a.createElement("div",{className:"leaderboard".concat(t)},d.a.createElement("div",null,d.a.createElement(H,{owners:this.state.owners,accounts:this.state.accounts,setHover:function(t,n){return e.setHover(t,n)},selectedOwnerIndex:this.state.selectedOwnerIndex,highlightedAccountIndex:this.state.highlightedAccountIndex}))))),d.a.createElement("div",{className:"padded".concat(t)},this.state.signedIn?d.a.createElement("div",null,d.a.createElement("iframe",{title:"irc",className:"irc",frameBorder:"0",src:"https://kiwiirc.com/client/irc.kiwiirc.com/?nick=".concat(this.state.ircAccountId,"#berryclub")})):""),d.a.createElement("div",{className:"padded".concat(t)},d.a.createElement("div",{className:"video-container"},d.a.createElement("iframe",{title:"youtube3",className:"youtube",src:"https://www.youtube.com/embed/wfTa-Kgw2DM",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}))),d.a.createElement("div",{className:"padded".concat(t)},d.a.createElement("div",{className:"video-container"},d.a.createElement("iframe",{title:"youtube2",className:"youtube",src:"https://www.youtube.com/embed/PYF6RWd7ZgI",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}))),d.a.createElement("div",{className:"padded".concat(t)},d.a.createElement("div",{className:"video-container"},d.a.createElement("iframe",{title:"youtube",className:"youtube",src:"https://www.youtube.com/embed/lMSWhCwstLo",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}))),c,d.a.createElement("a",{className:"github-fork-ribbon right-bottom fixed".concat(t),href:"https://github.com/evgenykuzyakov/berryclub","data-ribbon":"Fork me on GitHub",title:"Fork me on GitHub"},"Fork me on GitHub"))}}]),t}(d.a.Component),L=function(e){var t=e.account;if(!t)return"";var n=e.detailed?3:1,a=t.avocadoBalance-(e.isFreeDrawing?0:e.pendingPixels||0),r=t.avocadoPixels>0?d.a.createElement("span",null,"(+",d.a.createElement("span",{className:"font-weight-bold"},t.avocadoPixels),E,"/day)"):"",c=t.bananaPixels>0?d.a.createElement("span",null,"(+",d.a.createElement("span",{className:"font-weight-bold"},t.bananaPixels),C,"/day)"):"";return d.a.createElement("span",{className:"balances font-small"},d.a.createElement("span",{className:"font-weight-bold"},a.toFixed(n)),E," ",d.a.createElement("span",{className:"font-weight-bold"},t.bananaBalance.toFixed(n)),C," ",r,c,e.pendingPixels?d.a.createElement("span",null," (",e.pendingPixels," pending)"):"")},H=function(e){var t=e.owners.map((function(t){return t.accountIndex in e.accounts&&(t.account=e.accounts[t.accountIndex]),d.a.createElement(W,Object.assign({key:t.accountIndex},t,{isSelected:t.accountIndex===e.selectedOwnerIndex,setHover:function(n){return e.setHover(t.accountIndex,n)},isHighlighted:t.accountIndex===e.highlightedAccountIndex}))}));return d.a.createElement("table",{className:"table table-hover table-sm"},d.a.createElement("tbody",null,t))},W=function(e){var t=e.account;return d.a.createElement("tr",{onMouseEnter:function(){return e.setHover(!0)},onMouseLeave:function(){return e.setHover(!1)},className:e.isSelected?"selected":""},d.a.createElement("td",null,t?d.a.createElement(q,{accountId:t.accountId}):"..."),d.a.createElement("td",{className:"text-nowrap"},d.a.createElement("small",null,d.a.createElement(L,{account:t}))))},q=function(e){var t=e.accountId,n=t.length>15?t.slice(0,6)+"..."+t.slice(-6):t;return d.a.createElement("a",{className:"account",href:"https://wayback.berryclub.io/".concat(t)},n)};t.a=R}).call(this,n(10).Buffer)},195:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var a=n(196),r=n(1),c=n.n(r),i=n(3),s=n(68),o=n(69),l=n(71),u=n(70),h=n(72),d=(n(538),n(0)),f=n.n(d),m=n(197),p=n.n(m),g=f.a.createElement("span",{role:"img","aria-label":"avocado",className:"berry"},"\ud83e\udd51"),b=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).canvasRef=f.a.createRef(),n.state={width:48,height:28,avocadoNeeded:100,lockedAspect:!0},n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.canvas=this.canvasRef.current,this.ctx=this.canvas.getContext("2d"),this.sourceImage=new Image,this.sourceImage.onload=function(){e.draw()},this.sourceImage.src="/bfg.png"}},{key:"draw",value:function(){var e=this.sourceImage,t=this.canvas,n=this.ctx,a=this.state.width,r=this.state.height;t.width=a,t.height=r,t.style.width=10*a+"px",t.style.height=10*r+"px",n.clearRect(0,0,a,r),n.imageSmoothingQuality="low",n.drawImage(e,0,0,a,r);var c=n.getImageData(0,0,a,r);this.imageData=c,this.setState({avocadoNeeded:new Uint32Array(c.data.buffer).reduce((function(e,t){return e+(t?1:0)}),0)})}},{key:"onFilesChange",value:function(){var e=Object(i.a)(c.a.mark((function e(t){var n,a,r=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=this.sourceImage,(a=new FileReader).readAsDataURL(t[0]),n.onload=function(){var e=n.naturalWidth,t=n.naturalHeight;if(n.naturalWidth>50||n.naturalHeight>50){var a=e/t;e=Math.round(20*Math.min(1,a)),t=Math.round(20*Math.min(1,1/a))}r.setState({width:Math.min(50,Math.max(1,e)),height:Math.min(50,Math.max(1,t))}),r.draw()},a.onload=function(e){n.src=e.target.result};case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"onFilesError",value:function(){var e=Object(i.a)(c.a.mark((function e(t,n){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t,n);case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"updateVal",value:function(e,t){var n=this;if(t=Math.min(50,Math.max(1,t)),this.state.lockedAspect){var r,c,i=this.sourceImage.naturalWidth/this.sourceImage.naturalHeight;"width"===e?(r=t,c=Math.round(r/i)):(c=t,r=Math.round(c*i)),this.setState({width:Math.min(50,Math.max(1,r)),height:Math.min(50,Math.max(1,c))},(function(){n.draw()}))}else this.setState(Object(a.a)({},e,t),(function(){n.draw()}))}},{key:"changeLockedAspect",value:function(){this.setState({lockedAspect:!this.state.lockedAspect})}},{key:"render",value:function(){var e=this;return f.a.createElement("div",{className:"weapons-popup"},f.a.createElement("div",{className:"weapons-content"},f.a.createElement("h2",null,"So you need a BFG?"),f.a.createElement("div",null,f.a.createElement(p.a,{type:"button",className:"btn",onChange:function(t){return e.onFilesChange(t)},onError:function(t,n){return e.onFilesError(t,n)},multiple:!1,accepts:["image/*"],minFileSize:1,clickable:!0},"Click to upload an image")),f.a.createElement("div",null,f.a.createElement("label",null,"Width"),f.a.createElement("input",{type:"number",value:this.state.width,min:1,max:50,onChange:function(t){return e.updateVal("width",t.target.value)}})," ",f.a.createElement("button",{className:"btn btn-outline-secondary low-right-margin"+(this.state.lockedAspect?" btn-pressed":" btn-not-pressed"),onClick:function(){return e.changeLockedAspect()}},f.a.createElement("span",{role:"img","aria-label":"link",className:"berry"},"\ud83d\udd17")),f.a.createElement("label",null,"Height"),f.a.createElement("input",{type:"number",value:this.state.height,min:1,max:50,onChange:function(t){return e.updateVal("height",t.target.value)}})),f.a.createElement("button",{className:"btn btn-success btn-large",disabled:!this.props.account||!this.props.isFreeDrawing&&this.props.account.avocadoBalance<this.state.avocadoNeeded,onClick:function(){return e.props.renderIt(e.imageData,e.state.avocadoNeeded)}},"Render on the board using ",this.state.avocadoNeeded," ",g),f.a.createElement("button",{className:"btn btn-primary btn-large",onClick:function(){return e.props.enableWatchMode()}},"Enable watch mode"),f.a.createElement("div",{className:"canvas-wrapper"},f.a.createElement("canvas",{ref:this.canvasRef,width:480,height:280,className:"draw-preview"}))))}}]),t}(f.a.Component)},198:function(e,t,n){e.exports=n(199)},199:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(192),i=n.n(c),s=(n(204),n(193));i.a.render(r.a.createElement(s.a,null),document.getElementById("root"))},204:function(e,t,n){},208:function(e,t,n){},209:function(e,t,n){},210:function(e,t){},214:function(e,t){},222:function(e,t){},235:function(e,t){},237:function(e,t){},538:function(e,t,n){}},[[198,1,2]]]);
//# sourceMappingURL=main.dac99e53.chunk.js.map