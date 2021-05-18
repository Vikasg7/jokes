const Rx = rxjs
const RxOp = Rx.operators

const btn = document.getElementById("btn")
const joke = document.getElementById("joke")

const getJoke = async (event) => {
  const resp = await fetch("https://icanhazdadjoke.com", {headers: {accept: "application/json"}})
  const json = await resp.json()
  return json.joke
}

const setLoading = () => joke.innerText = "Loading..."
const setJoke = (text) => joke.innerText = text

const triggers =
  Rx.merge(
    Rx.fromEvent(btn, "click"),
    Rx.fromEvent(window, "load")
  )

const main = 
  triggers
    |> RxOp.tap(setLoading)
    |> RxOp.switchMap(getJoke)
    |> RxOp.tap(setJoke)

main.subscribe()