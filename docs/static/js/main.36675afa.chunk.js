(this.webpackJsonpfirst=this.webpackJsonpfirst||[]).push([[0],{33:function(e,o,t){e.exports=t(73)},38:function(e,o,t){},70:function(e,o){},73:function(e,o,t){"use strict";t.r(o);var n=t(0),r=t.n(n),s=t(29),c=t.n(s),i=(t(38),t(30)),a=t(31),l=t(32),u=t.n(l),d="https://ludo-galaxy.herokuapp.com/",m="diceRoll.mp3",p=function(){function e(){Object(i.a)(this,e),this.socket=void 0,this.diceRoll=void 0,this.socket=u()(d),this.diceRoll=function(e){var o=document.createElement("audio");return o.src=e,o.setAttribute("preload","auto"),o.setAttribute("controls","none"),o.style.display="none",document.body.appendChild(o),{play:function(){return o.play()},stop:function(){return o.pause()}}}(m)}return Object(a.a)(e,[{key:"connectPortsToMessages",value:function(e){var o=this,t=window.Elm.Game.init({node:e});t.ports.rollDice.subscribe((function(){var e=Math.floor(6*Math.random())+1;o.diceRoll.play(),t.ports.diceRolledReceiver.send(e),o.socket.emit("game_event",{type:"roll_dice",data:e})})),this.socket.on("game_event",(function(e){var n=e.type,r=e.data;switch(o.diceRoll.play(),n){case"roll_dice":o.diceRoll.play(),t.ports.diceRolledReceiver.send(r);break;case"move_coins":t.ports.moveCoinsReceiver.send(r)}})),t.ports.moveCoins.subscribe((function(e){o.diceRoll.play(),o.socket.emit("game_event",{type:"move_coins",data:e}),t.ports.moveCoinsReceiver.send(e)})),t.ports.joinGame.subscribe((function(e){o.socket.emit("join_room",{roomName:e},(function(o){console.log(o),o.error?t.ports.errorReceiver.send(o.error):t.ports.joinGameReceiver.send([e,o.order,o.maxPlayers])}))})),t.ports.createNewGame.subscribe((function(e){console.log(e),o.socket.emit("create_room",{maxPlayers:e},(function(e){console.log(e),e.error?t.ports.errorReceiver.send(e.error):t.ports.newGameReceiver.send(e.roomName)}))}))}},{key:"dispose",value:function(){this.socket.close()}}]),e}();var v=function(){var e=r.a.useRef(null);return r.a.useEffect((function(){var o=new p;return null!==e.current&&o.connectPortsToMessages(e.current),function(){o.dispose()}}),[]),r.a.createElement("div",{ref:e}," ")};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[33,1,2]]]);
//# sourceMappingURL=main.36675afa.chunk.js.map