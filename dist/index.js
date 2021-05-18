"use strict";

var _ref, _ref2, _triggers;

const Rx = rxjs;
const RxOp = Rx.operators;
const btn = document.getElementById("btn");
const joke = document.getElementById("joke");

const getJoke = async event => {
  const resp = await fetch("https://icanhazdadjoke.com", {
    headers: {
      accept: "application/json"
    }
  });
  const json = await resp.json();
  return json.joke;
};

const setLoading = () => joke.innerText = "Loading...";

const setJoke = text => joke.innerText = text;

const triggers = Rx.merge(Rx.fromEvent(btn, "click"), Rx.fromEvent(window, "load"));
const main = (_ref = (_ref2 = (_triggers = triggers, RxOp.tap(setLoading)(_triggers)), RxOp.switchMap(getJoke)(_ref2)), RxOp.tap(setJoke)(_ref));
main.subscribe();